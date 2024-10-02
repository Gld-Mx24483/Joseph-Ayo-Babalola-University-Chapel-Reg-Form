// app/components/Login.jsx
'use client';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import backgroundImage from '../assets/jabu-auditorium.jpg';
import logoImage from '../assets/logo.png';
import { loginStyles } from './LoginStyles';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Chaplaincy' && password === 'chaplaincy123') {
      console.log('Login successful');
      onLoginSuccess();
    } else {
      setError('Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={loginStyles.container}>
      {/* Background Image */}
      <div className={loginStyles.backgroundImageContainer}>
        <Image
          src={backgroundImage}
          alt="JABU Background"
          placeholder="blur"
          quality={100}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
        <div className={loginStyles.overlay}></div>
      </div>

      {/* Login Form Content */}
      <div className={loginStyles.formContainer}>
        <div className={loginStyles.logo}>
          <Image
            src={logoImage}
            alt="Logo"
            width={120}
            height={60}
            objectFit="contain"
          />
        </div>

        <h2 className={loginStyles.title}>Admin Login</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className={loginStyles.inputContainer}>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                required
                className={loginStyles.input}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className={loginStyles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className={loginStyles.errorMessage}>{error}</p>}

          <div className={loginStyles.buttonContainer}>
            <button
              type="submit"
              className={loginStyles.button}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
