import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { listNotifications, markRead, markAllRead, broadcast } from '../controllers/notificationController.js'

const router = Router()
router.use(protect)
router.get('/', listNotifications)
router.patch('/:id/read', markRead)
router.patch('/read-all', markAllRead)
router.post('/broadcast', authorize('admin'), broadcast)
export default router
