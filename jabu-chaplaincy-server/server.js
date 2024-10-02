// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const mammoth = require('mammoth');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: ['https://jabu-chapel-reg-form.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST','DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '100mb' }));

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'JABU_CHAPEL'
})
.then(() => console.log('Connected to MongoDB (JABU_CHAPEL)'))
.catch((err) => console.error('MongoDB connection error:', err));

const { MONGODB_URI } = process.env;

if (!PORT || !MONGODB_URI) {
  console.error('Missing required environment variables');
  process.exit(1);
}

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d) 
    ? d.toISOString().split('T')[0] 
    : null;
}

const templateSchema = new mongoose.Schema({
  content: { type: Buffer, required: true },
  fileName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

const Template = mongoose.model('Template', templateSchema);

// Multer setup for file upload
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// New endpoint to upload document template
app.post('/api/upload-template', upload.single('template'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Deactivate all existing templates
    await Template.updateMany({}, { isActive: false });

    // Create new template
    const newTemplate = new Template({
      content: req.file.buffer,
      fileName: req.file.originalname,
      isActive: true
    });

    await newTemplate.save();
    res.status(201).json({ message: 'Template uploaded successfully' });
  } catch (error) {
    console.error('Error uploading template:', error);
    res.status(500).json({ message: 'Error uploading template' });
  }
});

// Add the convertHtmlToPdf function
function convertHtmlToPdf(html) {
  return new Promise((resolve, reject) => {
    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

app.post('/api/generate-pdf', async (req, res) => {
  try {
    const formData = req.body;

    // Create the HTML content
    const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body, html {
        margin: 0;
        padding: 0;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.4;
        color: #333;
      }
      .container {
        width: 100%;
        max-width: 800px;
        margin: auto;
        padding: 20px;
      }
       .header {
        text-align: left;
        padding-bottom: 20px;
      }
       h1 {
        color: #333;
        margin-bottom: 10px;
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 1.2;
      }
      .header-line {
        border-bottom: 2px solid #333;
        margin-bottom: 20px;
      }
      .timestamp {
        color: red;
        font-size: 14px;
        margin-bottom: 20px;
      }
      .content {
        margin-bottom: 20px;
      }
      .details span {
        font-weight: bold;
      }
      .image-container {
        float: right;
        width: 120px;
        height: 150px;
        border: 1px solid #333;
        margin-left: 20px;
        margin-right: 30px;
      }
      .passport-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .letter-body {
        clear: both;
        margin-top: 60px;
      }
      .signature-section {
        margin-top: 100px;
      }
      .signature-line {
        display: inline-block;
        width: 180px;
        border-bottom: 1px solid #333;
      }
      .signature {
        display: inline-block;
        width: 45%;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>JABU CHAPLAINCY UNIT<br>REGISTRATION VERIFICATION<br>DOCUMENT</h1>
        <div class="header-line"></div>
      </div>
      <div class="timestamp">
        <script>
          var now = new Date();
          var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
          document.write(now.toLocaleDateString('en-US', options).replace(/,/g, ''));
        </script>
      </div>
      <div class="content">
        <div class="image-container">
          <img class="passport-img" src="${formData.passportUrl}" alt="Passport Photo">
        </div>
        <div class="details">
          <p>Dear <span>${formData.firstName} ${formData.surname}</span>,</p>
          <p><span>${formData.department}</span></p>
          <p><span>${formData.level} Level</span></p>
          <p><span>${formData.phoneNo}</span></p>
          <p><span>${formData.sex}</span></p>
        </div>
      </div>
      <div class="letter-body">
        <p>
          You've completed your Chaplaincy Clearance form successfully. You are now authorized to meet with the Chaplain to present this slip for his signature.
        </p>
        <p>Remain Blessed,</p>
      </div>
      <div class="signature-section">
        <div class="signature">
          <div class="signature-line"></div>
          <p>Pastor Oluwasanmi J.O.</p>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="signature">
          <div class="signature-line"></div>
          <p>${formData.firstName} ${formData.surname}</p>
        </div>
      </div>
    </div>
  </body>
</html>
    `;

    // Convert the HTML to PDF
    const pdfBuffer = await convertHtmlToPdf(htmlContent);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="chaplaincy_form.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF', error: error.message });
  }
});


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
  specialDietOrTreatment: { type: String, default: 'N/A' },
  htmlContent: { type: String, required: true }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema, 'registration');

app.options('*', cors());

app.post('/api/submit-form', async (req, res) => {
  try {
    const { htmlContent, ...formData } = req.body;

    // Convert boolean fields
    const booleanFields = ['attendChurch', 'newBirth', 'waterBaptism', 'communicant', 'holySpirit', 'churchDiscipline', 'leadershipTraining', 'obeyInstructions', 'contributeToChapel', 'parentsLivingTogether', 'bothParentsAlive', 'hasPhysicalDefect', 'oftenIll'];
    booleanFields.forEach(field => {
      if (field in formData) {
        formData[field] = formData[field] === 'true' || formData[field] === true;
      }
    });

    // Format date fields
    const dateFields = ['dob', 'churchStartDate', 'newBirthDate', 'waterBaptismDate'];
    dateFields.forEach(field => {
      formData[field] = formatDate(formData[field]);
    });

    // Create new user with HTML content
    const newUser = new User({
      ...formData,
      htmlContent
    });
    await newUser.save();

    res.status(201).json({ message: 'Form submitted successfully', user: newUser });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      message: 'Error submitting form', 
      error: error.message
    });
  }
});

app.delete('/api/users', async (req, res) => {
  try {
    const { userIds } = req.body;

    if (userIds && userIds.length > 0) {
      // Delete specific users
      const result = await User.deleteMany({ _id: { $in: userIds } });
      res.json({ message: `${result.deletedCount} user(s) deleted successfully` });
    } else {
      // Delete all users
      const result = await User.deleteMany({});
      res.json({ message: `All users (${result.deletedCount}) deleted successfully` });
    }
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Error deleting users', error: error.message });
  }
});

app.post('/api/generate-html', async (req, res) => {
  try {
    const formData = req.body;

    // Get the active template
    const template = await Template.findOne({ isActive: true });
    if (!template) {
      throw new Error('No active template found');
    }

    // Convert the Word document to HTML
    const result = await mammoth.convertToHtml({ buffer: template.content });
    let htmlContent = result.value;

    // Handle passport image and form variables replacements
    if (formData.passportUrl) {
      const imgTag = `<img src="${formData.passportUrl}" alt="Passport Photo" style="max-width: 200px; height: auto;">`;
      htmlContent = htmlContent.replace(/{{passportUrl}}/g, imgTag);
    }

    Object.keys(formData).forEach(key => {
      if (key !== 'passportUrl') {  // Skip passportUrl as we've already handled it
        const regex = new RegExp(`{{${key}}}`, 'g');
        htmlContent = htmlContent.replace(regex, formData[key] || '');
      }
    });

    // Return the HTML content as the response
    res.send(htmlContent);
  } catch (error) {
    console.error('Error generating HTML:', error);
    res.status(500).json({ message: 'Error generating HTML', error: error.message });
  }
});


app.get('/api/test-pdf', async (req, res) => {
  try {
    const testHtml = `
      <h1>Test PDF Generation</h1>
      <p>This is a test PDF generated from HTML.</p>
      <p>Current time: ${new Date().toLocaleString()}</p>
    `;
    
    const pdfBuffer = await convertHtmlToPdf(testHtml);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="test.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating test PDF:', error);
    res.status(500).json({ message: 'Error generating test PDF', error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { pdfFile: 0 }) // Exclude pdfFile field
      .skip(skip)
      .limit(limit)
      .lean();

    const totalRows = await User.countDocuments();

    res.json({
      users,
      totalRows,
      totalPages: Math.ceil(totalRows / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { pdfFile: 0 }) // Exclude pdfFile field
      .skip(skip)
      .limit(limit)
      .lean();

    const totalRows = await User.countDocuments();

    console.log(`Total number of users in the database: ${totalRows}`); // Add this line to print the total number of users

    res.json({
      users,
      totalRows,
      totalPages: Math.ceil(totalRows / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

app.get('/api/download-html/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.htmlContent) {
      return res.status(404).json({ error: 'HTML content not found' });
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(user.htmlContent);
  } catch (error) {
    console.error('Error fetching HTML:', error);
    res.status(500).json({ error: 'Error fetching HTML', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to JABU Chaplaincy API' });
});

module.exports = app;