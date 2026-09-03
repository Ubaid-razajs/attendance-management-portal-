import User from '../models/User.js'
import Teacher from '../models/Teacher.js'
import Class from '../models/Class.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

export const listTeachers = asyncHandler(async (_req, res) => {
  const data = await Teacher.find().populate('user', 'email role isActive').sort({ createdAt: -1 })
  res.json({ success: true, data })
})

export const getTeacher = asyncHandler(async (req, res) => {
  const data = await Teacher.findById(req.params.id).populate('user', 'email role isActive')
  if (!data) throw httpError('Teacher not found', 404)
  res.json({ success: true, data })
})

export const createTeacher = asyncHandler(async (req, res) => {
  const { email, password = 'Teacher@12345', name, ...profile } = req.body
  if (!email || !name || !profile.employeeId) throw httpError('name, email and employeeId are required', 422)
  const existing = await User.findOne({ email: email.toLowerCase() }); if (existing) throw httpError('Email already exists', 409)
  const user = await User.create({ name, email, password, role: 'teacher', phone: profile.phone || '' })
  try { const teacher = await Teacher.create({ ...profile, name, email, user: user._id }); res.status(201).json({ success: true, data: await teacher.populate('user', 'email role isActive') }) } catch (error) { await User.findByIdAndDelete(user._id); throw error }
})

export const updateTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id); if (!teacher) throw httpError('Teacher not found', 404)
  const { password, email, name, ...profile } = req.body; Object.assign(teacher, profile); if (name) teacher.name = name; if (email) teacher.email = email; await teacher.save()
  const user = await User.findById(teacher.user).select('+password'); if (!user) throw httpError('Teacher login account not found', 404)
  if (name) user.name = name; if (email) user.email = email.toLowerCase(); if (password) user.password = password; if (profile.phone !== undefined) user.phone = profile.phone; await user.save()
  res.json({ success: true, data: await Teacher.findById(teacher._id).populate('user', 'email role isActive') })
})

export const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id); if (!teacher) throw httpError('Teacher not found', 404); teacher.isActive = false; await teacher.save(); await User.findByIdAndUpdate(teacher.user, { isActive: false }); await Class.updateMany({ teacher: teacher._id }, { $unset: { teacher: 1 } }); res.json({ success: true, message: 'Teacher deactivated' })
})
