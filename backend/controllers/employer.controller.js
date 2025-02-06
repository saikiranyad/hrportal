// // import { User } from "../models/user.model.js"
// // import { Payment } from "../models/payment.model.js"

// // export const submitPayment = async (req, res) => {
// //   try {
// //     const { packageId, paymentMethod, amount, transactionId, tokensCount } = req.body
// //     const userId = req.id

// //     // Create a new payment record
// //     const payment = new Payment({
// //       employer: userId,
// //       packageId,
// //       paymentMethod,
// //       amount,
// //       transactionId,
// //       tokensCount,
// //       status: "pending",
// //     })

// //     await payment.save()

// //     // Update the user's pending tokens
// //     await User.findByIdAndUpdate(userId, {
// //       $inc: { "subscription.pendingTokens": tokensCount },
// //     });
// //     //updating the tokens irrespective of approval
// //     await User.findByIdAndUpdate(userId, {
// //       $inc: { "subscription.tokensAvailable": tokensCount },
// //     });

// //     res.status(200).json({ success: true, message: "Payment submitted successfully" })
// //   } catch (error) {
// //     console.error("Error submitting payment:", error)
// //     res.status(500).json({ success: false, message: "Error submitting payment" })
// //   }
// // }

// // export const getSubscription = async (req, res) => {
// //   try {
// //     const userId = req.id
// //     const user = await User.findById(userId)

// //     if (!user) {
// //       return res.status(404).json({ success: false, message: "User not found" })
// //     }

// //     const subscription = {
// //       tokensAvailable: user.tokensAvailable || 0,
// //       tokensConsumed: user.tokensConsumed || 0,
// //       pendingTokens: user.pendingTokens || 0,
// //     }

// //     res.status(200).json({ success: true, subscription })
// //   } catch (error) {
// //     console.error("Error fetching subscription:", error)
// //     res.status(500).json({ success: false, message: "Error fetching subscription" })
// //   }
// // }







// import { User } from "../models/user.model.js";
// import { Payment } from "../models/payment.model.js";
// // const mongoose = require('mongoose');
// import mongoose from "mongoose" 


// export const submitPayment = async (req, res) => {
//   try {
//     const { packageId, paymentMethod, amount, transactionId, tokensCount } = req.body;
//     const userId = req.id;

//     // Create a new payment record
//     const payment = new Payment({
//       employer: userId,
//       packageId,
//       paymentMethod,
//       amount,
//       transactionId,
//       tokensCount,
//       status: "pending",
//     });

//     await payment.save();

//     // Update the user's pending tokens
//     await User.findByIdAndUpdate(userId, {
//       $inc: { "subscription.pendingTokens": tokensCount },
//     });

//     res.status(200).json({ success: true, message: "Payment submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting payment:", error);
//     res.status(500).json({ success: false, message: "Error submitting payment" });
//   }
// };

// export const approvePayment = async (req, res) => {
//   try {
//     const { transactionId } = req.body;

//     // Find the payment record
//     const payment = await Payment.findOne({ transactionId });

//     if (!payment) {
//       return res.status(404).json({ success: false, message: "Payment not found" });
//     }

//     if (payment.status === "approved") {
//       return res.status(400).json({ success: false, message: "Payment already approved" });
//     }

//     // Approve the payment
//     payment.status = "approved";
//     await payment.save();

//     // Update user's tokens
//     await User.findByIdAndUpdate(payment.employer, {
//       $inc: { 
//         "subscription.pendingTokens": -payment.tokensCount, // Remove from pending
//         "subscription.tokensAvailable": payment.tokensCount, // Add to available
//       },
//     });

//     res.status(200).json({ success: true, message: "Payment approved successfully" });
//   } catch (error) {
//     console.error("Error approving payment:", error);
//     res.status(500).json({ success: false, message: "Error approving payment" });
//   }
// };

// export const getSubscription = async (req, res) => {
//   try {
//     const userId = req.id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const subscription = {
//       tokensAvailable: user.subscription?.tokensAvailable || 0,
//       tokensConsumed: user.subscription?.tokensConsumed || 0,
//       pendingTokens: user.subscription?.pendingTokens || 0,
//     };

