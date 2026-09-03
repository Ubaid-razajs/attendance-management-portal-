import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { listStudents, getStudent, createStudent, updateStudent, deleteStudent, studentIdCard } from '../controllers/studentController.js'

const router = Router()
router.use(protect)
router.get('/', listStudents)
router.get('/:id/id-card', studentIdCard)
router.get('/:id', getStudent)
router.post('/', authorize('admin'), createStudent)
router.patch('/:id', authorize('admin'), updateStudent)
router.delete('/:id', authorize('admin'), deleteStudent)
export default router
