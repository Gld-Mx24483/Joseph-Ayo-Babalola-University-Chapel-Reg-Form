// // //server.js
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const cloudinary = require('cloudinary').v2;
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   dbName: 'JABU_CHAPEL'
// // })
// // .then(() => console.log('Connected to MongoDB (JABU_CHAPEL)'))
// // .catch((err) => console.error('MongoDB connection error:', err));

// // // Configure Cloudinary
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // Configure multer for local storage
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/');
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// //   }
// // });

// // const upload = multer({ storage: storage });

// // // Ensure uploads directory exists
// // if (!fs.existsSync('uploads')) {
// //   fs.mkdirSync('uploads');
// // }

// // // Helper function to format date as YYYY-MM-DD
// // function formatDate(date) {
// //   if (!date) return null;
// //   const d = new Date(date);
// //   return d instanceof Date && !isNaN(d) 
// //     ? d.toISOString().split('T')[0] 
// //     : null;
// // }

// // // Define user schema
// // const userSchema = new mongoose.Schema({
// //   // Personal Information
// //   firstName: { type: String, required: true },
// //   surname: { type: String, required: true },
// //   middleName: String,
// //   sex: { type: String, required: true },
// //   dob: { type: String, required: true },  // Changed to String
// //   homeTown: { type: String, required: true },
// //   stateOfOrigin: { type: String, required: true },
// //   nationality: { type: String, required: true },
// //   phoneNo: { type: String, required: true },
// //   whatsappNo: String,
// //   email: { type: String, required: true },
// //   address: { type: String, required: true },
// //   hobbies: [String],
// //   level: { type: String, required: true },
// //   hostel: String,
// //   matricNo: { type: String, required: true },
// //   college: { type: String, required: true },
// //   department: { type: String, required: true },
// //   passportUrl: String,

// //   // Spirituality
// //   attendChurch: { type: Boolean, required: true },
// //   churchName: String,
// //   churchStartDate: String,  // Changed to String
// //   newBirth: { type: Boolean, required: true },
// //   newBirthDate: String,  // Changed to String
// //   salvationExperience: String,
// //   waterBaptism: { type: Boolean, required: true },
// //   waterBaptismDate: String,  // Changed to String
// //   communicant: { type: Boolean, required: true },
// //   notCommunicantReason: String,
// //   holySpirit: { type: Boolean, required: true },
// //   notHolySpiritReason: String,
// //   spiritualGifts: [String],
// //   churchDiscipline: { type: Boolean, required: true },
// //   disciplineReason: String,
// //   leadershipTraining: { type: Boolean, required: true },
// //   leadershipTrainingDetails: String,
// //   pastorName: String,
// //   pastorPhone: String,
// //   lifeVision: String,
// //   obeyInstructions: { type: Boolean, required: true },
// //   contributeToChapel: { type: Boolean, required: true },

// //   // Family
// //   sponsorName: { type: String, required: true },
// //   familyType: { type: String, required: true },
// //   sponsorOccupation: { type: String, required: true },
// //   sponsorPhone: { type: String, required: true },
// //   parentsLivingTogether: { type: Boolean, required: true },
// //   parentsNotLivingTogetherReason: String,
// //   bothParentsAlive: { type: Boolean, required: true },
// //   whichParentAlive: String,

// //   // Health
// //   hasPhysicalDefect: { type: Boolean, required: true },
// //   physicalDefectType: String,
// //   oftenIll: { type: Boolean, required: true },
// //   specialDietOrTreatment: String
// // }, {
// //   timestamps: true
// // });

// // const User = mongoose.model('User', userSchema, 'registration');

// // // API endpoint to submit form data
// // app.post('/api/submit-form', upload.single('passport'), async (req, res) => {
// //   try {
// //     const formData = req.body;
// //     console.log('Received form data:', formData);
    
// //     // Convert string 'true'/'false' to boolean
// //     const booleanFields = ['attendChurch', 'newBirth', 'waterBaptism', 'communicant', 'holySpirit', 'churchDiscipline', 'leadershipTraining', 'obeyInstructions', 'contributeToChapel', 'parentsLivingTogether', 'bothParentsAlive', 'hasPhysicalDefect', 'oftenIll'];
// //     booleanFields.forEach(field => {
// //       if (field in formData) {
// //         formData[field] = formData[field] === 'true';
// //       }
// //     });

// //     // Format date strings to YYYY-MM-DD
// //     const dateFields = ['dob', 'churchStartDate', 'newBirthDate', 'waterBaptismDate'];
// //     dateFields.forEach(field => {
// //       formData[field] = formatDate(formData[field]);
// //     });

// //     // Handle arrays
// //     const arrayFields = ['hobbies', 'spiritualGifts'];
// //     arrayFields.forEach(field => {
// //       if (field in formData && typeof formData[field] === 'string') {
// //         formData[field] = formData[field].split(',').map(item => item.trim());
// //       } else if (!(field in formData) || formData[field] === 'undefined') {
// //         formData[field] = [];
// //       }
// //     });

// //     // Handle undefined string values
// //     Object.keys(formData).forEach(key => {
// //       if (formData[key] === 'undefined') {
// //         formData[key] = undefined;
// //       }
// //     });

// //     // Upload file to Cloudinary if it exists
// //     if (req.file) {
// //       const result = await cloudinary.uploader.upload(req.file.path, {
// //         folder: 'passports',
// //       });
// //       formData.passportUrl = result.secure_url;
      
// //       // Delete the file from local storage
// //       fs.unlinkSync(req.file.path);
// //     }

// //     const newUser = new User(formData);
// //     await newUser.save();

