import Attendance from '../models/Attendance.js'
import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js'
import Class from '../models/Class.js'
import LeaveRequest from '../models/LeaveRequest.js'
import { asyncHandler } from '../utils/asyncHandler.js'

function csvEscape(value) { const text = value == null ? '' : String(value); return `"${text.replaceAll('"', '""')}"` }

export const overview = asyncHandler(async (_req, res) => {
  const [students, teachers, classes, pendingLeaves, attendance] = await Promise.all([
    Student.countDocuments({ isActive: true }), Teacher.countDocuments({ isActive: true }), Class.countDocuments({ isActive: true }), LeaveRequest.countDocuments({ status: 'pending' }), Attendance.find({ date: { $gte: new Date(new Date().setHours(0,0,0,0)), $lt: new Date(new Date().setHours(24,0,0,0)) } }).select('status')
  ])
  const today = { present: 0, absent: 0, late: 0, excused: 0 }
  attendance.forEach((item) => { today[item.status] = (today[item.status] || 0) + 1 })
  res.json({ success: true, data: { students, teachers, classes, pendingLeaves, todayAttendance: today } })
})

export const attendanceReport = asyncHandler(async (req, res) => {
  const from = req.query.from ? new Date(req.query.from) : new Date(new Date().setDate(new Date().getDate() - 30))
  const to = req.query.to ? new Date(req.query.to) : new Date()
  const match = { date: { $gte: from, $lte: to } }
  if (req.query.classId) match.class = req.query.classId
  const data = await Attendance.aggregate([{ $match: match }, { $group: { _id: '$status', count: { $sum: 1 } } }, { $sort: { count: -1 } }])
  res.json({ success: true, data: data.map((item) => ({ status: item._id, count: item.count })) })
})

export const exportAttendance = asyncHandler(async (req, res) => {
  const from = req.query.from ? new Date(req.query.from) : new Date(new Date().setDate(new Date().getDate() - 30))
  const to = req.query.to ? new Date(req.query.to) : new Date()
  const data = await Attendance.find({ date: { $gte: from, $lte: to } }).populate('student', 'studentId name fatherName rollNumber').populate('class', 'name section').sort({ date: -1 })
  const rows = [['Date', 'Student ID', 'Student', 'Father Name', 'Roll Number', 'Class', 'Section', 'Status', 'Check In']]
  data.forEach((item) => rows.push([item.date.toISOString().slice(0, 10), item.student?.studentId, item.student?.name, item.student?.fatherName, item.student?.rollNumber, item.class?.name, item.class?.section, item.status, item.checkInTime?.toISOString() || '']))
  const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\n')
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="attendance-${new Date().toISOString().slice(0,10)}.csv"`)
  res.send(csv)
})
