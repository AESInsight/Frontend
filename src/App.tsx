import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/ui/sidebar";
import "./App.css";
import "./index.css";
import Homepage from "./components/pages/homepage";
import AboutPage from "./components/pages/aboutpage";
import ContactPage from "./components/pages/contactpage";
import InsightPage from "./components/pages/insightpage";
import AdminPage from "./components/pages/adminpage";
import ResetPasswordPage from "./components/pages/resetpasswordpage";
import ResetSuccessPage from "./components/pages/resetsuccess";
import BgImage from "./components/bg_image";
import { AuthProvider } from "./lib/context/auth_context";
import { useIsDesktop } from "./lib/context/desktop_context";

const App: React.FC = () => {
	const isDesktop = useIsDesktop();
	return (
		<Router>
			<AuthProvider>
				{isDesktop && <Sidebar />}
				<BgImage />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/insight" element={<InsightPage />} />
					<Route path="/reset-password" element={<ResetPasswordPage />} />
					<Route path="/dist/reset-password" element={<ResetPasswordPage />} />
					<Route path="/reset-success" element={<ResetSuccessPage />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default App;
