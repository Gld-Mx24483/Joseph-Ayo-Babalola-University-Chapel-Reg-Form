//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://jabu-chapel-reg-form.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'JABU_CHAPEL'
})
.then(() => console.log('Connected to MongoDB (JABU_CHAPEL)'))
.catch((err) => console.error('MongoDB connection error:', err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d) 
    ? d.toISOString().split('T')[0] 
    : null;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  middleName: String,
  sex: { type: String, required: true },
  dob: { type: String, required: true },
  homeTown: { type: String, required: true },
  stateOfOrigin: { type: String, required: true },
  nationality: { type: String, required: true },
  phoneNo: { type: String, required: true },
  whatsappNo: String,
  email: { type: String, required: true },
  address: { type: String, required: true },
  hobbies: String,
  level: { type: String, required: true },
  hostel: String,
  matricNo: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  passportUrl: String,
  attendChurch: { type: Boolean, required: true },
  churchName: String,
  churchStartDate: String,
  newBirth: { type: Boolean, required: true },
  newBirthDate: String,
  salvationExperience: String,
  waterBaptism: { type: Boolean, required: true },
  waterBaptismDate: String,
  communicant: { type: Boolean, required: true },
  notCommunicantReason: String,
  holySpirit: { type: Boolean, required: true },
  notHolySpiritReason: String,
  spiritualGifts: String,
  churchDiscipline: { type: Boolean, required: true },
  disciplineReason: String,
  leadershipTraining: { type: Boolean, required: true },
  leadershipTrainingDetails: String,
  pastorName: String,
  pastorPhone: String,
  lifeVision: String,
  obeyInstructions: { type: Boolean, required: true },
  contributeToChapel: { type: Boolean, required: true },
  sponsorName: { type: String, required: true },
  familyType: { type: String, required: true },
  sponsorOccupation: { type: String, required: true },
  sponsorPhone: { type: String, required: true },
  parentsLivingTogether: { type: Boolean, required: true },
  parentsNotLivingTogetherReason: String,
  bothParentsAlive: { type: Boolean, required: true },
  whichParentAlive: String,
  hasPhysicalDefect: { type: Boolean, required: true },
  physicalDefectType: String,
  oftenIll: { type: Boolean, required: true },
  specialDietOrTreatment: String
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema, 'registration');

app.post('/api/submit-form', upload.single('passport'), async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data:', formData);
    
    const booleanFields = ['attendChurch', 'newBirth', 'waterBaptism', 'communicant', 'holySpirit', 'churchDiscipline', 'leadershipTraining', 'obeyInstructions', 'contributeToChapel', 'parentsLivingTogether', 'bothParentsAlive', 'hasPhysicalDefect', 'oftenIll'];
    booleanFields.forEach(field => {
      if (field in formData) {
        formData[field] = formData[field] === 'true';
      }
    });

    const dateFields = ['dob', 'churchStartDate', 'newBirthDate', 'waterBaptismDate'];
    dateFields.forEach(field => {
      formData[field] = formatDate(formData[field]);
    });

    Object.keys(formData).forEach(key => {
      if (formData[key] === 'undefined') {
        formData[key] = undefined;
      }
    });

    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'passports' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        
        formData.passportUrl = uploadResult.secure_url;
        console.log('Passport uploaded to Cloudinary:', formData.passportUrl);
      } catch (uploadError) {
        console.error('Error uploading to Cloudinary:', uploadError);
        return res.status(500).json({ message: 'Error uploading passport image', error: uploadError.message });
      }
    }

    const newUser = new User(formData);
    await newUser.save();

    res.status(201).json({ message: 'Form submitted successfully', user: newUser });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});


app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  });
  
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to JABU Chaplaincy API' });
  });
  
  module.exports = app;