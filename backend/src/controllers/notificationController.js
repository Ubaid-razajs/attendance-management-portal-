import Notification from '../models/Notification.js'
import User from '../models/User.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

export const listNotifications = asyncHandler(async (req, res) => {
  const data = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(Math.min(Number(req.query.limit) || 50, 100))
  const unread = await Notification.countDocuments({ recipient: req.user._id, readAt: null })
  res.json({ success: true, data, unread })
})

export const markRead = asyncHandler(async (req, res) => {
  const data = await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user._id }, { readAt: new Date() }, { new: true })
  if (!data) throw httpError('Notification not found', 404)
  res.json({ success: true, data })
})

export const markAllRead = asyncHandler(async (req, res) => {
  const result = await Notification.updateMany({ recipient: req.user._id, readAt: null }, { readAt: new Date() })
  res.json({ success: true, modifiedCount: result.modifiedCount })
})

export const broadcast = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.message) throw httpError('title and message are required', 422)
  const filter = req.body.role ? { role: req.body.role, isActive: true } : { isActive: true }
  const users = await User.find(filter).select('_id')
  if (users.length) await Notification.insertMany(users.map((user) => ({ recipient: user._id, title: req.body.title, message: req.body.message, type: req.body.type || 'announcement' })))
  res.status(201).json({ success: true, sent: users.length })
})
