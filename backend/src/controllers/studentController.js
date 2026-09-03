import Student from '../models/Student.js'
import Class from '../models/Class.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

const populate = { path: 'class', select: 'name section grade room teacher', populate: { path: 'teacher', select: 'name employeeId' } }

export const listStudents = asyncHandler(async (req, res) => {
  const { search = '', classId, active, page = 1, limit = 20 } = req.query
  const filter = {}
  if (req.user.role === 'parent') filter.parent = req.user._id
  if (classId) filter.class = classId
  if (active !== undefined) filter.isActive = active !== 'false'
  if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { studentId: new RegExp(search, 'i') }, { fatherName: new RegExp(search, 'i') }]
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100)
  const skip = (Math.max(Number(page) || 1, 1) - 1) * safeLimit
  const [items, total] = await Promise.all([
    Student.find(filter).populate(populate).populate('parent', 'name email phone').sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
    Student.countDocuments(filter)
  ])
  res.json({ success: true, data: items, pagination: { page: Math.floor(skip / safeLimit) + 1, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) } })
})

export const getStudent = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id }
  if (req.user.role === 'parent') filter.parent = req.user._id
  const student = await Student.findOne(filter).populate(populate).populate('parent', 'name email phone')
  if (!student) throw httpError('Student not found', 404)
  res.json({ success: true, data: student })
})

export const createStudent = asyncHandler(async (req, res) => {
  const student = await Student.create(req.body)
  const data = await Student.findById(student._id).populate(populate).populate('parent', 'name email phone')
  res.status(201).json({ success: true, data })
})

export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(populate).populate('parent', 'name email phone')
  if (!student) throw httpError('Student not found', 404)
  res.json({ success: true, data: student })
})

export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })
  if (!student) throw httpError('Student not found', 404)
  res.json({ success: true, message: 'Student deactivated' })
})

export const studentIdCard = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).populate(populate)
  if (!student) throw httpError('Student not found', 404)
  res.json({ success: true, data: { student, qrValue: student.studentId } })
})
