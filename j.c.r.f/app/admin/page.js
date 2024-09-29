// // app/admin/page.js
// import Footer from '../components/Footer';
// import Login from '../components/Login';
// import Nav from '../components/Nav';

// export default function AdminLoginPage() {
//   return (
//     <main className="min-h-screen flex flex-col">
//       <Nav />
//       <div className="flex-grow flex items-center justify-center">
//         <Login />
//       </div>
//       <Footer />
//     </main>
//   );
// }


// app/admin/page.js
'use client';
import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Nav from '../components/Nav';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow flex items-center justify-center">
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
      <Footer />
    </main>
  );
}