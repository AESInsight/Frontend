import "./App.css";
import DefaultComponent from "./components/pages/fallbackpage";
import "./index.css";

function App() {
	return (
		<div className="bg-sky-700 shadow-lg border text-center">
			<span>
				<h1 className="text-3xl text-white mb-4 font-bold">
					Welcome to AESInsight
				</h1>
			</span>
			<div className="bg-white">
				<div>
					<DefaultComponent />
				</div>
			</div>
		</div>
	);
}

export default App;
