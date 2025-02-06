// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Search, Eye } from "lucide-react";

// const orderData = [
// 	{ id: "ORD001", customer: "John Doe", total: 235.4, status: "Delivered", date: "2023-07-01" },
// 	{ id: "ORD002", customer: "Jane Smith", total: 412.0, status: "Processing", date: "2023-07-02" },
// 	{ id: "ORD003", customer: "Bob Johnson", total: 162.5, status: "Shipped", date: "2023-07-03" },
// 	{ id: "ORD004", customer: "Alice Brown", total: 750.2, status: "Pending", date: "2023-07-04" },
// 	{ id: "ORD005", customer: "Charlie Wilson", total: 95.8, status: "Delivered", date: "2023-07-05" },
// 	{ id: "ORD006", customer: "Eva Martinez", total: 310.75, status: "Processing", date: "2023-07-06" },
// 	{ id: "ORD007", customer: "David Lee", total: 528.9, status: "Shipped", date: "2023-07-07" },
// 	{ id: "ORD008", customer: "Grace Taylor", total: 189.6, status: "Delivered", date: "2023-07-08" },
// ];

// const OrdersTable = () => {
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [filteredOrders, setFilteredOrders] = useState(orderData);

// 	const handleSearch = (e) => {
// 		const term = e.target.value.toLowerCase();
// 		setSearchTerm(term);
// 		const filtered = orderData.filter(
// 			(order) => order.id.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
// 		);
// 		setFilteredOrders(filtered);
// 	};

// 	return (
// 		<motion.div
// 			className=' shadow-lg rounded-xl p-6 border border-gray-700'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.4 }}
// 		>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h2 className='text-xl font-semibold text-black'>token orderList</h2>
// 				<div className='relative'>
// 					<input
// 						type='text'
// 						placeholder='Search orders...'
// 						className=' text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						value={searchTerm}
// 						onChange={handleSearch}
// 					/>
// 					<Search className='absolute left-3 top-2.5 text-black' size={18} />
// 				</div>
// 			</div>

// 			<div className='overflow-x-auto'>
// 				<table className='min-w-full divide-y divide-gray-700'>
// 					<thead>
// 						<tr>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Order ID
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Customer
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Total
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Status
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Date
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Actions
// 							</th>
// 						</tr>
// 					</thead>

// 					<tbody className='divide divide-gray-700'>
// 						{filteredOrders.map((order) => (
// 							<motion.tr
// 								key={order.id}
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								transition={{ duration: 0.3 }}
// 							>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-black'>
// 									{order.id}
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-black'>
// 									{order.customer}
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-black'>
// 									${order.total.toFixed(2)}
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
// 									<span
// 										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// 											order.status === "Delivered"
// 												? "bg-green-100 text-green-800"
// 												: order.status === "Processing"
// 												? "bg-yellow-100 text-yellow-800"
// 												: order.status === "Shipped"
// 												? "bg-blue-100 text-blue-800"
// 												: "bg-red-100 text-red-800"
// 										}`}
// 									>
// 										{order.status}
// 									</span>
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{order.date}</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
// 									<button className='text-black hover:text-indigo-300 mr-2'>
// 										<Eye size={18} />
// 									</button>
// 								</td>
// 							</motion.tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</motion.div>
// 	);
// };
// export default OrdersTable;



// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";

// const OrdersTable = ({ payments }) => {
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [filteredOrders, setFilteredOrders] = useState([]);

// 	// Ensure payments is an array before setting state
// 	useEffect(() => {
// 		if (Array.isArray(payments)) {
// 			setFilteredOrders(payments);
// 		}
// 	}, [payments]);

// 	const handleSearch = (e) => {
// 		const term = e.target.value.toLowerCase();
// 		setSearchTerm(term);

// 		if (!Array.isArray(payments)) return;

// 		const filtered = payments.filter(
// 			(order) =>
// 				order._id.toLowerCase().includes(term) ||
// 				(order.employer && order.employer.toLowerCase().includes(term))
// 		);
// 		setFilteredOrders(filtered);
// 	};

// 	console.log(filteredOrders);

// 	return (
// 		<motion.div
// 			className="shadow-lg rounded-xl p-6 border border-gray-700"
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.4 }}
// 		>
// 			<div className="flex justify-between items-center mb-6">
// 				<h2 className="text-xl font-semibold text-black">Token Order List</h2>
// 				<div className="relative">
// 					<input
// 						type="text"
// 						placeholder="Search orders..."
// 						className="text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// 						value={searchTerm}
// 						onChange={handleSearch}
// 					/>
// 					<Search className="absolute left-3 top-2.5 text-black" size={18} />
// 				</div>
// 			</div>

