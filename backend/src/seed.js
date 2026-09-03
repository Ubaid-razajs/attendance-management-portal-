import 'dotenv/config'
import { connectDB, disconnectDB } from './config/db.js'
import User from './models/User.js'
import Teacher from './models/Teacher.js'
import Class from './models/Class.js'
import Student from './models/Student.js'
import SchoolSettings from './models/SchoolSettings.js'

const password = process.env.SEED_PASSWORD || 'Admin@12345'

async function upsertUser({ email, name, role, phone = '' }) {
  let user = await User.findOne({ email })
  if (!user) user = await User.create({ email, name, role, phone, password })
  else { user.name = name; user.role = role; user.phone = phone; user.isActive = true; await user.save() }
  return user
}

async function seed() {
  await connectDB()
  const admin = await upsertUser({ email: 'admin@school.com', name: 'School Administrator', role: 'admin', phone: '+92 300 0000000' })
  const teacherUser = await upsertUser({ email: 'teacher@school.com', name: 'Ayesha Malik', role: 'teacher', phone: '+92 301 1111111' })
  const parent = await upsertUser({ email: 'parent@school.com', name: 'Muhammad Parent', role: 'parent', phone: '+92 302 2222222' })

  let teacher = await Teacher.findOne({ user: teacherUser._id })
  if (!teacher) teacher = await Teacher.create({ employeeId: 'T-001', user: teacherUser._id, name: teacherUser.name, email: teacherUser.email, phone: teacherUser.phone, subject: 'Computer Science', qualification: 'BS Computer Science', joinDate: new Date() })

  let schoolClass = await Class.findOne({ name: 'Grade 10', section: 'A', academicYear: '2026-27' })
  if (!schoolClass) schoolClass = await Class.create({ name: 'Grade 10', grade: '10', section: 'A', room: '101', teacher: teacher._id, academicYear: '2026-27', capacity: 40 })
  else if (!schoolClass.teacher) { schoolClass.teacher = teacher._id; await schoolClass.save() }

  const sampleStudents = [
    ['ST-001', 'Ali Raza', 'Ahmed Raza', '03001234567', '01'],
    ['ST-002', 'Sara Khan', 'Imran Khan', '03011234567', '02'],
    ['ST-003', 'Hamza Ahmed', 'Tariq Ahmed', '03021234567', '03'],
    ['ST-004', 'Hira Ali', 'Javed Ali', '03031234567', '04']
  ]
  for (const [studentId, name, fatherName, whatsapp, rollNumber] of sampleStudents) {
    await Student.findOneAndUpdate({ studentId }, { studentId, name, fatherName, whatsapp, rollNumber, class: schoolClass._id, parent: parent._id, isActive: true }, { upsert: true, new: true, setDefaultsOnInsert: true })
  }
  await SchoolSettings.findOneAndUpdate({}, { schoolName: 'Attendly School', email: 'admin@school.com', phone: '+92 300 0000000', address: 'Karachi, Pakistan' }, { upsert: true, new: true, setDefaultsOnInsert: true })
  console.log('\nSeed complete')
  console.log('Admin:   admin@school.com')
  console.log('Teacher: teacher@school.com')
  console.log('Parent:  parent@school.com')
  console.log(`Password for all demo users: ${password}\n`)
  console.log(`Created/verified by: ${admin.name}`)
  await disconnectDB()
}

seed().catch(async (error) => { console.error(error); await disconnectDB(); process.exit(1) })
