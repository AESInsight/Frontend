import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/ui/sidebar";
import "./App.css";
import "./index.css";
import Homepage from "./components/pages/homepage";
import AboutPage from "./components/pages/aboutpage";
import ContactPage from "./components/pages/contactpage";
import ServicePage from "./components/pages/servicepage";
import AdminPage from "./components/pages/adminpage";
import BgImage from "./components/bg_image";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPasswordPage from './components/pages/reset_password_page';
import RoleRoute from './components/RoleRoute';
import CompanyDashboard from './components/pages/company_dashboard';
import UserDashboard from './components/pages/user_dashboard';
import UnauthorizedPage from './components/pages/unauthorized_page';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<Sidebar />
				<BgImage />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/services" element={<ServicePage />} />
					<Route path="/contact" element={<ContactPage />} />
					
					{/* Company routes */}
					<Route 
						path="/company-dashboard" 
						element={
							<RoleRoute allowedRoles={['Company']}>
								<CompanyDashboard />
							</RoleRoute>
						} 
					/>

					{/* User routes */}
					<Route 
						path="/user-dashboard" 
						element={
							<RoleRoute allowedRoles={['User']}>
								<UserDashboard />
							</RoleRoute>
						} 
					/>

					{/* Admin routes (accessible by both roles) */}
					<Route 
						path="/admin" 
						element={
							<RoleRoute allowedRoles={['Company', 'User']}>
								<AdminPage />
							</RoleRoute>
						} 
					/>

					<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
					<Route path="/unauthorized" element={<UnauthorizedPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
