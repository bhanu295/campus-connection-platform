
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, BookOpen, Calendar, MessageSquare, Bell,
  Users, LogOut, FileText, Settings, ChevronRight, ChevronDown
} from 'lucide-react';

type UserRole = 'student' | 'faculty' | 'admin';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  submenu?: { name: string; path: string }[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  userName?: string;
}

const DashboardLayout = ({ children, userRole, userName = 'User' }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const location = useLocation();
  
  // Define menu items based on user role
  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      {
        name: 'Dashboard',
        icon: Home,
        path: `/dashboard/${userRole}`,
      },
      {
        name: 'Study Materials',
        icon: BookOpen,
        path: '/materials',
        submenu: [
          { name: 'Browse', path: '/materials/browse' },
          { name: 'My Materials', path: '/materials/my' },
        ],
      },
      {
        name: 'Events',
        icon: Calendar,
        path: '/events',
        submenu: [
          { name: 'Upcoming', path: '/events/upcoming' },
          { name: 'My Events', path: '/events/my' },
        ],
      },
      {
        name: 'Forum',
        icon: MessageSquare,
        path: '/forum',
      },
      {
        name: 'Notices',
        icon: Bell,
        path: '/notices',
      },
    ];
    
    if (userRole === 'faculty') {
      baseItems.push({
        name: 'My Uploads',
        icon: FileText,
        path: '/faculty/uploads',
      });
    }
    
    if (userRole === 'admin') {
      return [
        ...baseItems,
        {
          name: 'User Management',
          icon: Users,
          path: '/admin/users',
          submenu: [
            { name: 'All Users', path: '/admin/users/all' },
            { name: 'Faculty Approvals', path: '/admin/users/faculty' },
          ],
        },
        {
          name: 'Content Moderation',
          icon: FileText,
          path: '/admin/content',
          submenu: [
            { name: 'Study Materials', path: '/admin/content/materials' },
            { name: 'Forum Posts', path: '/admin/content/forum' },
            { name: 'Notices', path: '/admin/content/notices' },
          ],
        },
      ];
    }
    
    return baseItems;
  };
  
  const menuItems = getMenuItems();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleSubmenu = (name: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 lg:relative transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-20'
        } w-64 bg-white border-r border-border shadow-sm lg:translate-x-0`}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link to={`/dashboard/${userRole}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">CR</span>
            </div>
            {isSidebarOpen && <span className="font-bold text-lg">CampusHub</span>}
          </Link>
          <button 
            className="lg:hidden p-1 rounded-md text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Sidebar content */}
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          <nav className="mt-5 px-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActiveRoute(item.path)
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-muted'
                        }`}
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                          {isSidebarOpen && <span>{item.name}</span>}
                        </div>
                        {isSidebarOpen && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expandedMenus[item.name] ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </button>
                      
                      {isSidebarOpen && expandedMenus[item.name] && (
                        <ul className="mt-1 ml-6 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.name}>
                              <Link
                                to={subitem.path}
                                className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                                  location.pathname === subitem.path
                                    ? 'bg-primary/5 text-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                }`}
                              >
                                <ChevronRight className="mr-2 h-4 w-4" />
                                <span>{subitem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActiveRoute(item.path)
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {isSidebarOpen && <span>{item.name}</span>}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Sidebar footer */}
        <div className="absolute bottom-0 w-full border-t border-border p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="font-medium text-sm">{userName.charAt(0)}</span>
              </div>
            </div>
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            )}
            <div className="ml-auto">
              <button className="p-1 rounded-md text-muted-foreground hover:text-destructive">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 border-b border-border bg-white flex items-center justify-between px-4 lg:px-6">
          <button 
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          
          <button
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hidden lg:block"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground">
              <Bell size={20} />
            </button>
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground">
              <Settings size={20} />
            </button>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
