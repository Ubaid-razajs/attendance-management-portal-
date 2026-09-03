import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  schoolName: { type: String, default: 'Attendly School' },
  email: { type: String, default: 'admin@school.com' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  attendanceCutoff: { type: String, default: '08:30' },
  lateAfterMinutes: { type: Number, default: 15 },
  timezone: { type: String, default: 'Asia/Karachi' },
  whatsappEnabled: { type: Boolean, default: false },
  logoUrl: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.model('SchoolSettings', settingsSchema)
