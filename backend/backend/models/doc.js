import mongoose from 'mongoose'

const docSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rePassword: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  medicalSpecialty: { type: String, required: true },
  experience: { type: String, required: true },
  birthday: { type: Date, required: true },
})

export default mongoose.model('Doctor', docSchema)
