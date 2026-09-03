import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { overview, attendanceReport, exportAttendance } from '../controllers/reportController.js'

const router = Router()
router.use(protect)
router.get('/overview', authorize('admin'), overview)
router.get('/attendance', attendanceReport)
router.get('/attendance/export', authorize('admin'), exportAttendance)
export default router