// //     res.status(201).json({ message: 'Form submitted successfully', user: newUser });
// //   } catch (error) {
// //     console.error('Error submitting form:', error);
// //     res.status(500).json({ message: 'Error submitting form', error: error.message });
// //   }
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// // module.exports = app;

// //server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   dbName: 'JABU_CHAPEL'
// })
// .then(() => console.log('Connected to MongoDB (JABU_CHAPEL)'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure multer for memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Helper function to format date as YYYY-MM-DD
// function formatDate(date) {
//   if (!date) return null;
//   const d = new Date(date);
//   return d instanceof Date && !isNaN(d) 
//     ? d.toISOString().split('T')[0] 
//     : null;
// }

// // Define user schema
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   surname: { type: String, required: true },
//   middleName: String,
//   sex: { type: String, required: true },
//   dob: { type: String, required: true },
//   homeTown: { type: String, required: true },
//   stateOfOrigin: { type: String, required: true },
//   nationality: { type: String, required: true },
//   phoneNo: { type: String, required: true },
//   whatsappNo: String,
//   email: { type: String, required: true },
//   address: { type: String, required: true },
//   hobbies: [String],
//   level: { type: String, required: true },
//   hostel: String,
//   matricNo: { type: String, required: true },
//   college: { type: String, required: true },
//   department: { type: String, required: true },
//   passportUrl: String,
//   attendChurch: { type: Boolean, required: true },
//   churchName: String,
//   churchStartDate: String,
//   newBirth: { type: Boolean, required: true },
//   newBirthDate: String,
//   salvationExperience: String,
//   waterBaptism: { type: Boolean, required: true },
//   waterBaptismDate: String,
//   communicant: { type: Boolean, required: true },
//   notCommunicantReason: String,
//   holySpirit: { type: Boolean, required: true },
//   notHolySpiritReason: String,
//   spiritualGifts: [String],
//   churchDiscipline: { type: Boolean, required: true },
//   disciplineReason: String,
//   leadershipTraining: { type: Boolean, required: true },
//   leadershipTrainingDetails: String,
//   pastorName: String,
//   pastorPhone: String,
//   lifeVision: String,
//   obeyInstructions: { type: Boolean, required: true },
//   contributeToChapel: { type: Boolean, required: true },
//   sponsorName: { type: String, required: true },
//   familyType: { type: String, required: true },
//   sponsorOccupation: { type: String, required: true },
//   sponsorPhone: { type: String, required: true },
//   parentsLivingTogether: { type: Boolean, required: true },
//   parentsNotLivingTogetherReason: String,
//   bothParentsAlive: { type: Boolean, required: true },
//   whichParentAlive: String,
//   hasPhysicalDefect: { type: Boolean, required: true },
//   physicalDefectType: String,
//   oftenIll: { type: Boolean, required: true },
//   specialDietOrTreatment: String
// }, {
//   timestamps: true
// });

// const User = mongoose.model('User', userSchema, 'registration');

// // API endpoint to submit form data
// app.post('/api/submit-form', upload.single('passport'), async (req, res) => {
//   try {
//     const formData = req.body;
//     console.log('Received form data:', formData);
    
//     // Convert string 'true'/'false' to boolean
//     const booleanFields = ['attendChurch', 'newBirth', 'waterBaptism', 'communicant', 'holySpirit', 'churchDiscipline', 'leadershipTraining', 'obeyInstructions', 'contributeToChapel', 'parentsLivingTogether', 'bothParentsAlive', 'hasPhysicalDefect', 'oftenIll'];
//     booleanFields.forEach(field => {
//       if (field in formData) {
//         formData[field] = formData[field] === 'true';
//       }
//     });

//     // Format date strings to YYYY-MM-DD
//     const dateFields = ['dob', 'churchStartDate', 'newBirthDate', 'waterBaptismDate'];
//     dateFields.forEach(field => {
//       formData[field] = formatDate(formData[field]);
//     });

//     // Handle arrays
//     const arrayFields = ['hobbies', 'spiritualGifts'];
//     arrayFields.forEach(field => {
//       if (field in formData && typeof formData[field] === 'string') {
//         formData[field] = formData[field].split(',').map(item => item.trim());
//       } else if (!(field in formData) || formData[field] === 'undefined') {
//         formData[field] = [];
//       }
//     });

//     // Handle undefined string values
//     Object.keys(formData).forEach(key => {
//       if (formData[key] === 'undefined') {
//         formData[key] = undefined;
//       }
//     });

//     // Upload file to Cloudinary if it exists
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.buffer, {
//         folder: 'passports',
//       });
//       formData.passportUrl = result.secure_url;
//     }

//     const newUser = new User(formData);
//     await newUser.save();

//     res.status(201).json({ message: 'Form submitted successfully', user: newUser });
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     res.status(500).json({ message: 'Error submitting form', error: error.message });
//   }
// });

// // In your server.js or a separate routes file
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Error fetching users', error: error.message });
//   }
// });

// // Root route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to JABU Chaplaincy API' });
// });

// // Export the Express app
// module.exports = app;


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.vercel.app'],
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
  hobbies: [String],
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
  spiritualGifts: [String],
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

    const arrayFields = ['hobbies', 'spiritualGifts'];
    arrayFields.forEach(field => {
      if (field in formData && typeof formData[field] === 'string') {
        formData[field] = formData[field].split(',').map(item => item.trim());
      } else if (!(field in formData) || formData[field] === 'undefined') {
        formData[field] = [];
      }
    });

    Object.keys(formData).forEach(key => {
      if (formData[key] === 'undefined') {
        formData[key] = undefined;
      }
    });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: 'passports',
      });
      formData.passportUrl = result.secure_url;
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