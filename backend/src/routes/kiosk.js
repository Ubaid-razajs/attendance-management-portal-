import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { scan } from '../controllers/kioskController.js'

const router = Router()
router.use(protect, authorize('admin', 'teacher'))
router.post('/scan', scan)
export default router
