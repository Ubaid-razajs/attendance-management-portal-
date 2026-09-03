import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true, default: '' },
  subject: { type: String, trim: true, default: '' },
  qualification: { type: String, trim: true, default: '' },
  joinDate: { type: Date },
  photo: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Teacher', teacherSchema)
