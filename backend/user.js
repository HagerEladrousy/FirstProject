import User from '../models/users.js'
import Med from '../models/med.js'
import fastingBlood from '../models/fastingBlood.js'
import cumulativeBlood from '../models/cumulativeBlood.js'

export const signup = async (req, res) => {
  console.log("users.js called");
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    rePassword,
    gender,
    phoneNumber,
    weight,
    diabetesType,
    birthday,
  } = req.body

  try {
    console.log('Received data:', req.body)
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: 'User already exist' })
    if (password !== rePassword)
      return res.status(400).json({ message: "Passwords don't match" })
    const result = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      rePassword,
      gender,
      phoneNumber,
      weight,
      diabetesType,
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

export const addMed = async (req, res) => {
  const { id, medName, effMaterial, type, start, end } = req.body
  // const result = await Med.findOne( user===id )
  try {
    const result = await Med.create({
      user: id,
      medName,
      effMaterial,
      type,
      start,
      end,
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

export const addFastingBlood = async (req, res) => {
  console.log("req.body=",req.body)
  const { id, value } = req.body
  try {
    const result = await fastingBlood.create({
      user: id,
      value,
      date:new Date(),
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
export const addCumulativeBlood = async (req, res) => {
  const { id, value } = req.body
  try {
    const result = await cumulativeBlood.create({
      user: id,
      value,
      date:new Date(),
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
