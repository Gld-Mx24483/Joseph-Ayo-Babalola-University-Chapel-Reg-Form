//Dashboard.jsx
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import API_URL from './api-config';

const Dashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDeleteSelected = () => {
    setDeleteAll(false);
    setDeleteDialogOpen(true);
  };

  const handleDeleteAll = () => {
    setDeleteAll(true);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const userIds = deleteAll ? [] : selectedRows;
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds: deleteAll ? [] : selectedRows }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete users');
      }

      const result = await response.json();
      alert(result.message);
      setDeleteDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting users:', error);
      alert('Error deleting users');
    }
  };

  const handleUploadTemplate = async () => {
    if (!selectedFile) return;

    setUploadLoading(true);
    const formData = new FormData();
    formData.append('template', selectedFile);

    try {
      const response = await fetch(`${API_URL}/api/upload-template`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      alert('Template uploaded successfully');
      setUploadDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading template:', error);
      alert('Error uploading template');
    } finally {
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      
      const formattedUsers = data.users.map((user, index) => ({
        ...user,
        id: index + 1,
        attendChurch: user.attendChurch ? "Yes" : "No",
        newBirth: user.newBirth ? "Yes" : "No",
        waterBaptism: user.waterBaptism ? "Yes" : "No",
        communicant: user.communicant ? "Yes" : "No",
        holySpirit: user.holySpirit ? "Yes" : "No",
        churchDiscipline: user.churchDiscipline ? "Yes" : "No",
        bothParentsAlive: user.bothParentsAlive ? "Yes" : "No",
        hasPhysicalDefect: user.hasPhysicalDefect ? "Yes" : "No",
        oftenIll: user.oftenIll ? "Yes" : "No",
      }));
      
      setUsers(formattedUsers);
      setTotalUsers(data.users.length);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/user-pdf/${userId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'user_registration.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const columns = [
    { field: 'id', headerName: 'S/N', width: 70 },
    { 
      field: 'passportUrl', 
      headerName: 'Passport', 
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Passport"
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={() => handleImageClick(params.value)}
        />
      ),
    },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'surname', headerName: 'Surname', width: 130 },
    { field: 'middleName', headerName: 'Middle Name', width: 130 },
    { field: 'sex', headerName: 'Sex', width: 90 },
    { field: 'dob', headerName: 'Date of Birth', width: 130 },
    { field: 'homeTown', headerName: 'Home Town', width: 130 },
    { field: 'stateOfOrigin', headerName: 'State of Origin', width: 130 },
    { field: 'nationality', headerName: 'Nationality', width: 130 },
    { field: 'phoneNo', headerName: 'Phone Number', width: 130 },
    { field: 'whatsappNo', headerName: 'WhatsApp Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'hobbies', headerName: 'Hobbies', width: 200 },
    { field: 'level', headerName: 'Level', width: 100 },
    { field: 'hostel', headerName: 'Hostel', width: 100 },
    { field: 'matricNo', headerName: 'Matric No', width: 130 },
    { field: 'college', headerName: 'College', width: 150 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'attendChurch', headerName: 'Attends Church', width: 130 },
    { field: 'churchName', headerName: 'Church Name', width: 150 },
    { field: 'churchStartDate', headerName: 'Church Start Date', width: 150 },
    { field: 'newBirth', headerName: 'New Birth', width: 100 },
    { field: 'newBirthDate', headerName: 'New Birth Date', width: 130 },
    { field: 'salvationExperience', headerName: 'Salvation Experience', width: 200 },
    { field: 'waterBaptism', headerName: 'Water Baptism', width: 130 },
    { field: 'waterBaptismDate', headerName: 'Water Baptism Date', width: 150 },
    { field: 'communicant', headerName: 'Communicant', width: 120 },
    { field: 'notCommunicantReason', headerName: 'Not Communicant Reason', width: 200 },
    { field: 'holySpirit', headerName: 'Holy Spirit', width: 120 },
    { field: 'notHolySpiritReason', headerName: 'Not Holy Spirit Reason', width: 200 },
    { field: 'spiritualGifts', headerName: 'Spiritual Gifts', width: 200 },
    { field: 'churchDiscipline', headerName: 'Church Discipline', width: 150 },
    { field: 'disciplineReason', headerName: 'Discipline Reason', width: 200 },
    { field: 'leadershipTraining', headerName: 'Leadership Training', width: 170 },
    { field: 'leadershipTrainingDetails', headerName: 'Leadership Training Details', width: 200 },
    { field: 'pastorName', headerName: 'Pastor Name', width: 150 },
    { field: 'pastorPhone', headerName: 'Pastor Phone', width: 130 },
    { field: 'lifeVision', headerName: 'Life Vision', width: 200 },
    { field: 'obeyInstructions', headerName: 'Obey Instructions', width: 150 },
    { field: 'contributeToChapel', headerName: 'Contribute to Chapel', width: 170 },
    { field: 'sponsorName', headerName: 'Sponsor Name', width: 150 },
    { field: 'familyType', headerName: 'Family Type', width: 130 },
    { field: 'sponsorOccupation', headerName: 'Sponsor Occupation', width: 170 },
    { field: 'sponsorPhone', headerName: 'Sponsor Phone', width: 130 },
    { field: 'parentsLivingTogether', headerName: 'Parents Living Together', width: 200 },
    { field: 'parentsNotLivingTogetherReason', headerName: 'Parents Not Living Together Reason', width: 250 },
    { field: 'bothParentsAlive', headerName: 'Both Parents Alive', width: 150 },
    { field: 'whichParentAlive', headerName: 'Which Parent Alive', width: 150 },
    { field: 'hasPhysicalDefect', headerName: 'Has Physical Defect', width: 170 },
    { field: 'physicalDefectType', headerName: 'Physical Defect Type', width: 170 },
    { field: 'oftenIll', headerName: 'Often Ill', width: 100 },
    { field: 'specialDietOrTreatment', headerName: 'Special Diet or Treatment', width: 200 },
    {
      field: 'downloadPDF',
      headerName: 'Download PDF',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleDownloadPDF(params.row._id)}
        >
          Download PDF
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-full mx-auto mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <Button
            onClick={() => setUploadDialogOpen(true)}
            variant="contained"
            color="primary"
            className="mr-4"
          >
            Upload Template
          </Button>
          <Button
            onClick={handleDeleteSelected}
            variant="contained"
            color="secondary"
            disabled={selectedRows.length === 0}
            className="mr-4"
          >
            Delete Selected
          </Button>
          <Button
            onClick={handleDeleteAll}
            variant="contained"
            color="error"
            className="mr-4"
          >
            Delete All
          </Button>
          <Button
            onClick={onLogout}
            variant="contained"
            color="secondary"
          >
            Log Out
          </Button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl text-black font-semibold mb-6">Chapel Registration</h2>
        <p className="text-lg mb-4">Total number of documents: {totalUsers}</p>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
              loading={loading}
              rowHeight={80}
            />
          </div>
        )}
      </div>
      <Dialog open={!!selectedImage} onClose={handleCloseImage} maxWidth="md" fullWidth>
        <img src={selectedImage} alt="Full-size passport" style={{ width: '100%', height: 'auto' }} />
      </Dialog>
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>Upload Document Template</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept=".docx"
            onChange={handleFileSelect}
            className="mt-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleUploadTemplate} 
            disabled={!selectedFile || uploadLoading}
          >
            {uploadLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteAll
              ? "Are you sure you want to delete all users? This action cannot be undone."
              : `Are you sure you want to delete ${selectedRows.length} selected user(s)? This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;