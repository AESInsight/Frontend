import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/ui/sidebar";
import "./App.css";
import "./index.css";
import Homepage from "./components/pages/homepage";
import AboutPage from "./components/pages/aboutpage";
import ContactPage from "./components/pages/contactpage";
import ServicePage from "./components/pages/servicepage";
import InsightPage from "./components/pages/insightpage";
import AdminPage from "./components/pages/adminpage";
import BgImage from "./components/bg_image";
import { AuthProvider } from "./lib/context/auth_context";

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
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/insight" element={<InsightPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
