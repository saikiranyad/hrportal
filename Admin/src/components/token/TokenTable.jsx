// import { motion } from "framer-motion";
// import { Edit, Search, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";

// const TOKEN_DATA = [
	
// ];

// const TokenTable = ({subscriptions=[]}) => {
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [filteredProducts, setFilteredProducts] = useState(subscriptions);


// 	const approveAndDeclineTokens = async (id, status) => {

// 		try {
// 			const response = await axios.post('http://localhost:3000/api/v1/user/approveAndDeclineTokens', {
// 				id,
// 				status
// 			}, {
// 				headers: {
// 					"Content-Type": "application/json"
// 				},
// 				withCredentials: true,
// 			});
// 			if (response.data.success) {
// 				console.log(response.data)
// 			}
// 		} catch (err) {
// 			console.log(err)
// 		}

// 	}


// 	const handleSearch = (e) => {
// 		const term = e.target.value.toLowerCase();
// 		setSearchTerm(term);
// 		const filtered = TOKEN_DATA.filter(
// 			(product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
// 		);

// 		setFilteredProducts(filtered);
// 	};

// 	useEffect(() => {
// 		setFilteredProducts(subscriptions || []);
// 	}, [subscriptions]);


// 	return (
// 		<motion.div
// 			className=' shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.2 }}
// 		>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h2 className='text-xl font-semibold text-black'>Token</h2>
// 				<div className='relative'>
// 					<input
// 						type='text'
// 						placeholder='Search products...'
// 						className=' text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						onChange={handleSearch}
// 						value={searchTerm}
// 					/>
// 					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
// 				</div>
// 			</div>

// 			<div className='overflow-x-auto'>
// 				<table className='min-w-full divide-y divide-gray-700'>
// 					<thead>
// 						<tr>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Name

// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Email
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Token Ordered
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Price
// 							</th>
							
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Order date
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Update date
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
// 								Actions
// 							</th>
// 						</tr>
// 					</thead>

// 					<tbody className='divide-y divide-gray-700'>
// 						{filteredProducts.map((product) => (
// 							<motion.tr
// 								key={product.id}
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								transition={{ duration: 0.3 }}
// 							>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-black flex gap-2 items-center'>
// 									<img
// 										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
// 										alt='Product img'
// 										className='size-10 rounded-full'
// 									/>
// 									{product.fullName}
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
// 									{product.email}
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
// 									{product.pendingTokens}
// 								</td>
								

// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
// 									${product.pendingTokens*50}
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{product.createdAt}</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>{product.updateAt}</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
// 									<button className='text-indigo-400 hover:text-indigo-700 mr-2'>
// 									Approve
// 									</button>
// 									<button className='text-red-400 hover:text-red-700'>
// 										Decline
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
// export default TokenTable;


import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

const TokenTable = ({ subscriptions = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(subscriptions);

  const approveAndDeclineTokens = async (transactionId, status) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/approveAndDeclineTokens",
        {
          userId: transactionId, // Ensure this is correct based on backend expectations
          transactionId,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(response.data.message); // Success feedback
      } else {
        // Log more details in case of failure
        console.error("Error response: ", response.data);
      }
    } catch (err) {
      // Improved error handling for debugging
      console.error("Error in approving/declining tokens: ", err.message);
      if (err.response) {
        console.error("Backend error data: ", err.response.data); // Detailed backend error
        alert(`Error: ${err.response.data.message || 'Unknown error occurred'}`);
      } else {
        alert("An error occurred while communicating with the server.");
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = subscriptions.filter(
      (product) =>
        product.fullName.toLowerCase().includes(term) ||
        product.email.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setFilteredProducts(subscriptions || []);
  }, [subscriptions]);

  return (
    <motion.div
      className="shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Token</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Token Ordered</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Update Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.transactionId} // Ensure transactionId is correct
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black flex gap-2 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                    alt="Product img"
                    className="size-10 rounded-full"
                  />
                  {product.fullName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{product.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{product.pendingTokens}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">${product.pendingTokens * 50}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{product.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{product.updateAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  <button
                    onClick={() => approveAndDeclineTokens(product.transactionId, "approved")}
                    className="text-indigo-400 hover:text-indigo-700 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => approveAndDeclineTokens(product.transactionId, "declined")}
                    className="text-red-400 hover:text-red-700"
                  >
                    Decline
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TokenTable;
