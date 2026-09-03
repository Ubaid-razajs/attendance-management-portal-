import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { listTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController.js'

const router = Router()
router.use(protect)
router.get('/', listTeachers)
router.get('/:id', getTeacher)
router.post('/', authorize('admin'), createTeacher)
router.patch('/:id', authorize('admin'), updateTeacher)
router.delete('/:id', authorize('admin'), deleteTeacher)
export default router
