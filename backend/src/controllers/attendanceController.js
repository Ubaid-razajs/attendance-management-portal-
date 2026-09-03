import Attendance from '../models/Attendance.js'
import Student from '../models/Student.js'
import Class from '../models/Class.js'
import Notification from '../models/Notification.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

function dayRange(value) {
  const date = value ? new Date(`${value}T00:00:00`) : new Date()
  if (Number.isNaN(date.getTime())) throw httpError('Invalid date', 422)
  const start = new Date(date); start.setHours(0, 0, 0, 0)
  const end = new Date(start); end.setDate(end.getDate() + 1)
  return { start, end }
}

async function ensureTeacherOwnsClass(user, classId) {
  if (user.role !== 'teacher') return
  const teacher = await (await import('../models/Teacher.js')).default.findOne({ user: user._id })
  const cls = await Class.findOne({ _id: classId, teacher: teacher?._id })
  if (!cls) throw httpError('You are not assigned to this class', 403)
}

export const listAttendance = asyncHandler(async (req, res) => {
  const { start, end } = dayRange(req.query.date)
  const filter = { date: { $gte: start, $lt: end } }
  if (req.query.classId) { filter.class = req.query.classId; await ensureTeacherOwnsClass(req.user, req.query.classId) }
  if (req.user.role === 'parent') {
    const students = await Student.find({ parent: req.user._id }).select('_id')
    filter.student = { $in: students.map((item) => item._id) }
  }
  const data = await Attendance.find(filter).populate('student', 'studentId name fatherName rollNumber photo').populate('class', 'name section').populate('markedBy', 'name role').sort({ checkInTime: 1, createdAt: 1 })
  res.json({ success: true, data })
})

export const markAttendance = asyncHandler(async (req, res) => {
  const { studentId, status = 'present', date, note = '', source = 'manual' } = req.body
  const student = await Student.findById(studentId).populate('class')
  if (!student) throw httpError('Student not found', 404)
  if (!student.class) throw httpError('Student is not assigned to a class', 422)
  await ensureTeacherOwnsClass(req.user, student.class._id)
  const { start } = dayRange(date)
  const checkInTime = ['present', 'late'].includes(status) ? new Date() : undefined
  const record = await Attendance.findOneAndUpdate(
    { student: student._id, date: start },
    { student: student._id, class: student.class._id, date: start, status, note, markedBy: req.user._id, source, checkInTime },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
  ).populate('student', 'studentId name fatherName rollNumber photo').populate('class', 'name section')
  if (['absent', 'late'].includes(status) && student.parent) {
    await Notification.create({ recipient: student.parent, title: `Attendance: ${status}`, message: `${student.name} was marked ${status} today.`, type: 'attendance', data: { studentId: student._id, attendanceId: record._id } })
  }
  res.status(201).json({ success: true, data: record })
})

export const bulkMarkAttendance = asyncHandler(async (req, res) => {
  const { date, records = [] } = req.body
  if (!Array.isArray(records) || !records.length) throw httpError('records must contain at least one attendance item', 422)
  const { start } = dayRange(date)
  const studentIds = records.map((item) => item.studentId)
  const students = await Student.find({ _id: { $in: studentIds } }).populate('class')
  const byId = new Map(students.map((student) => [String(student._id), student]))
  const operations = records.map((item) => {
    const student = byId.get(String(item.studentId))
    if (!student?.class) throw httpError(`Invalid student: ${item.studentId}`, 422)
    return { updateOne: { filter: { student: student._id, date: start }, update: { $set: { student: student._id, class: student.class._id, date: start, status: item.status || 'present', note: item.note || '', markedBy: req.user._id, source: item.source || 'manual', checkInTime: ['present', 'late'].includes(item.status || 'present') ? new Date() : undefined }, $setOnInsert: { createdAt: new Date() } }, upsert: true } }
  })
  const result = await Attendance.bulkWrite(operations)
  res.status(201).json({ success: true, message: 'Attendance saved', data: result })
})

export const studentAttendance = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.studentId)
  if (!student) throw httpError('Student not found', 404)
  if (req.user.role === 'parent' && String(student.parent) !== String(req.user._id)) throw httpError('Forbidden', 403)
  const data = await Attendance.find({ student: student._id }).populate('class', 'name section').sort({ date: -1 }).limit(365)
  const totals = data.reduce((acc, item) => { acc[item.status] = (acc[item.status] || 0) + 1; return acc }, {})
  res.json({ success: true, data, summary: { total: data.length, ...totals } })
})

export const summary = asyncHandler(async (req, res) => {
  const { start, end } = dayRange(req.query.date)
  const filter = { date: { $gte: start, $lt: end } }
  if (req.query.classId) filter.class = req.query.classId
  const grouped = await Attendance.aggregate([{ $match: filter }, { $group: { _id: '$status', count: { $sum: 1 } } }])
  const result = { present: 0, absent: 0, late: 0, excused: 0 }
  grouped.forEach((item) => { result[item._id] = item.count })
  res.json({ success: true, data: result, total: Object.values(result).reduce((a, b) => a + b, 0) })
})
