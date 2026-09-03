import Student from '../models/Student.js'
import Attendance from '../models/Attendance.js'
import Notification from '../models/Notification.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

export const scan = asyncHandler(async (req, res) => {
  const { studentId, status = 'present' } = req.body
  if (!studentId) throw httpError('studentId is required', 422)
  const student = await Student.findOne({ studentId, isActive: true }).populate('class', 'name section')
  if (!student) throw httpError('Student card was not recognized', 404)
  if (!student.class) throw httpError('Student has no assigned class', 422)
  const now = new Date(); const day = new Date(now); day.setHours(0, 0, 0, 0)
  const attendance = await Attendance.findOneAndUpdate({ student: student._id, date: day }, { student: student._id, class: student.class._id, date: day, status, checkInTime: status === 'present' || status === 'late' ? now : undefined, markedBy: req.user._id, source: 'kiosk' }, { upsert: true, new: true, runValidators: true }).populate('student', 'studentId name fatherName rollNumber photo').populate('class', 'name section')
  if (student.parent && ['absent', 'late'].includes(status)) await Notification.create({ recipient: student.parent, title: `Kiosk attendance: ${status}`, message: `${student.name} was marked ${status}.`, type: 'attendance', data: { attendanceId: attendance._id } })
  res.json({ success: true, message: `${student.name} marked ${status}`, data: attendance })
})
