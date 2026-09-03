import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import studentRoutes from './routes/students.js'
import teacherRoutes from './routes/teachers.js'
import classRoutes from './routes/classes.js'
import attendanceRoutes from './routes/attendance.js'
import leaveRoutes from './routes/leaves.js'
import notificationRoutes from './routes/notifications.js'
import reportRoutes from './routes/reports.js'
import settingsRoutes from './routes/settings.js'
import kioskRoutes from './routes/kiosk.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((value) => value.trim())

app.use(helmet())
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false }))

app.get('/api/health', (_req, res) => res.json({ success: true, message: 'Attendance API is running', time: new Date().toISOString() }))
app.use('/api/auth', authRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/leaves', leaveRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/kiosk', kioskRoutes)

app.use(notFound)
app.use(errorHandler)
export default app
