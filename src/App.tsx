
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import StudentLogin from "./pages/auth/StudentLogin";
import FacultyLogin from "./pages/auth/FacultyLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import Register from "./pages/auth/Register";

// Dashboard pages
import StudentDashboard from "./pages/dashboard/Student";
import FacultyDashboard from "./pages/dashboard/Faculty";
import AdminDashboard from "./pages/dashboard/Admin";

// Study Materials pages
import BrowseMaterials from "./pages/study-materials/Browse";
import UploadMaterial from "./pages/study-materials/Upload";

// Events pages
import EventsList from "./pages/events/List";
import CreateEvent from "./pages/events/Create";
import EventDetails from "./pages/events/Details";

// Forum pages
import ForumDiscussion from "./pages/forum/Discussion";
import ForumPost from "./pages/forum/Post";

// Notice Board pages
import Notices from "./pages/notice-board/Notices";
import CreateNotice from "./pages/notice-board/Create";

// Admin management pages
import AdminManageUsers from "./pages/admin/ManageUsers";
import AdminManageMaterials from "./pages/admin/ManageMaterials";
import AdminManageEvents from "./pages/admin/ManageEvents";
import AdminManageForum from "./pages/admin/ManageForum";
import AdminManageNotices from "./pages/admin/ManageNotices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<Index />} />
            
            {/* Authentication Routes */}
            <Route path="/auth/student-login" element={<StudentLogin />} />
            <Route path="/auth/faculty-login" element={<FacultyLogin />} />
            <Route path="/auth/admin-login" element={<AdminLogin />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Dashboard Routes - Protected */}
            <Route path="/dashboard/student" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/faculty" element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/admin" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Study Materials Routes */}
            <Route path="/materials/browse" element={<BrowseMaterials />} />
            <Route path="/materials/upload" element={
              <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                <UploadMaterial />
              </ProtectedRoute>
            } />
            
            {/* Events Routes */}
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/create" element={
              <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                <CreateEvent />
              </ProtectedRoute>
            } />
            <Route path="/events/:id" element={<EventDetails />} />
            
            {/* Forum Routes */}
            <Route path="/forum" element={<ForumDiscussion />} />
            <Route path="/forum/post/:id" element={<ForumPost />} />
            <Route path="/forum/create" element={
              <ProtectedRoute>
                <ForumPost />
              </ProtectedRoute>
            } />
            
            {/* Notice Board Routes */}
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/create" element={
              <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                <CreateNotice />
              </ProtectedRoute>
            } />
            
            {/* Admin Management Routes - Protected */}
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminManageUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/materials" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminManageMaterials />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminManageEvents />
              </ProtectedRoute>
            } />
            <Route path="/admin/forum" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminManageForum />
              </ProtectedRoute>
            } />
            <Route path="/admin/notices" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminManageNotices />
              </ProtectedRoute>
            } />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
