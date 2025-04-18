import Header from "../ui/header";
import Sidebar from "../ui/sidebar";

const ServicePage = () => {
	return (
		<div className="h-screen w-screen flex flex-col relative justify-center items-center">
			<div className="relative z-10 flex flex-col h-full w-full">
				<Header />
				<div className="flex flex-1 w-full overflow-y-auto">
					<Sidebar />
					{/* Centering Content */}
					<div className="flex flex-1 justify-center items-center">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
							<div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
								<h2 className="text-xl font-bold mb-2">Service 1</h2>
								<p className="text-gray-700">Description of service 1.</p>
							</div>
							<div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
								<h2 className="text-xl font-bold mb-2">Service 2</h2>
								<p className="text-gray-700">Description of service 2.</p>
							</div>
							<div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
								<h2 className="text-xl font-bold mb-2">Service 3</h2>
								<p className="text-gray-700">Description of service 3.</p>
							</div>
							<div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
								<h2 className="text-xl font-bold mb-2">Service 4</h2>
								<p className="text-gray-700">Description of service 4.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicePage;
