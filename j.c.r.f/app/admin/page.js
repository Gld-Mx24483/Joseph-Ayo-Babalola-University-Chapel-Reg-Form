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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow">
        {isLoggedIn ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}