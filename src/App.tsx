import "./App.css";
import { ButtonTest } from "./components/buttonTest";
import DefaultComponent from "./components/pages/fallbackpage";
import "./index.css";

function App() {
	return (
		<div className="bg-sky-700 shadow-lg border-b text-center">
			<span>
				<h1 className="text-3xl text-white mb-4 font-bold">
					Welcome to AESInsight
				</h1>
			</span>
			<div className="bg-white">
				<div>
					<div>
						<div>
							<DefaultComponent />
						</div>
						½
						<ButtonTest />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
