import User from '../models/User.js'
import { verifyToken } from '../utils/jwt.js'
import { asyncHandler, httpError } from '../utils/asyncHandler.js'

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || ''
  if (!header.startsWith('Bearer ')) throw httpError('Authentication required', 401)
  let payload
  try {
    payload = verifyToken(header.slice(7))
  } catch {
    throw httpError('Invalid or expired token', 401)
  }
  const user = await User.findById(payload.sub).select('-password -resetPasswordToken -resetPasswordExpires')
  if (!user || !user.isActive) throw httpError('User account is unavailable', 401)
  req.user = user
  next()
})

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(httpError('Forbidden', 403))
  next()
}
