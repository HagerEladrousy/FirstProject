import mongoose from 'mongoose'

const medSchema = mongoose.Schema({
  user: { type: String, required: true },
  medName: { type: String, required: true },
  effMaterial: { type: String, required: true },
  type: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
})

export default mongoose.model('Med', medSchema)
