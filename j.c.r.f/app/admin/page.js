// app/admin/page.js
import Footer from '../components/Footer';
import Login from '../components/Login';
import Nav from '../components/Nav';

export default function AdminLoginPage() {
  return ( <main className="min-h-screen">
    <Nav />
    <Login />;
    <Footer />
  </main>)
}