// 			<div className="overflow-x-auto">
// 				<table className="min-w-full divide-y divide-gray-700">
// 					<thead>
// 						<tr>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								Order ID
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								Employer Name
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								Employer email
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								No of tokens
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								status
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								Total Amount
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								Payment Method
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
// 								Date
// 							</th>
// 						</tr>
// 					</thead>

// 					<tbody className="divide-y divide-gray-700">
// 						{filteredOrders.length > 0 ? (
// 							filteredOrders.map((order) => (
// 								<motion.tr
// 									key={order._id}
// 									initial={{ opacity: 0 }}
// 									animate={{ opacity: 1 }}
// 									transition={{ duration: 0.3 }}
// 								>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
// 										{order._id}
// 									</td>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
// 										{order.fullname}
// 									</td>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
// 										{order.email}
// 									</td>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
// 										{order.tokensCount || "N/A"}
// 									</td>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
// 										{order.status || "N/A"}
// 									</td>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
// 									₹{order.amount ? order.amount.toFixed(2) : "0.00"}
// 									</td>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm text-black">
// 										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
// 											{order.paymentMethod}
// 										</span>
// 									</td>
// 									<td className="px-6 py-4 whitespace-nowrap text-sm text-black">
// 										{order.createdAt
// 											? new Date(order.createdAt).toLocaleDateString()
// 											: "N/A"}
// 									</td>
// 								</motion.tr>
// 							))
// 						) : (
// 							<tr>
// 								<td colSpan="6" className="text-center py-4 text-gray-500">
// 									No orders found
// 								</td>
// 							</tr>
// 						)}
// 					</tbody>
// 				</table>
// 			</div>
// 		</motion.div>
// 	);
// };

// export default OrdersTable;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";

const OrdersTable = ({ payments }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState([]);

	// Ensure payments is an array before setting state


	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);

		if (!Array.isArray(payments)) return;

		const filtered = payments.filter(
			(order) =>
				order._id.toLowerCase().includes(term) ||
				(order.employer && order.employer.toLowerCase().includes(term))
		);
		setFilteredOrders(filtered);
	};

	console.log(filteredOrders);

	const handlepayment = async (transactionId, status) => {
		try {
			const response = await axios.post(
				'https://hrportal-backend-y36m.onrender.com/api/v1/user/handlepayment',
				{ transactionId, status }, // Ensure status is "approve" or "reject"
				{
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true,
				}
			);

			if (response.data.success) {
				alert( `Payment ${status}ed successfully`);
			}
		} catch (err) {
			console.log(err);
		}
	};


	useEffect(() => {
		if (Array.isArray(payments)) {
			setFilteredOrders(payments);
		}
	}, [payments]);

	return (
		<motion.div
			className="shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-black">Token Order List</h2>
				<div className="relative">
					<input
						type="text"
						placeholder="Search orders..."
						className="text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className="absolute left-3 top-2.5 text-black" size={18} />
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								Order ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								Employer Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								Employer email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								No of tokens
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								Total Amount
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								Payment Method
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								Date
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-700">
						{filteredOrders.length > 0 ? (
							filteredOrders.map((order) => (
								<motion.tr
									key={order._id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
										{order.transactionId}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
										{order.fullname}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
										{order.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
										{order.tokensCount || "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
										{order.status || "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
										₹{order.amount ? order.amount.toFixed(2) : "0.00"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-black">
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
											{order.paymentMethod}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-black">
										{order.createdAt
											? new Date(order.createdAt).toLocaleDateString()
											: "N/A"}
									</td>




									<td className="px-6 py-4 whitespace-nowrap text-sm text-black">
										{order.status === "pending" ? (
											<>
												<button
													className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
													onClick={() => handlepayment(order.transactionId, "approve")}
												>
													Approve
												</button>
												<button
													className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
													onClick={() => handlepayment(order.transactionId, "reject")}
												>
													Decline
												</button>
											</>
										) : (
											<span className="text-sm text-gray-500">Completed</span>
										)}
									</td>
									{/* <button
										className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
										onClick={() => handlepayment(order.transactionId, "approve")}
									>
										Approve
									</button>
									<button
										className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
										onClick={() => handlepayment(order.transactionId, "reject")}
									>
										Decline
									</button> */}
								</motion.tr>
							))
						) : (
							<tr>
								<td colSpan="6" className="text-center py-4 text-gray-500">
									No orders found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default OrdersTable;
