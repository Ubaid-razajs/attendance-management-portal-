import { Router } from 'express'
import { login, me, forgotPassword, resetPassword } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = Router()
router.post('/login', login)
router.get('/me', protect, me)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
export default router
