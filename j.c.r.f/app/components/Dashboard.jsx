// // Dashboard.jsx
// import { Button, CircularProgress } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { useEffect, useState } from 'react';
// import API_URL from './api-config';

// const Dashboard = ({ onLogout }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}/api/users`);
//       const data = await response.json();
//       setUsers(data.map((user, index) => ({ ...user, id: index + 1 })));
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const columns = [
//     { field: 'id', headerName: 'S/N', width: 70 },
//     { field: 'firstName', headerName: 'First Name', width: 130 },
//     { field: 'surname', headerName: 'Surname', width: 130 },
//     { field: 'middleName', headerName: 'Middle Name', width: 130 },
//     { field: 'sex', headerName: 'Sex', width: 90 },
//     { field: 'dob', headerName: 'Date of Birth', width: 130 },
//     { field: 'homeTown', headerName: 'Home Town', width: 130 },
//     { field: 'stateOfOrigin', headerName: 'State of Origin', width: 130 },
//     { field: 'nationality', headerName: 'Nationality', width: 130 },
//     { field: 'phoneNo', headerName: 'Phone Number', width: 130 },
//     { field: 'whatsappNo', headerName: 'WhatsApp Number', width: 150 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'address', headerName: 'Address', width: 200 },
//     { field: 'hobbies', headerName: 'Hobbies', width: 200, valueGetter: (params) => params.row.hobbies.join(', ') },
//     { field: 'level', headerName: 'Level', width: 100 },
//     { field: 'hostel', headerName: 'Hostel', width: 100 },
//     { field: 'matricNo', headerName: 'Matric No', width: 130 },
//     { field: 'college', headerName: 'College', width: 150 },
//     { field: 'department', headerName: 'Department', width: 150 },
//     { field: 'passportUrl', headerName: 'Passport URL', width: 200 },
//     { field: 'attendChurch', headerName: 'Attends Church', width: 130, valueGetter: (params) => params.row.attendChurch ? 'Yes' : 'No' },
//     { field: 'churchName', headerName: 'Church Name', width: 150 },
//     { field: 'churchStartDate', headerName: 'Church Start Date', width: 150 },
//     { field: 'newBirth', headerName: 'New Birth', width: 100, valueGetter: (params) => params.row.newBirth ? 'Yes' : 'No' },
//     { field: 'newBirthDate', headerName: 'New Birth Date', width: 130 },
//     { field: 'salvationExperience', headerName: 'Salvation Experience', width: 200 },
//     { field: 'waterBaptism', headerName: 'Water Baptism', width: 130, valueGetter: (params) => params.row.waterBaptism ? 'Yes' : 'No' },
//     { field: 'waterBaptismDate', headerName: 'Water Baptism Date', width: 150 },
//     { field: 'communicant', headerName: 'Communicant', width: 120, valueGetter: (params) => params.row.communicant ? 'Yes' : 'No' },
//     { field: 'notCommunicantReason', headerName: 'Not Communicant Reason', width: 200 },
//     { field: 'holySpirit', headerName: 'Holy Spirit', width: 120, valueGetter: (params) => params.row.holySpirit ? 'Yes' : 'No' },
//     { field: 'notHolySpiritReason', headerName: 'Not Holy Spirit Reason', width: 200 },
//     { field: 'spiritualGifts', headerName: 'Spiritual Gifts', width: 200, valueGetter: (params) => params.row.spiritualGifts.join(', ') },
//     { field: 'churchDiscipline', headerName: 'Church Discipline', width: 150, valueGetter: (params) => params.row.churchDiscipline ? 'Yes' : 'No' },
//     { field: 'disciplineReason', headerName: 'Discipline Reason', width: 200 },
//     { field: 'leadershipTraining', headerName: 'Leadership Training', width: 170, valueGetter: (params) => params.row.leadershipTraining ? 'Yes' : 'No' },
//     { field: 'leadershipTrainingDetails', headerName: 'Leadership Training Details', width: 200 },
//     { field: 'pastorName', headerName: 'Pastor Name', width: 150 },
//     { field: 'pastorPhone', headerName: 'Pastor Phone', width: 130 },
//     { field: 'lifeVision', headerName: 'Life Vision', width: 200 },
//     { field: 'obeyInstructions', headerName: 'Obey Instructions', width: 150, valueGetter: (params) => params.row.obeyInstructions ? 'Yes' : 'No' },
//     { field: 'contributeToChapel', headerName: 'Contribute to Chapel', width: 170, valueGetter: (params) => params.row.contributeToChapel ? 'Yes' : 'No' },
//     { field: 'sponsorName', headerName: 'Sponsor Name', width: 150 },
//     { field: 'familyType', headerName: 'Family Type', width: 130 },
//     { field: 'sponsorOccupation', headerName: 'Sponsor Occupation', width: 170 },
//     { field: 'sponsorPhone', headerName: 'Sponsor Phone', width: 130 },
//     { field: 'parentsLivingTogether', headerName: 'Parents Living Together', width: 200, valueGetter: (params) => params.row.parentsLivingTogether ? 'Yes' : 'No' },
//     { field: 'parentsNotLivingTogetherReason', headerName: 'Parents Not Living Together Reason', width: 250 },
//     { field: 'bothParentsAlive', headerName: 'Both Parents Alive', width: 150, valueGetter: (params) => params.row.bothParentsAlive ? 'Yes' : 'No' },
//     { field: 'whichParentAlive', headerName: 'Which Parent Alive', width: 150 },
//     { field: 'hasPhysicalDefect', headerName: 'Has Physical Defect', width: 170, valueGetter: (params) => params.row.hasPhysicalDefect ? 'Yes' : 'No' },
//     { field: 'physicalDefectType', headerName: 'Physical Defect Type', width: 170 },
//     { field: 'oftenIll', headerName: 'Often Ill', width: 100, valueGetter: (params) => params.row.oftenIll ? 'Yes' : 'No' },
//     { field: 'specialDietOrTreatment', headerName: 'Special Diet or Treatment', width: 200 },
//   ];

//   return (
//     <div className="p-6 max-w-full mx-auto mt-16">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <Button
//           onClick={onLogout}
//           variant="contained"
//           color="secondary"
//         >
//           Log Out
//         </Button>
//       </div>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-6">User Management</h2>
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <CircularProgress />
//           </div>
//         ) : (
//           <div style={{ height: 600, width: '100%' }}>
//             <DataGrid
//               rows={users}
//               columns={columns}
//               pageSize={10}
//               rowsPerPageOptions={[10, 25, 50]}
//               checkboxSelection
//               disableSelectionOnClick
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { Button, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import API_URL from './api-config';

const Dashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      setUsers(data.map((user, index) => ({ ...user, id: index + 1 })));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'S/N', width: 70 },
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
    { field: 'passportUrl', headerName: 'Passport URL', width: 200 },
    { field: 'attendChurch', headerName: 'Attends Church', width: 130, valueGetter: (params) => params.row.attendChurch ? 'Yes' : 'No' },
    { field: 'churchName', headerName: 'Church Name', width: 150 },
    { field: 'churchStartDate', headerName: 'Church Start Date', width: 150 },
    { field: 'newBirth', headerName: 'New Birth', width: 100, valueGetter: (params) => params.row.newBirth ? 'Yes' : 'No' },
    { field: 'newBirthDate', headerName: 'New Birth Date', width: 130 },
    { field: 'salvationExperience', headerName: 'Salvation Experience', width: 200 },
    { field: 'waterBaptism', headerName: 'Water Baptism', width: 130, valueGetter: (params) => params.row.waterBaptism ? 'Yes' : 'No' },
    { field: 'waterBaptismDate', headerName: 'Water Baptism Date', width: 150 },
    { field: 'communicant', headerName: 'Communicant', width: 120, valueGetter: (params) => params.row.communicant ? 'Yes' : 'No' },
    { field: 'notCommunicantReason', headerName: 'Not Communicant Reason', width: 200 },
    { field: 'holySpirit', headerName: 'Holy Spirit', width: 120, valueGetter: (params) => params.row.holySpirit ? 'Yes' : 'No' },
    { field: 'notHolySpiritReason', headerName: 'Not Holy Spirit Reason', width: 200 },
    { field: 'spiritualGifts', headerName: 'Spiritual Gifts', width: 200 },
    { field: 'churchDiscipline', headerName: 'Church Discipline', width: 150, valueGetter: (params) => params.row.churchDiscipline ? 'Yes' : 'No' },
    { field: 'disciplineReason', headerName: 'Discipline Reason', width: 200 },
    { field: 'leadershipTraining', headerName: 'Leadership Training', width: 170, valueGetter: (params) => params.row.leadershipTraining ? 'Yes' : 'No' },
    { field: 'leadershipTrainingDetails', headerName: 'Leadership Training Details', width: 200 },
    { field: 'pastorName', headerName: 'Pastor Name', width: 150 },
    { field: 'pastorPhone', headerName: 'Pastor Phone', width: 130 },
    { field: 'lifeVision', headerName: 'Life Vision', width: 200 },
    { field: 'obeyInstructions', headerName: 'Obey Instructions', width: 150, valueGetter: (params) => params.row.obeyInstructions ? 'Yes' : 'No' },
    { field: 'contributeToChapel', headerName: 'Contribute to Chapel', width: 170, valueGetter: (params) => params.row.contributeToChapel ? 'Yes' : 'No' },
    { field: 'sponsorName', headerName: 'Sponsor Name', width: 150 },
    { field: 'familyType', headerName: 'Family Type', width: 130 },
    { field: 'sponsorOccupation', headerName: 'Sponsor Occupation', width: 170 },
    { field: 'sponsorPhone', headerName: 'Sponsor Phone', width: 130 },
    { field: 'parentsLivingTogether', headerName: 'Parents Living Together', width: 200, valueGetter: (params) => params.row.parentsLivingTogether ? 'Yes' : 'No' },
    { field: 'parentsNotLivingTogetherReason', headerName: 'Parents Not Living Together Reason', width: 250 },
    { field: 'bothParentsAlive', headerName: 'Both Parents Alive', width: 150, valueGetter: (params) => params.row.bothParentsAlive ? 'Yes' : 'No' },
    { field: 'whichParentAlive', headerName: 'Which Parent Alive', width: 150 },
    { field: 'hasPhysicalDefect', headerName: 'Has Physical Defect', width: 170, valueGetter: (params) => params.row.hasPhysicalDefect ? 'Yes' : 'No' },
    { field: 'physicalDefectType', headerName: 'Physical Defect Type', width: 170 },
    { field: 'oftenIll', headerName: 'Often Ill', width: 100, valueGetter: (params) => params.row.oftenIll ? 'Yes' : 'No' },
    { field: 'specialDietOrTreatment', headerName: 'Special Diet or Treatment', width: 200 },
  ];

  return (
    <div className="p-6 max-w-full mx-auto mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={onLogout}
          variant="contained"
          color="secondary"
        >
          Log Out
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">User Management</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;