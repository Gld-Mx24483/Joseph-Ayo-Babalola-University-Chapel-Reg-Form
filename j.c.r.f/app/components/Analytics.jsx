// Analytics.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BuildingIcon, GraduationCapIcon, UserCheckIcon, UsersIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const Analytics = ({ users }) => {
  const [selectedCollege, setSelectedCollege] = useState(null);

  // Memoized calculations for analytics
  const stats = useMemo(() => {
    const collegeData = {};
    const departmentData = {};
    let maleCount = 0;
    let femaleCount = 0;
    let newBirthCount = 0;
    let noNewBirthCount = 0;
    let totalStudents = users.length;

    users.forEach(user => {
      // College stats
      collegeData[user.college] = (collegeData[user.college] || 0) + 1;

      // Department stats
      if (!departmentData[user.college]) departmentData[user.college] = {};
      departmentData[user.college][user.department] =
        (departmentData[user.college][user.department] || 0) + 1;

      // Gender stats
      if (user.sex.toLowerCase() === 'male') maleCount++;
      if (user.sex.toLowerCase() === 'female') femaleCount++;

      // New Birth stats
      if (user.newBirth === 'Yes') newBirthCount++;
      if (user.newBirth === 'No') noNewBirthCount++;
    });

    return {
      totalStudents,
      collegeData: Object.entries(collegeData).map(([name, value]) => ({ name, value })),
      departmentData, // Nested data for departments by college
      genderData: [
        { name: 'Male', value: maleCount },
        { name: 'Female', value: femaleCount }
      ],
      newBirthData: [
        { name: 'Yes', value: newBirthCount },
        { name: 'No', value: noNewBirthCount }
      ]
    };
  }, [users]);

  // Filtered department data based on selected college
  const filteredDepartmentData = useMemo(() => {
    if (!selectedCollege) return [];

    const departments = stats.departmentData[selectedCollege];
    return Object.entries(departments || {}).map(([name, value]) => ({ name, value }));
  }, [selectedCollege, stats.departmentData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const StatCard = ({ icon: Icon, title, value, desc }) => (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-lg md:text-2xl font-bold">{value}</h3>
            {desc && <p className="text-xs md:text-sm text-gray-500">{desc}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          icon={UsersIcon}
          title="Total Students"
          value={stats.totalStudents}
        />
        <StatCard
          icon={BuildingIcon}
          title="Colleges"
          value={stats.collegeData.length}
        />
        <StatCard
          icon={GraduationCapIcon}
          title="Departments"
          value={filteredDepartmentData.length}
        />
        <StatCard
          icon={UserCheckIcon}
          title="New Birth"
          value={stats.newBirthData[0].value}
          desc={`${((stats.newBirthData[0].value / stats.totalStudents) * 100).toFixed(1)}%`}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* College Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Students by College</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.collegeData}
                onClick={(data) => setSelectedCollege(data.activeLabel)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0088FE" name="Students">
                  {stats.collegeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Students by Department {selectedCollege && `in ${selectedCollege}`}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredDepartmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#00C49F" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* New Birth Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>New Birth Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.newBirthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.newBirthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
