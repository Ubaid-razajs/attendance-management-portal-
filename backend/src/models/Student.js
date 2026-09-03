import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true, default: '' },
  whatsapp: { type: String, trim: true, default: '' },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  rollNumber: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: '' },
  photo: { type: String, default: '' },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

studentSchema.index({ name: 'text', studentId: 'text', fatherName: 'text' })
export default mongoose.model('Student', studentSchema)
