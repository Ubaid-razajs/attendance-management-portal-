import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { getSettings, updateSettings } from '../controllers/settingsController.js'

const router = Router()
router.use(protect)
router.get('/', getSettings)
router.patch('/', authorize('admin'), updateSettings)
export default router
