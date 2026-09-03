import Class from '../models/Class.js'
import Student from '../models/Student.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

export const listClasses = asyncHandler(async (_req, res) => {
  const data = await Class.find().populate('teacher', 'name employeeId subject').sort({ name: 1, section: 1 })
  const counts = await Student.aggregate([{ $match: { isActive: true } }, { $group: { _id: '$class', count: { $sum: 1 } } }])
  const map = new Map(counts.map((item) => [String(item._id), item.count]))
  res.json({ success: true, data: data.map((item) => ({ ...item.toObject(), studentCount: map.get(String(item._id)) || 0 })) })
})

export const getClass = asyncHandler(async (req, res) => {
  const data = await Class.findById(req.params.id).populate('teacher', 'name employeeId subject')
  if (!data) throw httpError('Class not found', 404)
  res.json({ success: true, data })
})

export const createClass = asyncHandler(async (req, res) => {
  const data = await Class.create(req.body)
  res.status(201).json({ success: true, data: await data.populate('teacher', 'name employeeId subject') })
})

export const updateClass = asyncHandler(async (req, res) => {
  const data = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('teacher', 'name employeeId subject')
  if (!data) throw httpError('Class not found', 404)
  res.json({ success: true, data })
})

export const deleteClass = asyncHandler(async (req, res) => {
  const studentCount = await Student.countDocuments({ class: req.params.id, isActive: true })
  if (studentCount) throw httpError('Move active students before deleting this class', 409)
  const data = await Class.findByIdAndDelete(req.params.id)
  if (!data) throw httpError('Class not found', 404)
  res.json({ success: true, message: 'Class deleted' })
})
