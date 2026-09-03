import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { listLeaves, createLeave, updateLeaveStatus, getLeave } from '../controllers/leaveController.js'

const router = Router()
router.use(protect)
router.get('/', listLeaves)
router.get('/:id', getLeave)
router.post('/', authorize('parent'), createLeave)
router.patch('/:id/status', authorize('admin', 'teacher'), updateLeaveStatus)
export default router
