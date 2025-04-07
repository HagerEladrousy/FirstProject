import Doctor from '../models/doc.js'
import md5 from 'md5'; 



export const signup = async (req, res) => {
  console.log(req.body)
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
  } = req.body;

  try {
    console.log('Signup attempt for doctor:', email);

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor already exists',
      });
    }

    if (password !== rePassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords don't match",
      });
    }

    if (isNaN(experience) || Number(experience) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Experience must be a non-negative number',
      });
    }

    const hashedPassword = md5(password);

    const newDoctor = await Doctor.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      rePassword: hashedPassword,
      gender,
      phoneNumber,
      medicalSpecialty,
      experience: Number(experience),
      birthday: new Date(birthday),
    });

    res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      doctor: {
        id: newDoctor._id,
        email: newDoctor.email,
        userName: newDoctor.userName,
        medicalSpecialty: newDoctor.medicalSpecialty,
      },
    });

  } catch (error) {
    console.error('Doctor signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating doctor',
      error: error.message,
    });
  }
};





export const signin = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  try {
    console.log('Login attempt for:', email);

    const user = await Doctor.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const hashedPassword = md5(password);
    console.log('Input hash:', hashedPassword);
    console.log('Stored hash:', user.password);

    if (user.password !== hashedPassword) {
      console.log('Password mismatch');
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    console.log('Login successful for:', email);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};
