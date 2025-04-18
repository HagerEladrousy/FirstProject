import User from '../models/admin.js'
export const signup = async (req, res) => {
    console.log(req.body)
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      birthday,
    } = req.body;
     try {
      const newAdmin =await  User.create({
        firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      birthday
      })
      res.status(201).json({success:true,message:"Admin created successfuly"})
     } catch (error) {
      console.log(error)
      res.status(400).json({success:false,message:"error in signup"})
     }
}  