import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js'
import Class from '../models/Class.js'
import User from '../models/User.js'
import Attendance from '../models/Attendance.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

const populate = { path: 'class', select: 'name section grade room teacher', populate: { path: 'teacher', select: 'name employeeId' } }

export const listStudents = asyncHandler(async (req, res) => {
  const { search = '', classId, active = 'true', page = 1, limit = 20 } = req.query; const filter = {}
  if (req.user.role === 'parent') filter.parent = req.user._id
  if (req.user.role === 'teacher') { const teacher = await Teacher.findOne({ user: req.user._id }).select('_id'); const ownClasses = teacher ? await Class.find({ teacher: teacher._id }).select('_id') : []; filter.class = classId ? classId : { $in: ownClasses.map(item => item._id) } } else if (classId) filter.class = classId
  if (active !== 'all') filter.isActive = active !== 'false'
  if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { studentId: new RegExp(search, 'i') }, { fatherName: new RegExp(search, 'i') }]
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100); const safePage = Math.max(Number(page) || 1, 1); const skip = (safePage - 1) * safeLimit
  const [items, total] = await Promise.all([Student.find(filter).populate(populate).populate('parent', 'name email phone').sort({ createdAt: -1 }).skip(skip).limit(safeLimit), Student.countDocuments(filter)])
  res.json({ success: true, data: items, pagination: { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) } })
})

export const getStudent = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id }; if (req.user.role === 'parent') filter.parent = req.user._id
  if (req.user.role === 'teacher') { const teacher = await Teacher.findOne({ user: req.user._id }).select('_id'); const student = await Student.findOne(filter).populate(populate).populate('parent', 'name email phone'); if (!student || String(student.class?.teacher) !== String(teacher?._id)) throw httpError('Student not found', 404); return res.json({ success: true, data: student }) }
  const student = await Student.findOne(filter).populate(populate).populate('parent', 'name email phone'); if (!student) throw httpError('Student not found', 404); res.json({ success: true, data: student })
})

export const createStudent = asyncHandler(async (req, res) => {
  const { parentEmail, parentName, parentPhone, ...studentPayload } = req.body
  if (!studentPayload.studentId || !studentPayload.name || !studentPayload.fatherName) throw httpError('studentId, name and fatherName are required', 422)
  if (parentEmail) { let parent = await User.findOne({ email: parentEmail.toLowerCase(), role: 'parent' }); if (!parent) parent = await User.create({ name: parentName || 'Parent', email: parentEmail, phone: parentPhone || '', role: 'parent', password: 'Parent@12345' }); studentPayload.parent = parent._id }
  const student = await Student.create(studentPayload); const data = await Student.findById(student._id).populate(populate).populate('parent', 'name email phone'); res.status(201).json({ success: true, data, qrValue: `ATTENDANCE_STUDENT:${student.studentId}` })
})

export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(populate).populate('parent', 'name email phone'); if (!student) throw httpError('Student not found', 404); res.json({ success: true, data: student })
})

export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id); if (!student) throw httpError('Student not found', 404); student.isActive = false; await student.save(); res.json({ success: true, message: 'Student removed from active roster' })
})

export const studentIdCard = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).populate(populate); if (!student) throw httpError('Student not found', 404); res.json({ success: true, data: { student, qrValue: `ATTENDANCE_STUDENT:${student.studentId}` } })
})

export const restoreStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true, runValidators: true }).populate(populate); if (!student) throw httpError('Student not found', 404); res.json({ success: true, data: student })
})

export const permanentlyDeleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id); if (!student) throw httpError('Student not found', 404); await Attendance.deleteMany({ student: student._id }); await Student.findByIdAndDelete(student._id); res.json({ success: true, message: 'Student permanently deleted' })
})
