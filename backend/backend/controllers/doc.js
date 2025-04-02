import Doctor from '../models/doc.js'

export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    rePassword,
    gender,
    phoneNumber,
    medicalSpecialty,
    experience,

    birthday,
  } = req.body

  try {
    console.log('Received data:', req.body)
    const existingUser = await Doctor.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: 'User already exist' })
    if (password !== rePassword)
      return res.status(400).json({ message: "Passwords don't match" })
    const result = await Doctor.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      rePassword,
      gender,
      phoneNumber,
      medicalSpecialty,
      experience,
      birthday,
    })

    res
      .status(200)
      .json({ message: 'Data received successfully!', data: result })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong in receiving data.', data: error })
  }
}
