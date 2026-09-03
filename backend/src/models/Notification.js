import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  type: { type: String, enum: ['attendance', 'leave', 'system', 'announcement'], default: 'system' },
  readAt: { type: Date, default: null },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true })

notificationSchema.index({ recipient: 1, createdAt: -1 })
export default mongoose.model('Notification', notificationSchema)
