
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

type UserRole = 'student' | 'faculty' | 'admin';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');
  
  // Extract role from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role') as UserRole | null;
    
    if (roleParam && ['student', 'faculty', 'admin'].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [location.search]);
  
  const handleLogin = (data: any) => {
    // In a real app, you would make an API call to authenticate the user
    console.log('Login data:', data);
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      // Redirect based on role
      navigate(`/dashboard/${role}`);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <AuthForm 
          type="login" 
          role={role} 
          onSubmit={handleLogin} 
        />
      </div>
    </div>
  );
};

export default Login;
