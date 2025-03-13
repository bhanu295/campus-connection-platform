
import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const LogoutButton = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center text-sm font-medium text-primary hover:text-primary/80"
    >
      <LogOut className="h-4 w-4 mr-1" />
      Logout ({user?.name})
    </button>
  );
};

export default LogoutButton;
