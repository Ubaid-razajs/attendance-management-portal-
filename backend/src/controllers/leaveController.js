import LeaveRequest from '../models/LeaveRequest.js'
import Student from '../models/Student.js'
import Notification from '../models/Notification.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

export const listLeaves = asyncHandler(async (req, res) => {
  const filter = {}
  if (req.user.role === 'parent') filter.parent = req.user._id
  if (req.query.status) filter.status = req.query.status
  const data = await LeaveRequest.find(filter).populate('student', 'studentId name fatherName rollNumber class').populate('parent', 'name email phone').populate('reviewedBy', 'name').sort({ createdAt: -1 })
  res.json({ success: true, data })
})

export const createLeave = asyncHandler(async (req, res) => {
  const { studentId, startDate, endDate, reason } = req.body
  const student = await Student.findOne({ _id: studentId, parent: req.user._id })
  if (!student) throw httpError('Student not found for this parent', 404)
  if (!startDate || !endDate || !reason) throw httpError('studentId, startDate, endDate and reason are required', 422)
  if (new Date(endDate) < new Date(startDate)) throw httpError('End date cannot be before start date', 422)
  const data = await LeaveRequest.create({ student: student._id, parent: req.user._id, startDate, endDate, reason })
  const admins = await (await import('../models/User.js')).default.find({ role: 'admin', isActive: true }).select('_id')
  if (admins.length) await Notification.insertMany(admins.map((admin) => ({ recipient: admin._id, title: 'New leave request', message: `${student.name} has a new leave request.`, type: 'leave', data: { leaveId: data._id } })))
  res.status(201).json({ success: true, data: await data.populate('student', 'studentId name fatherName rollNumber') })
})

export const updateLeaveStatus = asyncHandler(async (req, res) => {
  const { status, reviewNote = '' } = req.body
  if (!['approved', 'rejected', 'pending'].includes(status)) throw httpError('Invalid leave status', 422)
  const data = await LeaveRequest.findByIdAndUpdate(req.params.id, { status, reviewNote, reviewedBy: req.user._id, reviewedAt: new Date() }, { new: true, runValidators: true }).populate('student', 'studentId name').populate('parent', 'name email phone')
  if (!data) throw httpError('Leave request not found', 404)
  if (data.parent) await Notification.create({ recipient: data.parent._id, title: `Leave ${status}`, message: `Leave request for ${data.student.name} was ${status}.`, type: 'leave', data: { leaveId: data._id } })
  res.json({ success: true, data })
})

export const getLeave = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id }
  if (req.user.role === 'parent') filter.parent = req.user._id
  const data = await LeaveRequest.findOne(filter).populate('student').populate('parent', 'name email phone').populate('reviewedBy', 'name')
  if (!data) throw httpError('Leave request not found', 404)
  res.json({ success: true, data })
})
