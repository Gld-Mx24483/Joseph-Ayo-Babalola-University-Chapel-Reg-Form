// app/admin/page.js
import Footer from '../components/Footer';
import Login from '../components/Login';
import Nav from '../components/Nav';

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow flex items-center justify-center">
        <Login />
      </div>
      <Footer />
    </main>
  );
}