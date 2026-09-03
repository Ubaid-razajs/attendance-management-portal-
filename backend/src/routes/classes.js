import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { listClasses, getClass, createClass, updateClass, deleteClass } from '../controllers/classController.js'

const router = Router()
router.use(protect)
router.get('/', listClasses)
router.get('/:id', getClass)
router.post('/', authorize('admin'), createClass)
router.patch('/:id', authorize('admin'), updateClass)
router.delete('/:id', authorize('admin'), deleteClass)
export default router
