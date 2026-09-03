import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late', 'excused'], required: true },
  checkInTime: { type: Date },
  note: { type: String, trim: true, default: '' },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source: { type: String, enum: ['manual', 'scanner', 'kiosk', 'api'], default: 'manual' }
}, { timestamps: true })

attendanceSchema.index({ student: 1, date: 1 }, { unique: true })
attendanceSchema.index({ class: 1, date: 1 })
export default mongoose.model('Attendance', attendanceSchema)
