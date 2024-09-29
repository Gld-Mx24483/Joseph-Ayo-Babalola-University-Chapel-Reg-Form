import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchRole, setSearchRole] = useState('');

  useEffect(() => {
    // Fetch users from API
    // For now, we'll use dummy data
    setUsers([
      {
        firstName: 'ADEDAPO',
        surname: 'TOKI',
        middleName: 'ISRAEL',
        sex: 'Male',
        dob: '1990-01-01',
        homeTown: 'Lagos',
        stateOfOrigin: 'Lagos',
        nationality: 'Nigerian',
        phoneNo: '08106775113',
        whatsappNo: '08106775113',
        email: 'israeltoki7@gmail.com',
        address: 'Block 4 Flat 3, Abesan Housing Estate, Ipaja, Lagos, Nigeria',
        hobbies: ['Reading', 'Coding'],
        level: 'Senior',
        hostel: 'Block A',
        matricNo: '12345',
        college: 'Engineering',
        department: 'Computer Science',
        passportUrl: 'https://example.com/passport.jpg',
      },
      // Add more dummy users here
    ]);
  }, []);

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">User Management</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Search by Role"
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Incoming Member Requests
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Members in the Team
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
            Volunteers
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">First Name</th>
                <th className="px-4 py-2 text-left border-b">Surname</th>
                <th className="px-4 py-2 text-left border-b">Middle Name</th>
                <th className="px-4 py-2 text-left border-b">Sex</th>
                <th className="px-4 py-2 text-left border-b">Date of Birth</th>
                <th className="px-4 py-2 text-left border-b">Home Town</th>
                <th className="px-4 py-2 text-left border-b">State of Origin</th>
                <th className="px-4 py-2 text-left border-b">Nationality</th>
                <th className="px-4 py-2 text-left border-b">Phone Number</th>
                <th className="px-4 py-2 text-left border-b">WhatsApp Number</th>
                <th className="px-4 py-2 text-left border-b">Email</th>
                <th className="px-4 py-2 text-left border-b">Address</th>
                <th className="px-4 py-2 text-left border-b">Hobbies</th>
                <th className="px-4 py-2 text-left border-b">Level</th>
                <th className="px-4 py-2 text-left border-b">Hostel</th>
                <th className="px-4 py-2 text-left border-b">Matric No</th>
                <th className="px-4 py-2 text-left border-b">College</th>
                <th className="px-4 py-2 text-left border-b">Department</th>
                <th className="px-4 py-2 text-left border-b">Passport URL</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-2 border-b">{user.firstName}</td>
                  <td className="px-4 py-2 border-b">{user.surname}</td>
                  <td className="px-4 py-2 border-b">{user.middleName}</td>
                  <td className="px-4 py-2 border-b">{user.sex}</td>
                  <td className="px-4 py-2 border-b">{user.dob}</td>
                  <td className="px-4 py-2 border-b">{user.homeTown}</td>
                  <td className="px-4 py-2 border-b">{user.stateOfOrigin}</td>
                  <td className="px-4 py-2 border-b">{user.nationality}</td>
                  <td className="px-4 py-2 border-b">{user.phoneNo}</td>
                  <td className="px-4 py-2 border-b">{user.whatsappNo}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.address}</td>
                  <td className="px-4 py-2 border-b">{user.hobbies.join(', ')}</td>
                  <td className="px-4 py-2 border-b">{user.level}</td>
                  <td className="px-4 py-2 border-b">{user.hostel}</td>
                  <td className="px-4 py-2 border-b">{user.matricNo}</td>
                  <td className="px-4 py-2 border-b">{user.college}</td>
                  <td className="px-4 py-2 border-b">{user.department}</td>
                  <td className="px-4 py-2 border-b">{user.passportUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;