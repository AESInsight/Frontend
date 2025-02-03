import "./App.css";
import { ButtonTest } from "./components/buttonTest";
import DefaultComponent from "./components/pages/fallbackpage";
import "./index.css";

function App() {
	return (
		<span className="text-black text-lg font-bold">
			<div>
				<h1 className="text-3xl font-bold">Welcome to AESInsight</h1>
				<div>
					<DefaultComponent />
				</div>
				<ButtonTest />
			</div>
		</span>
	);
}

export default App;