//     res.status(200).json({ success: true, subscription });
//   } catch (error) {
//     console.error("Error fetching subscription:", error);
//     res.status(500).json({ success: false, message: "Error fetching subscription" });
//   }
// };


// // get all payments of an employer
//   // export const getAllPayments = async (req, res) => {

// export const getPayments = async (req, res) => {
//   try {
//     const userId = req.id;
//     const payments = await Payment.find({ employer: userId });
//     console.log(payments);

//     res.status(200).json({ success: true, payments });
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     res.status(500).json({ success: false, message: "Error fetching payments" });
//   }
// }


// export const getAllpayements = async(req,res)=>{
//   try {
  
//     const payments = await Payment.find({  });
//     console.log(payments)

//     res.status(200).json({ success: true, payments });
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     res.status(500).json({ success: false, message: "Error fetching payments" });
//   }
// }

// //get aall payments

// export const getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find({}).populate('employer', 'fullname email');
//     console.log(payments);

//     const paymentsWithUserDetails = payments.map(payment => ({
//       _id: payment._id,
    
//         fullname: payment.employer.fullname,
//         email: payment.employer.email,
      
//       packageId: payment.packageId,
//       paymentMethod: payment.paymentMethod,
//       amount: payment.amount,
//       transactionId: payment.transactionId,
//       tokensCount: payment.tokensCount,
//       status: payment.status,
//       createdAt: payment.createdAt,
//       updatedAt: payment.updatedAt,
//     }));

//     res.status(200).json({ success: true, payments: paymentsWithUserDetails });
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     res.status(500).json({ success: false, message: "Error fetching payments" });
//   }
// };


// export const getAllsubscriptions = async (req, res) => {
//   try {
//     const users = await User.find({ role: 'Employeer' });
//     const subscriptions = await Promise.all(users.map(async user => {
//       const payment = await Payment.findOne({ employer: user._id }).sort({ createdAt: -1 });
//       return {
//         userId: user._id,
//         fullName: user.fullname,
//         email: user.email,
//         role: user.workhistory.technologyworked || "",
//         tokensAvailable: user.subscription?.tokensAvailable || 0,
//         tokensConsumed: user.subscription?.tokensConsumed || 0,
//         pendingTokens: user.subscription?.pendingTokens || 0,
//         transactionId: payment ? payment.transactionId : "N/A",
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       };
//     }));
//     console.log(subscriptions);

//     res.status(200).json({ success: true, subscriptions });
//   } catch (error) {
//     console.error("Error fetching subscriptions:", error);
//     res.status(500).json({ success: false, message: "Error fetching subscriptions" });
//   }
// };


// export const approveAndDeclineTokens = async (req, res) => {
//   try {
//     const { transactionId, status } = req.body;

//     // Check if transactionId is a valid ObjectId or an email
//     let user;
//     if (mongoose.Types.ObjectId.isValid(transactionId)) {
//       // If it's a valid ObjectId, find by ObjectId
//       user = await User.findById(transactionId);
//     } else {
//       // If it's not a valid ObjectId, assume it's an email
//       user = await User.findOne({ email: transactionId });
//     }

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const payment = await Payment.findOne({ employer: user._id, transactionId });
//     if (!payment) {
//       return res.status(404).json({ success: false, message: "Payment not found" });
//     }

//     if (payment.status !== "pending") {
//       return res.status(400).json({ success: false, message: "Payment already processed" });
//     }

//     // Process payment based on status
//     if (status === "approved") {
//       payment.status = "approved";
//       await payment.save();

//       await User.findByIdAndUpdate(user._id, {
//         $inc: {
//           "subscription.pendingTokens": -payment.tokensCount,
//           "subscription.tokensAvailable": payment.tokensCount,
//         },
//       });
//     } else if (status === "declined") {
//       payment.status = "declined";
//       await payment.save();

//       await User.findByIdAndUpdate(user._id, {
//         $inc: { "subscription.pendingTokens": -payment.tokensCount },
//       });
//     } else {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     res.status(200).json({ success: true, message: "Payment processed successfully" });
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     res.status(500).json({ success: false, message: "Error processing payment" });
//   }
// };



import { User } from "../models/user.model.js";
import { Payment } from "../models/payment.model.js";

