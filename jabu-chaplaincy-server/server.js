// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: ['http://localhost:3000', 'https://jabu-chapel-reg-form.vercel.app'],
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, {
//   dbName: 'JABU_CHAPEL'
// })
// .then(() => console.log('Connected to MongoDB (JABU_CHAPEL)'))
// .catch((err) => console.error('MongoDB connection error:', err));

// function formatDate(date) {
//   if (!date) return null;
//   const d = new Date(date);
//   return d instanceof Date && !isNaN(d) 
//     ? d.toISOString().split('T')[0] 
//     : null;
// }

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, default: 'N/A' },
//   surname: { type: String, required: true, default: 'N/A' },
//   middleName: { type: String, default: 'N/A' },
//   sex: { type: String, required: true, default: 'N/A' },
//   dob: { type: String, required: true, default: 'N/A' },
//   homeTown: { type: String, required: true, default: 'N/A' },
//   stateOfOrigin: { type: String, required: true, default: 'N/A' },
//   nationality: { type: String, required: true, default: 'N/A' },
//   phoneNo: { type: String, required: true, default: 'N/A' },
//   whatsappNo: { type: String, default: 'N/A' },
//   email: { type: String, required: true, default: 'N/A' },
//   address: { type: String, required: true, default: 'N/A' },
//   hobbies: { type: String, default: 'N/A' },
//   level: { type: String, required: true, default: 'N/A' },
//   hostel: { type: String, default: 'N/A' },
//   matricNo: { type: String, required: true, default: 'N/A' },
//   college: { type: String, required: true, default: 'N/A' },
//   department: { type: String, required: true, default: 'N/A' },
//   passportUrl: { type: String, default: 'N/A' },
//   attendChurch: { type: Boolean, required: true, default: false },
//   churchName: { type: String, default: 'N/A' },
//   churchStartDate: { type: String, default: 'N/A' },
//   newBirth: { type: Boolean, required: true, default: false },
//   newBirthDate: { type: String, default: 'N/A' },
//   salvationExperience: { type: String, default: 'N/A' },
//   waterBaptism: { type: Boolean, required: true, default: false },
//   waterBaptismDate: { type: String, default: 'N/A' },
//   communicant: { type: Boolean, required: true, default: false },
//   notCommunicantReason: { type: String, default: 'N/A' },
//   holySpirit: { type: Boolean, required: true, default: false },
//   notHolySpiritReason: { type: String, default: 'N/A' },
//   spiritualGifts: { type: String, default: 'N/A' },
//   churchDiscipline: { type: Boolean, required: true, default: false },
//   disciplineReason: { type: String, default: 'N/A' },
//   leadershipTraining: { type: Boolean, required: true, default: false },
//   leadershipTrainingDetails: { type: String, default: 'N/A' },
//   pastorName: { type: String, default: 'N/A' },
//   pastorPhone: { type: String, default: 'N/A' },
//   lifeVision: { type: String, default: 'N/A' },
//   obeyInstructions: { type: Boolean, required: true, default: false },
//   contributeToChapel: { type: Boolean, required: true, default: false },
//   sponsorName: { type: String, required: true, default: 'N/A' },
//   familyType: { type: String, required: true, default: 'N/A' },
//   sponsorOccupation: { type: String, required: true, default: 'N/A' },
//   sponsorPhone: { type: String, required: true, default: 'N/A' },
//   parentsLivingTogether: { type: Boolean, required: true, default: false },
//   parentsNotLivingTogetherReason: { type: String, default: 'N/A' },
//   bothParentsAlive: { type: Boolean, required: true, default: false },
//   whichParentAlive: { type: String, default: 'N/A' },
//   hasPhysicalDefect: { type: Boolean, required: true, default: false },
//   physicalDefectType: { type: String, default: 'N/A' },
//   oftenIll: { type: Boolean, required: true, default: false },
//   specialDietOrTreatment: { type: String, default: 'N/A' }
// }, {
//   timestamps: true
// });

// const User = mongoose.model('User', userSchema, 'registration');

// app.post('/api/submit-form', async (req, res) => {
//   try {
//     const formData = req.body;
//     console.log('Received form data:', formData);
    
//     const booleanFields = ['attendChurch', 'newBirth', 'waterBaptism', 'communicant', 'holySpirit', 'churchDiscipline', 'leadershipTraining', 'obeyInstructions', 'contributeToChapel', 'parentsLivingTogether', 'bothParentsAlive', 'hasPhysicalDefect', 'oftenIll'];
//     booleanFields.forEach(field => {
//       if (field in formData) {
//         formData[field] = formData[field] === 'true' || formData[field] === true;
//       }
//     });

//     const dateFields = ['dob', 'churchStartDate', 'newBirthDate', 'waterBaptismDate'];
//     dateFields.forEach(field => {
//       formData[field] = formatDate(formData[field]);
//     });

//     // Set all undefined, null, or empty string values to 'N/A'
//     Object.keys(formData).forEach(key => {
//       if (formData[key] === undefined || formData[key] === 'undefined' || formData[key] === null || formData[key] === '') {
//         formData[key] = 'N/A';
//       }
//     });

//     // Ensure all required fields are set to 'N/A' if they're missing
//     const requiredFields = ['firstName', 'surname', 'sex', 'dob', 'homeTown', 'stateOfOrigin', 'nationality', 'phoneNo', 'email', 'address', 'level', 'matricNo', 'college', 'department'];
//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         formData[field] = 'N/A';
//       }
//     });

