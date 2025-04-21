import Doctor from '../models/doc.js'
import md5 from 'md5'; 
import Note from '../models/note.js'
import Register from '../models/registration.js'
import doc from '../models/doc.js';


export const register=async(req,res)=>{
  const {user,doctor,status}=req.body
  try {
    const registerd = await Register.create({user,doctor,status,registeredAt:new Date()})
    res.status(200).json({success:true,message:"registerd successfuly"})
  } catch (error) {
    console.log(error)
    res.status(400).json({success:false,message:"error in register"})
  }
}

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



export const sendMessage = async (req, res) => {
  console.log(req.body)
  const { doctorId, userId, content } = req.body;

  try {
    // إضافة الرسالة في قاعدة البيانات
    const newNote = new Note({
      doctor: doctorId,
      user: userId,
      content: content,
      createdAt: new Date()
    });
    await newNote.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      note: newNote
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};


export const getMessages = async (req, res) => {
  //console.log(req.body)
  const { doctorId, userId } = req.query;

  try {
    // جلب الرسائل بين الطبيب والمريض
    const messages = await Note.find({
      doctor: doctorId,
      user: userId
    }).sort({ createdAt: 1 });  // ترتيب الرسائل من الأقدم للأحدث

    res.status(200).json({
      success: true,
      messages: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

export const getdoctors = async (req, res) => {
  try {
    
    const doctors = await doc.find({}, 'firstName lastName');  // تحدد فقط البيانات المطلوبة
    
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No doctors found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctors
    });

  } catch (error) {
    console.error('Error getting doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get doctors',
      error: error.message
    });
  }
};