export const submitPayment = async (req, res) => {
  try {
    const { packageId, paymentMethod, amount, transactionId, tokensCount,status } = req.body;
    const userId = req.id;

    // Create a new payment record
    const payment = new Payment({
      employer: userId,
      packageId,
      paymentMethod,
      amount,
      transactionId,
      tokensCount,
      status,
    });

    await payment.save();

    // Update the user's pending tokens
    await User.findByIdAndUpdate(userId, {
      $inc: { "subscription.pendingTokens": tokensCount },
    });
    if(status === 'approve'){
     await User.findByIdAndUpdate(userId, {
      $inc: { "subscription.tokensAvailable": tokensCount },
    }); 
    }
    

    res.status(200).json({ success: true, message: "Payment submitted successfully" });
  } catch (error) {
    console.error("Error submitting payment:", error);
    res.status(500).json({ success: false, message: "Error submitting payment" });
  }
};

export const approvePayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    // Find the payment record
    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    if (payment.status === "approved") {
      return res.status(400).json({ success: false, message: "Payment already approved" });
    }

    // Approve the payment
    payment.status = "approved";
    await payment.save();

    // Update user's tokens
    await User.findByIdAndUpdate(payment.employer, {
      $inc: {
        "subscription.pendingTokens": -payment.tokensCount, // Remove from pending
        "subscription.tokensAvailable": payment.tokensCount, // Add to available
      },
    });

    res.status(200).json({ success: true, message: "Payment approved successfully" });
  } catch (error) {
    console.error("Error approving payment:", error);
    res.status(500).json({ success: false, message: "Error approving payment" });
  }
};

export const getSubscription = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    console.log(user)
  


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const subscription = {
      tokensAvailable: user.tokensAvailable || 0,
      tokensConsumed: user.tokensConsumed || 0,
      pendingTokens: user.pendingTokens || 0,
    };

    console.log(subscription)

    res.status(200).json({ success: true, subscription });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({ success: false, message: "Error fetching subscription" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const userId = req.id;
    const payments = await Payment.find({ employer: userId });
    console.log(payments)

    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ success: false, message: "Error fetching payments" });
  }
}


export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate('employer', 'fullname email');
    console.log(payments);

    const paymentsWithUserDetails = payments.map(payment => ({
      _id: payment._id,

      fullname: payment.employer.fullname,
      email: payment.employer.email,

      packageId: payment.packageId,
      paymentMethod: payment.paymentMethod,
      amount: payment.amount,
      transactionId: payment.transactionId,
      tokensCount: payment.tokensCount,
      status: payment.status,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }));

    res.status(200).json({ success: true, payments: paymentsWithUserDetails });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ success: false, message: "Error fetching payments" });
  }
};


export const getAllsubscriptions = async (req, res) => {
  try {
    const users = await User.find({ role: 'Employeer' });
    const subscriptions = await Promise.all(users.map(async user => {
      const payment = await Payment.findOne({ employer: user._id }).sort({ createdAt: -1 });
      return {
        userId: user._id,
        fullName: user.fullname,
        email: user.email,
        role: user.workhistory.technologyworked || "",
        tokensAvailable: user.subscription?.tokensAvailable || 0,
        tokensConsumed: user.subscription?.tokensConsumed || 0,
        pendingTokens: user.subscription?.pendingTokens || 0,
        transactionId: payment ? payment.transactionId : "N/A",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }));
    console.log(subscriptions);

    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ success: false, message: "Error fetching subscriptions" });
  }
};





export const handlePayment = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    // Find payment by transactionId instead of findById
    const payment = await Payment.findOne({ transactionId }).populate('employer', 'fullname email subscription');

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    const employer = payment.employer;
    if (!employer) {
      return res.status(404).json({ success: false, message: 'Employer not found' });
    }

    if (status === 'approve') {
      payment.status = 'approved';
      employer.subscription.tokensAvailable += payment.tokensCount;
      employer.subscription.pendingTokens -= payment.tokensCount;
    } else if (status === 'reject') {
      payment.status = 'rejected';
      employer.subscription.pendingTokens -= payment.tokensCount;
    } else {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    await Promise.all([payment.save(), employer.save()]);

    return res.status(200).json({ 
      success: true, 
      message: `Payment ${status}d successfully`
    });

  } catch (error) {
    console.error(`Errorhandling payment:`, error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