//     const newUser = new User(formData);
//     await newUser.save();

//     res.status(201).json({ message: 'Form submitted successfully', user: newUser });
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     res.status(500).json({ 
//       message: 'Error submitting form', 
//       error: error.message,
//       stack: error.stack
//     });
//   }
// });

// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Error fetching users', error: error.message });
//   }
// });

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to JABU Chaplaincy API' });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Updated CORS configuration
app.use(cors({
  origin: ['https://jabu-chapel-reg-form.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'JABU_CHAPEL'
})
.then(() => console.log('Connected to MongoDB (JABU_CHAPEL)'))
.catch((err) => console.error('MongoDB connection error:', err));

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d) 
    ? d.toISOString().split('T')[0] 
    : null;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, default: 'N/A' },
  surname: { type: String, required: true, default: 'N/A' },
  middleName: { type: String, default: 'N/A' },
  sex: { type: String, required: true, default: 'N/A' },
  dob: { type: String, required: true, default: 'N/A' },
  homeTown: { type: String, required: true, default: 'N/A' },
  stateOfOrigin: { type: String, required: true, default: 'N/A' },
  nationality: { type: String, required: true, default: 'N/A' },
  phoneNo: { type: String, required: true, default: 'N/A' },
  whatsappNo: { type: String, default: 'N/A' },
  email: { type: String, required: true, default: 'N/A' },
  address: { type: String, required: true, default: 'N/A' },
  hobbies: { type: String, default: 'N/A' },
  level: { type: String, required: true, default: 'N/A' },
  hostel: { type: String, default: 'N/A' },
  matricNo: { type: String, required: true, default: 'N/A' },
  college: { type: String, required: true, default: 'N/A' },
  department: { type: String, required: true, default: 'N/A' },
  passportUrl: { type: String, default: 'N/A' },
  attendChurch: { type: Boolean, required: true, default: false },
  churchName: { type: String, default: 'N/A' },
  churchStartDate: { type: String, default: 'N/A' },
  newBirth: { type: Boolean, required: true, default: false },
  newBirthDate: { type: String, default: 'N/A' },
  salvationExperience: { type: String, default: 'N/A' },
  waterBaptism: { type: Boolean, required: true, default: false },
  waterBaptismDate: { type: String, default: 'N/A' },
  communicant: { type: Boolean, required: true, default: false },
  notCommunicantReason: { type: String, default: 'N/A' },
  holySpirit: { type: Boolean, required: true, default: false },
  notHolySpiritReason: { type: String, default: 'N/A' },
  spiritualGifts: { type: String, default: 'N/A' },
  churchDiscipline: { type: Boolean, required: true, default: false },
  disciplineReason: { type: String, default: 'N/A' },
  leadershipTraining: { type: Boolean, required: true, default: false },
  leadershipTrainingDetails: { type: String, default: 'N/A' },
  pastorName: { type: String, default: 'N/A' },
  pastorPhone: { type: String, default: 'N/A' },
  lifeVision: { type: String, default: 'N/A' },
  obeyInstructions: { type: Boolean, required: true, default: false },
  contributeToChapel: { type: Boolean, required: true, default: false },
  sponsorName: { type: String, required: true, default: 'N/A' },
  familyType: { type: String, required: true, default: 'N/A' },
  sponsorOccupation: { type: String, required: true, default: 'N/A' },
  sponsorPhone: { type: String, required: true, default: 'N/A' },
  parentsLivingTogether: { type: Boolean, required: true, default: false },
  parentsNotLivingTogetherReason: { type: String, default: 'N/A' },
  bothParentsAlive: { type: Boolean, required: true, default: false },
  whichParentAlive: { type: String, default: 'N/A' },
  hasPhysicalDefect: { type: Boolean, required: true, default: false },
  physicalDefectType: { type: String, default: 'N/A' },
  oftenIll: { type: Boolean, required: true, default: false },
  specialDietOrTreatment: { type: String, default: 'N/A' }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema, 'registration');

// Pre-flight route handler for CORS
app.options('*', cors());

app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data:', formData);
    
    const booleanFields = ['attendChurch', 'newBirth', 'waterBaptism', 'communicant', 'holySpirit', 'churchDiscipline', 'leadershipTraining', 'obeyInstructions', 'contributeToChapel', 'parentsLivingTogether', 'bothParentsAlive', 'hasPhysicalDefect', 'oftenIll'];
    booleanFields.forEach(field => {
      if (field in formData) {
        formData[field] = formData[field] === 'true' || formData[field] === true;
      }
    });

    const dateFields = ['dob', 'churchStartDate', 'newBirthDate', 'waterBaptismDate'];
    dateFields.forEach(field => {
      formData[field] = formatDate(formData[field]);
    });

    // Set all undefined, null, or empty string values to 'N/A'
    Object.keys(formData).forEach(key => {
      if (formData[key] === undefined || formData[key] === 'undefined' || formData[key] === null || formData[key] === '') {
        formData[key] = 'N/A';
      }
    });

    // Ensure all required fields are set to 'N/A' if they're missing
    const requiredFields = ['firstName', 'surname', 'sex', 'dob', 'homeTown', 'stateOfOrigin', 'nationality', 'phoneNo', 'email', 'address', 'level', 'matricNo', 'college', 'department'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        formData[field] = 'N/A';
      }
    });

    const newUser = new User(formData);
    await newUser.save();

    res.status(201).json({ message: 'Form submitted successfully', user: newUser });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      message: 'Error submitting form', 
      error: error.message,
      stack: error.stack
    });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;