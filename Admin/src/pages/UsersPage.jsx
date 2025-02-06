// import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
// import { motion } from "framer-motion";

// import Header from "../components/common/Header";
// import StatCard from "../components/common/StatCard";
// import UsersTable from "../components/users/UsersTable";
// import { useEffect, useState } from "react";
// import axios from "axios";


// const userStats = {
// 	totalUsers: 45,
// 	newUsersToday: 143,


// };


// //table data--------------------------------------------
// const UsersPage = () => {
	


// 	const [employData, setEmployeedata] = useState([]);
// 	const handledata = async () => {
// 		try {
// 			const response = await axios.get('https://hrportal-backend-y36m.onrender.com/api/v1/user/getAllUsers', {
// 				headers: {
// 					"Content-Type": "application/json"
// 				},
// 				withCredentials: true,
// 			});
// 			if (response.data.success) {
// 				setEmployeedata(response.data)
// 			}
// 			// console.log(response.data);


// 		} catch (err) {
// 			console.log(err)
// 		}

// 	}
// 	console.log(employData);
// 	useEffect(() => {
// 		handledata();
// 	}
// 		, []);


// 	console.log("Employeers Data", employData);
// 	console.log(employData);

// 	// table data ends--------------------------------------------
// 	return (
// 		<div className='flex-1 overflow-auto relative z-10'>
// 			<Header title='Employeers' />

// 			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
// 				{/* STATS */}
// 				<motion.div
// 					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
// 					initial={{ opacity: 0, y: 20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 1 }}
// 				>
// 					<StatCard
// 						name='Total Employeers'
// 						icon={UsersIcon}
// 						value={userStats.totalUsers.toLocaleString()}
// 						color='#6366F1'
// 					/>
// 					<StatCard name='New Employeers' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' />

// 				</motion.div>

// 				<UsersTable />


// 			</main>
// 		</div>
// 	);
// };
// export default UsersPage;


import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import { useEffect, useState } from "react";
import axios from "axios";



const userStats = {
	totalUsers: 45,
	newUsersToday: 143,


};

const UsersPage = () => {
	const [employeedata, setEmployeedata] = useState([]);

	const handledata = async () => {
		try {
			const response = await axios.get('https://hrportal-backend-y36m.onrender.com/api/v1/user/getallsubscriptions', {
				headers: {
					"Content-Type": "application/json"
				},
				withCredentials: true,
			});
			if (response.data.success) {
				setEmployeedata(response.data)
			}
			// console.log(response.data);




		} catch (err) {
			console.log(err)
		}

	}
	const subscriptions = employeedata.subscriptions
	console.log(subscriptions)
	useEffect(() => {
		handledata();
	}, [])
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Employeers' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					{/* <StatCard
						name='Total Employeers'
						icon={UsersIcon}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/> */}
					{/* <StatCard name='New Employeers' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' /> */}

				</motion.div>

				<UsersTable subscriptions={subscriptions} />


			</main>
		</div>
	);
};
export default UsersPage;
