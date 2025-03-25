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

const App: React.FC = () => {
	return (
		<Router>
			<Sidebar />
			<BgImage />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/services" element={<ServicePage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/admin" element={<AdminPage />} />
			</Routes>
		</Router>
	);
};

export default App;
