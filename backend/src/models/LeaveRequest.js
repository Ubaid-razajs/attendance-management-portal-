import mongoose from 'mongoose'

const leaveSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date },
  reviewNote: { type: String, trim: true, default: '' }
}, { timestamps: true })

leaveSchema.index({ student: 1, startDate: 1, endDate: 1 })
export default mongoose.model('LeaveRequest', leaveSchema)
