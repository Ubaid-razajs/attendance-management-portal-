import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  section: { type: String, required: true, trim: true },
  grade: { type: String, trim: true, default: '' },
  room: { type: String, trim: true, default: '' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  academicYear: { type: String, trim: true, default: '' },
  capacity: { type: Number, default: 40 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

classSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true })
export default mongoose.model('Class', classSchema)
