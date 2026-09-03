import crypto from 'crypto'
import User from '../models/User.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'
import { signToken } from '../utils/jwt.js'

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar, isActive: user.isActive }
}

export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body
  if (!email || !password) throw httpError('Email and password are required', 422)
  const user = await User.findOne({ email: email.toLowerCase(), ...(role ? { role } : {}) }).select('+password')
  if (!user || !user.isActive || !(await user.comparePassword(password))) throw httpError('Invalid email, password, or role', 401)
  const token = signToken(user)
  res.json({ success: true, token, user: publicUser(user) })
})

export const me = asyncHandler(async (req, res) => res.json({ success: true, user: publicUser(req.user) }))

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email?.toLowerCase() }).select('+resetPasswordToken +resetPasswordExpires')
  // Do not reveal whether an email exists.
  if (!user) return res.json({ success: true, message: 'If the account exists, a reset link has been generated.' })
  const rawToken = crypto.randomBytes(32).toString('hex')
  user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex')
  user.resetPasswordExpires = new Date(Date.now() + Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 15) * 60 * 1000)
  await user.save({ validateBeforeSave: false })
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${rawToken}`
  res.json({ success: true, message: 'If the account exists, a reset link has been generated.', ...(process.env.NODE_ENV !== 'production' ? { resetUrl, resetToken: rawToken } : {}) })
})

export const resetPassword = asyncHandler(async (req, res) => {
  const hashed = crypto.createHash('sha256').update(req.body.token || '').digest('hex')
  const user = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpires: { $gt: new Date() } }).select('+password +resetPasswordToken +resetPasswordExpires')
  if (!user) throw httpError('Reset token is invalid or expired', 400)
  if (!req.body.password || req.body.password.length < 6) throw httpError('Password must be at least 6 characters', 422)
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  await user.save()
  res.json({ success: true, message: 'Password reset successfully' })
})
