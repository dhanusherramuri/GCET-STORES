// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const UserModel = require('./models/User');
// const Pimodel=require('./models/PIP');


// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/Users",)
//     .then(() => console.log("Database connected successfully"))
//     .catch(err => {
//         console.log("Database connection error:", err);
//         process.exit(1);
//     });

// /* ----------------------- ORIGINAL LOGIN--------------------------------*/
    
//     app.post('/login', async(req,res)=>{
//         const {username,password,role}=req.body;

//         try{
//             const user = await UserModel.findOne({ Un: username });
//             if(user){
//                 // console.log(username,password,role,user.Un,user.Pwd,user.Role);
//                 if(user.Pwd === password && user.Role=== role){
//                     console.log("SUCCESS")
//                     res.json("Success");
//                     // alert("SUCCESS");
//                 }
//                 else{
//                     console.log("Invalid Credentials")
//                     // alert("Invalid Credentials");
//                     res.json("Invalid Credentials");
//                 }
//             }
//             else{
//                 console.log("User not found")
//                 // alert("User not found");
//                 res.json("User not found");
//             }
//         }
//         catch(err){
//             console.log("Error:",err);
//             // alert("Error");
//             res.json("Error");
//         }
//     })

//     /* INDENT UPLOADING TO DATABASE*/
//     app.post('/pip', async (req, res) => {
//         const { psNo, date, department, items ,status} = req.body;
      
//         if (!items || !Array.isArray(items)) {
//           return res.status(400).json({ error: 'Invalid payload: items must be an array' });
//         }
      
//         // Prepare data for insertion
//         const dataToInsert = items.map((item) => ({
//           psNo,
//           date,
//           department,
//           serialNo : item.serialNo,
//           itemDescription: item.itemDescription,
//           quantity: item.quantity,
//           unitPrice: item.unitPrice,
//           totalPrice: item.totalPrice,
//           remarks :item.remarks,
//           status,
//         }));
      
//         try {
//           // Insert data into the database
//           const savedItems = await Pimodel.insertMany(dataToInsert);
//           // const savedItems= await Pimodel.insertOne(dataToInsert);
//           res.status(201).json({ message: 'Data inserted successfully', data: savedItems });
//         } catch (e) {
//           console.error(e);
//           res.status(500).json({ error: 'Failed to insert data' });
//         }
//       });
      
      
      
      

//     //TEST DATA//
// // UserModel.findOne({ Un: "21R11A0501" })
// //     .then(user => {
// //         if (user) {
// //             console.log("Password:", user);
// //         } else {
// //             console.log("User not found");
// //         }
// //     })
// //     .catch(err => {
// //         console.log("Error finding user:", err);
// //     });


// // Fetching Data

// const PipSchema = new mongoose.Schema({
//     psNo: String,
//     date: String,
//     department: String,
//     items: [
//       {
//         serialNo: Number,
//         itemDescription: String,
//         quantity: Number,
//         unitPrice: Number,
//         totalPrice: Number,
//         deliveryRequired: String,
//       },
//     ],
//     remarks: String,
//     status: {
//       type: String,
//       enum: ['pending', 'accepted', 'rejected'],
//       default: 'pending',
//     },
//   });
  
//   const Pip = mongoose.model('Pip', PipSchema);
  
//   // Define the route to fetch data
//   app.get('/indents', async (req, res) => {
//     try {
//       const indents = await Pip.find();
//       res.json(indents);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching data", error });
//     }
//   });
// app.listen(3001, () => {
//     console.log("Server running on port 3001");
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const UserModel = require('./models/User');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // mongoose.connect("mongodb://127.0.0.1:27017/Users")
// mongoose.connect("mongodb+srv://EDRK:EDRK@cluster0.iuymw.mongodb.net/Users")
//     .then(() => console.log("Database connected successfully"))
//     .catch(err => {
//         console.log("Database connection error:", err);
//         process.exit(1);
//     });

// // Login route
// app.post('/login', async(req,res) => {
//     const {username,password,role} = req.body;

//     try {
//         const user = await UserModel.findOne({ Un: username });
//         if(user) {
//             if(user.Pwd === password && user.Role === role) {
//                 console.log("SUCCESS")
//                 res.json("Success");
//             } else {
//                 console.log("Backend Invalid Credentials")
//                 res.json("Invalid Credentials");
//             }
//         } else {
//             console.log("User not found")
//             res.json("User not found");
//         }
//     } catch(err) {
//         console.log("Error:",err);
//         res.json("Error");
//     }
// });

// // Login route
// // app.post('/login', async (req, res) => {
// //     const { username, password, role } = req.body;

// //     try {
// //         const user = await UserModel.findOne({ Un: username });
// //         if (user) {
// //             if (user.Pwd === password && user.Role === role) {
// //                 console.log("SUCCESS");
// //                 // Return the username after successful login
// //                 res.json({ message: "Success", username });
// //             } else {
// //                 console.log("Invalid Credentials");
// //                 res.json({ message: "Invalid Credentials" });
// //             }
// //         } else {
// //             console.log("User not found");
// //             res.json({ message: "User not found" });
// //         }
// //     } catch (err) {
// //         console.log("Error:", err);
// //         res.json({ message: "Error" });
// //     }
// // });


// // Purchase Indent Schema
// const ItemSchema = new mongoose.Schema({
//     serialNo: {
//         type: Number,
//         required: true
//     },
//     itemDescription: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     unitPrice: {
//         type: Number,
//         required: true
//     },
//     totalPrice: {
//         type: Number,
//         required: true
//     },
//     remarks: {
//       type: String,
//       required: true,
//       default: 'No remarks' // Add a default value
//   },
//     deliveryRequired: {
//         type: String,
//         required: true
//     }
// });

// const PurchaseIndentSchema = new mongoose.Schema({
//     psNo: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     date: {
//         type: String,
//         required: true
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     items: [ItemSchema],
//     // remarks: {
//     //     type: String,
//     //     required: true,
//     //     default: 'No remarks' // Add a default value
//     // },
//     status: {
//         type: String,
//         enum: ['pending', 'accepted', 'rejected'],
//         default: 'pending'
//     }
// }, {
//     timestamps: true
// });

// const PurchaseIndent = mongoose.model('PurchaseIndent', PurchaseIndentSchema);

// // Create new purchase indent
// app.post('/pip', async (req, res) => {
//     const { psNo, date, department, items } = req.body;
//     // const remarks = req.body.remarks || 'No remarks'; // Provide default if not provided

//     try {
//         // Validate request data
//         if (!psNo || !date || !department || !items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ 
//                 error: 'Invalid request data',
//                 message: 'All required fields must be provided and items must be a non-empty array'
//             });
//         }

//         // Process and validate each item
//         const processedItems = items.map(item => {
//             if (!item.deliveryRequired) {
//                 item.deliveryRequired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
//             }
//             return {
//                 serialNo: item.serialNo,
//                 itemDescription: item.itemDescription,
//                 quantity: item.quantity,
//                 unitPrice: item.unitPrice,
//                 totalPrice: item.quantity * item.unitPrice,
//                 deliveryRequired: item.deliveryRequired,
//                 remarks:item.remarks
//             };
//         });

//         const newIndent = new PurchaseIndent({
//             psNo,
//             date,
//             department,
//             items: processedItems,
//             // remarks,
//             status: 'pending'
//         });

//         const savedIndent = await newIndent.save();
//         res.status(201).json({ 
//             message: 'Data inserted successfully', 
//             data: savedIndent 
//         });
//     } catch (error) {
//         console.error('Error creating indent:', error);
//         res.status(400).json({ 
//             error: 'Failed to insert data',
//             message: error.message
//         });
//     }
// });

// // Get all indents
// app.get('/indents', async (req, res) => {
//     try {
//         const indents = await PurchaseIndent.find().sort({ createdAt: -1 });
//         res.json(indents);
//     } catch (error) {
//         console.error('Error fetching indents:', error);
//         res.status(500).json({ message: "Error fetching data", error: error.message });
//     }
// });

// // Update indent status
// app.post('/indents/update-status', async (req, res) => {
//     try {
//         const { indentIds, status } = req.body;

//         if (!indentIds || !Array.isArray(indentIds) || !status) {
//             return res.status(400).json({ message: "Invalid request data" });
//         }

//         if (!['accepted', 'rejected'].includes(status)) {
//             return res.status(400).json({ message: "Invalid status" });
//         }
        
//         const updateResult = await PurchaseIndent.updateMany(
//             { _id: { $in: indentIds }, status: 'pending' },
//             { $set: { status } }
//         );

//         if (updateResult.modifiedCount === 0) {
//             return res.status(404).json({ message: "No indents found to update" });
//         }

//         res.json({ 
//             message: `Successfully updated ${updateResult.modifiedCount} indents`,
//             modifiedCount: updateResult.modifiedCount
//         });
//     } catch (error) {
//         console.error('Error updating indent status:', error);
//         res.status(500).json({ message: "Error updating status", error: error.message });
//     }
// });


// // const PurchaseIndentSchema = new mongoose.Schema({
// //     psNo: {
// //         type: String,
// //         required: true,
// //         unique: true
// //     },
// //     date: {
// //         type: String,
// //         required: true
// //     },
// //     department: {
// //         type: String,
// //         required: true
// //     },
// //     items: [ItemSchema],
// //     remarks: {
// //         type: String,
// //         required: true,
// //         default: 'No remarks'
// //     },
// //     status: {
// //         type: String,
// //         enum: ['pending', 'hod_approved', 'principal_approved', 'approved', 'rejected'],
// //         default: 'pending'
// //     },
// //     hodApproval: {
// //         approved: Boolean,
// //         date: Date
// //     },
// //     principalApproval: {
// //         approved: Boolean,
// //         date: Date
// //     },
// //     secretaryApproval: {
// //         approved: Boolean,
// //         date: Date
// //     }
// // }, {
// //     timestamps: true
// // });

// // const PurchaseIndent = mongoose.model('PurchaseIndent', PurchaseIndentSchema);

// // // Create new purchase indent
// // app.post('/pip', async (req, res) => {
// //     const { psNo, date, department, items } = req.body;
// //     const remarks = req.body.remarks || 'No remarks';

// //     try {
// //         if (!psNo || !date || !department || !items || !Array.isArray(items) || items.length === 0) {
// //             return res.status(400).json({ 
// //                 error: 'Invalid request data',
// //                 message: 'All required fields must be provided and items must be a non-empty array'
// //             });
// //         }

// //         const processedItems = items.map(item => {
// //             if (!item.deliveryRequired) {
// //                 item.deliveryRequired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
// //             }
// //             return {
// //                 serialNo: item.serialNo,
// //                 itemDescription: item.itemDescription,
// //                 quantity: item.quantity,
// //                 unitPrice: item.unitPrice,
// //                 totalPrice: item.quantity * item.unitPrice,
// //                 deliveryRequired: item.deliveryRequired
// //             };
// //         });

// //         const newIndent = new PurchaseIndent({
// //             psNo,
// //             date,
// //             department,
// //             items: processedItems,
// //             remarks,
// //             status: 'pending'
// //         });

// //         const savedIndent = await newIndent.save();
// //         res.status(201).json({ 
// //             message: 'Data inserted successfully', 
// //             data: savedIndent 
// //         });
// //     } catch (error) {
// //         console.error('Error creating indent:', error);
// //         res.status(400).json({ 
// //             error: 'Failed to insert data',
// //             message: error.message
// //         });
// //     }
// // });

// // // Get all indents
// // app.get('/indents', async (req, res) => {
// //     try {
// //         const indents = await PurchaseIndent.find().sort({ createdAt: -1 });
// //         res.json(indents);
// //     } catch (error) {
// //         console.error('Error fetching indents:', error);
// //         res.status(500).json({ message: "Error fetching data", error: error.message });
// //     }
// // });

// // // Update indent status
// // app.post('/indents/update-status', async (req, res) => {
// //     try {
// //         const { indentIds, status, approverRole } = req.body;

// //         if (!indentIds || !Array.isArray(indentIds) || !status || !approverRole) {
// //             return res.status(400).json({ message: "Invalid request data" });
// //         }

// //         let updateStatus;
// //         let updateField;

// //         switch (approverRole) {
// //             case 'hod':
// //                 updateStatus = status === 'approved' ? 'hod_approved' : 'rejected';
// //                 updateField = {
// //                     status: updateStatus,
// //                     hodApproval: {
// //                         approved: status === 'approved',
// //                         date: new Date()
// //                     }
// //                 };
// //                 break;
// //             case 'principal':
// //                 updateStatus = status === 'approved' ? 'principal_approved' : 'rejected';
// //                 updateField = {
// //                     status: updateStatus,
// //                     principalApproval: {
// //                         approved: status === 'approved',
// //                         date: new Date()
// //                     }
// //                 };
// //                 break;
// //             case 'secretary':
// //                 updateStatus = status === 'approved' ? 'approved' : 'rejected';
// //                 updateField = {
// //                     status: updateStatus,
// //                     secretaryApproval: {
// //                         approved: status === 'approved',
// //                         date: new Date()
// //                     }
// //                 };
// //                 break;
// //             default:
// //                 return res.status(400).json({ message: "Invalid approver role" });
// //         }

// //         const updateResult = await PurchaseIndent.updateMany(
// //             { 
// //                 _id: { $in: indentIds },
// //                 status: approverRole === 'hod' ? 'pending' :
// //                         approverRole === 'principal' ? 'hod_approved' :
// //                         'principal_approved'
// //             },
// //             { $set: updateField }
// //         );

// //         if (updateResult.modifiedCount === 0) {
// //             return res.status(404).json({ message: "No indents found to update" });
// //         }

// //         res.json({ 
// //             message: `Successfully updated ${updateResult.modifiedCount} indents`,
// //             modifiedCount: updateResult.modifiedCount
// //         });
// //     } catch (error) {
// //         console.error('Error updating indent status:', error);
// //         res.status(500).json({ message: "Error updating status", error: error.message });
// //     }
// // });


// // Consumable Item Schema
// const ConsumableItemSchema = new mongoose.Schema({
//     itemName: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     description: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// });

// const ConsumableItem = mongoose.model('ConsumableItem', ConsumableItemSchema);

// // Purchase Order Schema
// // const PurchaseOrderSchema = new mongoose.Schema({
// //     studentId: {
// //         type: String,
// //         required: true
// //     },
// //     items: [{
// //         itemId: {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref: 'ConsumableItem'
// //         },
// //         quantity: {
// //             type: Number,
// //             required: true,
// //             min: 1
// //         },
// //         priceAtPurchase: {
// //             type: Number,
// //             required: true
// //         }
// //     }],
// //     totalAmount: {
// //         type: Number,
// //         required: true
// //     }
// // }, {
// //     timestamps: true
// // });

// const PurchaseOrderSchema = new mongoose.Schema({
//     studentId: {
//         type: String,
//         required: true
//     },
//     items: [{
//         itemId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'ConsumableItem'
//         },
//         itemName :{
//             type: String,
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             min: 1
//         },
//         priceAtPurchase: {
//             type: Number,
//             required: true
//         }
//     }],
//     totalAmount: {
//         type: Number,
//         required: true
//     }
// }, {
//     timestamps: true
// });


// const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);

// // Create new consumable items
// app.post('/consumables', async (req, res) => {
//     const { items } = req.body;

//     try {
//         const savedItems = await ConsumableItem.insertMany(items);
//         res.status(201).json({ 
//             message: 'Items added successfully', 
//             data: savedItems 
//         });
//     } catch (error) {
//         console.error('Error adding items:', error);
//         res.status(400).json({ 
//             error: 'Failed to add items',
//             message: error.message
//         });
//     }
// });

// // Get all consumable items
// app.get('/consumables', async (req, res) => {
//     try {
//         const items = await ConsumableItem.find().sort({ createdAt: -1 });
//         res.json(items);
//     } catch (error) {
//         console.error('Error fetching items:', error);
//         res.status(500).json({ message: "Error fetching items", error: error.message });
//     }
// });

// // Create purchase order
// app.post('/purchase', async (req, res) => {
//     const { items, studentId } = req.body;

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         let totalAmount = 0;
//         const purchaseItems = [];

//         // Process each item in the order
//         for (const item of items) {
//             const consumableItem = await ConsumableItem.findById(item.itemId).session(session);
            
//             // if (!consumableItem) { ```javascript
//             if (!consumableItem) {
//                 throw new Error(`Item ${item.itemId} not found`);
//             }

//             if (consumableItem.quantity < item.quantity) {
//                 throw new Error(`Insufficient quantity for ${consumableItem.itemName}`);
//             }

//             // Update inventory quantity
//             await ConsumableItem.findByIdAndUpdate(
//                 item.itemId,
//                 { $inc: { quantity: -item.quantity } },
//                 { session }
//             );

//             // Calculate item total and add to purchase items
//             const itemTotal = consumableItem.price * item.quantity;
//             totalAmount += itemTotal;
//             purchaseItems.push({
//                 itemName:item.itemName,
//                 itemId: item.itemId,
//                 quantity: item.quantity,
//                 priceAtPurchase: consumableItem.price
//             });
//         }
//         // const uname=localStorage.getItem('uname');
//         // Create purchase order
//         const purchaseOrder = new PurchaseOrder({
//             studentId : studentId||'21R11A0567',
//             items: purchaseItems,
//             totalAmount
//         });

//         await purchaseOrder.save({ session });
//         await session.commitTransaction();

//         res.status(201).json({
//             message: 'Purchase successful',
//             data: purchaseOrder
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         console.error('Error processing purchase:', error);
//         res.status(400).json({
//             error: 'Purchase failed',
//             message: error.message
//         });
//     } finally {
//         session.endSession();
//     }
// });

// // Get all purchase orders
// app.get('/purchases', async (req, res) => {
//     try {
//         const purchaseOrders = await PurchaseOrder.find()
//             .populate('items.itemId', 'itemName description') // Populate item details
//             .sort({ createdAt: -1 }); // Sort by most recent first
//         res.json(purchaseOrders);
//     } catch (error) {
//         console.error('Error fetching purchase orders:', error);
//         res.status(500).json({ message: "Error fetching purchase orders", error: error.message });
//     }
// });






// app.listen(3001, () => {
//     console.log("Server running on port 3001");
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer");
// const MaterialIssue = require('./models/materialIssue');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://EDRK:EDRK@cluster0.iuymw.mongodb.net/Users")
    .then(() => console.log("Database connected successfully"))
    .catch(err => {
        console.log("Database connection error:", err);
        process.exit(1);
    });
    // function generateRandomToken(length) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let token = '';
    //     for (let i = 0; i < length; i++) {
    //       const randomIndex = Math.floor(Math.random() * characters.length);
    //       token += characters[randomIndex];
    //     }
    //     return token;
    //   }
    // app.post('/login', async (req, res) => {
    //     const { username, password, role } = req.body;
    //     console.log(username, password, role);
    
    //     try {
    //         const user = await UserModel.findOne({ Un: username });
    
    //         if (user) {
    //             const isMatch = await bcrypt.compare(password, user.Pwd); // Compare hashed password
                
    //             if (isMatch && user.Role === role) {
    //                 console.log("SUCCESS");
    //                 const SECRET_KEY = generateRandomToken(32);
    //                 const token = jwt.sign({ username: user.Un, role: user.Role }, SECRET_KEY, { expiresIn: '1h' });
    //                 res.json({ status: "Success", token });
    //                 console.log(token);
    //             } else {
    //                 console.log("Invalid Credentials");
    //                 res.json({ status: "Invalid Credentials" });
    //             }
    //         } else {
    //             console.log("User not found");
    //             res.json({ status: "User not found" });
    //         }
    //     } catch (err) {
    //         console.log("Error:", err);
    //         res.json({ status: "Error" });
    //     }
    // });
// Login route
app.post('/login', async(req,res) => {
    const {username,password,role} = req.body;
    console.log(username,password,role);

    try {
        const user = await UserModel.findOne({ Un: username });
        if(user) {
            if(user.Pwd === password && user.Role === role) {
                console.log("SUCCESS")
                // const SECRET_KEY = generateRandomToken(32);
                //     const token = jwt.sign({ username: user.Un, role: user.Role }, SECRET_KEY, { expiresIn: '1h' });
                //     res.json({ status: "Success", token });
                res.json("Success");
            } else {
                console.log("Invalid Credentials")
                res.json("Invalid Credentials");
            }
        } else {
            console.log("User not found")
            res.json("User not found");
        }
    } catch(err) {
        console.log("Error:",err);
        res.json("Error");
    }
});

// Consumable Item Schema
const ConsumableItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ConsumableItem = mongoose.model('ConsumableItem', ConsumableItemSchema);

// // Purchase Order Schema
// const PurchaseOrderSchema = new mongoose.Schema({
//     studentId: {
//         type: String,
//         required: true
//     },
//     items: [{
//         itemId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'ConsumableItem'
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             min: 1
//         },
//         priceAtPurchase: {
//             type: Number,
//             required: true
//         }
//     }],
//     totalAmount: {
//         type: Number,
//         required: true
//     }
// }, {
//     timestamps: true
// });

const PurchaseOrderSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ConsumableItem'
        },
        itemName :{
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        priceAtPurchase: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);

// Purchase Indent Schema
const ItemSchema = new mongoose.Schema({
    serialNo: {
        type: Number,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: true,
        default: 'No remarks'
    },
    deliveryRequired: {
        type: String,
        required: true
    }
});

const PurchaseIndentSchema = new mongoose.Schema({
    psNo: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    items: [ItemSchema],
    // remarks: {
    //     type: String,
    //     required: true,
    //     default: 'No remarks'
    // },
    status: {
        type: String,
        enum: ['pending', 'hod_approved', 'principal_approved', 'approved', 'rejected'],
        default: 'pending'
    },
    hodApproval: {
        approved: Boolean,
        date: Date
    },
    principalApproval: {
        approved: Boolean,
        date: Date
    },
    secretaryApproval: {
        approved: Boolean,
        date: Date
    },
    deliveryStatus: {
        type: String,
        enum: ['not_delivered', 'delivered'],
        default: 'not_delivered'
    },
    deliveryRemarks: [{
        remark: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const PurchaseIndent = mongoose.model('PurchaseIndent', PurchaseIndentSchema);

// History Schema
const HistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['indent', 'consumable'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
});

const History = mongoose.model('History', HistorySchema);

// Create new consumable items
// app.post('/consumables', async (req, res) => {
//     const { items } = req.body;

//     try {
//         const savedItems = await ConsumableItem.insertMany(items);
//         res.status(201).json({ 
//             message: 'Items added successfully', 
//             data: savedItems 
//         });
//     } catch (error) {
//         console.error('Error adding items:', error);
//         res.status(400).json({ 
//             error: 'Failed to add items',
//             message: error.message
//         });
//     }
// });

// app.post('/consumables', async (req, res) => {
//     const { items } = req.body;

//     try {
//         const processedItems = [];
        
//         for (const item of items) {
//             if (item.existingId) {
//                 // Update existing item
//                 const existingItem = await ConsumableItem.findById(item.existingId);
//                 if (existingItem) {
//                     existingItem.quantity += item.quantity;
//                     // Only update price if it's different and the new price is not 0
//                     if (item.price !== 0 && item.price !== existingItem.price) {
//                         existingItem.price = item.price;
//                     }
//                     // Only update description if it's provided and different
//                     if (item.description && item.description !== existingItem.description) {
//                         existingItem.description = item.description;
//                     }
//                     await existingItem.save();
//                     processedItems.push(existingItem);
//                 }
//             } else {
//                 // Create new item
//                 const newItem = new ConsumableItem({
//                     itemName: item.itemName,
//                     quantity: item.quantity,
//                     price: item.price,
//                     description: item.description,
//                     category: item.category
//                 });
//                 await newItem.save();
//                 processedItems.push(newItem);
//             }
//         }

//         res.status(201).json({ 
//             message: 'Items processed successfully', 
//             data: processedItems 
//         });
//     } catch (error) {
//         console.error('Error processing items:', error);
//         res.status(400).json({ 
//             error: 'Failed to process items',
//             message: error.message
//         });
//     }
// });

// Add new route for updating quantities
// app.post('/consumables/update', async (req, res) => {
//     const { itemId, quantityToAdd,cost } = req.body;

//     try {
//         const item = await ConsumableItem.findById(itemId);
//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }

//         item.quantity += quantityToAdd;
//         item.price = cost; // Overwrite price with provided cost
//         await item.save();

//         res.json({ 
//             message: 'Quantity updated successfully',
//             data: item
//         });
//     } catch (error) {
//         console.error('Error updating quantity:', error);
//         res.status(400).json({ 
//             error: 'Failed to update quantity',
//             message: error.message
//         });
//     }
// });

app.get('/history', async (req, res) => {
    try {
        const history = await History.find().sort({ date: -1 });
        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: "Error fetching history", error: error.message });
    }
});

// Get all consumable items
app.get('/consumables', async (req, res) => {
    try {
        const items = await ConsumableItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
});

app.post('/consumables', async (req, res) => {
    const { items } = req.body;

    try {
        const processedItems = [];
        
        for (const item of items) {
            if (item.existingId) {
                // Update existing item
                const existingItem = await ConsumableItem.findById(item.existingId);
                if (existingItem) {
                    const oldQuantity = existingItem.quantity;
                    existingItem.quantity += item.quantity;
                    
                    // Only update price if it's different and the new price is not 0
                    if (item.price !== 0 && item.price !== existingItem.price) {
                        existingItem.price = item.price;
                    }
                    
                    // Only update description if it's provided and different
                    if (item.description && item.description !== existingItem.description) {
                        existingItem.description = item.description;
                    }
                    
                    await existingItem.save();
                    processedItems.push(existingItem);

                    // Add to history
                    const historyEntry = new History({
                        itemName: existingItem.itemName,
                        category: existingItem.category,
                        department: 'Inventory',
                        type: 'consumable',
                        quantity: item.quantity,
                        price: existingItem.price,
                        totalAmount: item.quantity * existingItem.price
                    });
                    await historyEntry.save();
                }
            } else {
                // Create new item
                const newItem = new ConsumableItem({
                    itemName: item.itemName,
                    quantity: item.quantity,
                    price: item.price,
                    description: item.description,
                    category: item.category
                });
                await newItem.save();
                processedItems.push(newItem);

                // Add to history
                const historyEntry = new History({
                    itemName: newItem.itemName,
                    category: newItem.category,
                    department: 'Inventory',
                    type: 'consumable',
                    quantity: newItem.quantity,
                    price: newItem.price,
                    totalAmount: newItem.quantity * newItem.price
                });
                await historyEntry.save();
            }
        }

        res.status(201).json({ 
            message: 'Items processed successfully', 
            data: processedItems 
        });
    } catch (error) {
        console.error('Error processing items:', error);
        res.status(400).json({ 
            error: 'Failed to process items',
            message: error.message
        });
    }
});

// Add new route for updating quantities with history tracking
app.post('/consumables/update', async (req, res) => {
    const { itemId, quantityToAdd, cost } = req.body;

    try {
        const item = await ConsumableItem.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const oldPrice = item.price;
        item.quantity += quantityToAdd;
        if (cost) {
            item.price = cost;
        }
        await item.save();

        // Add to history
        const historyEntry = new History({
            itemName: item.itemName,
            category: item.category,
            department: 'Inventory',
            type: 'consumable',
            quantity: quantityToAdd,
            price: cost || oldPrice,
            totalAmount: quantityToAdd * (cost || oldPrice)
        });
        await historyEntry.save();

        res.json({ 
            message: 'Quantity updated successfully',
            data: item
        });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(400).json({ 
            error: 'Failed to update quantity',
            message: error.message
        });
    }
});

app.delete('/consumables/delete', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { itemIds } = req.body;
  
      if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
        return res.status(400).json({ error: 'Valid item IDs array is required' });
      }
  
      const deletedItems = await ConsumableItem.deleteMany(
        { _id: { $in: itemIds } },
        { session }
      );
  
      if (deletedItems.deletedCount === 0) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'No items found to delete' });
      }
  
      const historyEntries = itemIds.map(itemId => ({
        itemName: "Item Deleted",
        category: "Inventory Management",
        department: "Inventory",
        type: "consumable",
        quantity: 0,
        price: 0,
        totalAmount: 0,
        details: `Item ID: ${itemId} deleted from inventory`
      }));
  
      await History.insertMany(historyEntries, { session });
      await session.commitTransaction();
  
      res.status(200).json({ 
        message: `Successfully deleted ${deletedItems.deletedCount} items`,
        deletedCount: deletedItems.deletedCount
      });
    } catch (error) {
      await session.abortTransaction();
      console.error('Error deleting items:', error);
      res.status(500).json({ message: 'Error deleting items', error: error.message });
    } finally {
      session.endSession();
    }
  });



// Create purchase order
app.post('/purchase', async (req, res) => {
    const { items, studentId } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let totalAmount = 0;
        const purchaseItems = [];

        // Process each item in the order
        for (const item of items) {
            const consumableItem = await ConsumableItem.findById(item.itemId).session(session);
            
            // if (!consumableItem) { ```javascript
            if (!consumableItem) {
                throw new Error(`Item ${item.itemId} not found`);
            }

            if (consumableItem.quantity < item.quantity) {
                throw new Error(`Insufficient quantity for ${consumableItem.itemName}`);
            }

            // Update inventory quantity
            await ConsumableItem.findByIdAndUpdate(
                item.itemId,
                { $inc: { quantity: -item.quantity } },
                { session }
            );

            // Calculate item total and add to purchase items
            const itemTotal = consumableItem.price * item.quantity;
            totalAmount += itemTotal;
            purchaseItems.push({
                itemName:item.itemName,
                itemId: item.itemId,
                quantity: item.quantity,
                priceAtPurchase: consumableItem.price
            });
        }
        // const uname=localStorage.getItem('uname');
        // Create purchase order
        const purchaseOrder = new PurchaseOrder({
            studentId : studentId||'21R11A0567',
            items: purchaseItems,
            totalAmount
        });

        await purchaseOrder.save({ session });
        await session.commitTransaction();

        res.status(201).json({
            message: 'Purchase successful',
            data: purchaseOrder
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error processing purchase:', error);
        res.status(400).json({
            error: 'Purchase failed',
            message: error.message
        });
    } finally {
        session.endSession();
    }
});

// // Get all purchase orders
app.get('/purchases', async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find()
            .populate('items.itemId', 'itemName description') // Populate item details
            .sort({ createdAt: -1 }); // Sort by most recent first
        res.json(purchaseOrders);
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
        res.status(500).json({ message: "Error fetching purchase orders", error: error.message });
    }
});

// Create new purchase indent
app.post('/pip', async (req, res) => {
    const { psNo, date, department, items } = req.body;
    const remarks = req.body.remarks || 'No remarks';
    
    try {
        if (!psNo || !date || !department || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ 
                error: 'Invalid request data',
                message: 'All required fields must be provided and items must be a non-empty array'
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '21r11a0567@gcet.edu.in',
              pass: 'cwnj qrmc zzro pweb',
            },
          });
      
          const mailOptions = await transporter.sendMail({
            from: '"EDRK" <21r11a0567@gcet.edu.in>',
            to: 'dhanush.erramuri.raj@gmail.com',
            subject: 'Purchase Indent Raised',
            html: `<h3>New Purchase Indent has been Submitted look into it</h3>'
             <p>Department: ${department}</p>
             <p>Date: ${new Date(date).toLocaleString()}</p>
             <p>Items: ${items.length}</p>`,
          });
          await transporter.sendMail(mailOptions);
        const processedItems = items.map(item => {
            if (!item.deliveryRequired) {
                item.deliveryRequired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            }
            return {
                serialNo: item.serialNo,
                itemDescription: item.itemDescription,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.quantity * item.unitPrice,
                deliveryRequired: item.deliveryRequired,
                remarks : item.remarks
            };
        });

        const newIndent = new PurchaseIndent({
            psNo,
            date,
            department,
            items: processedItems,
            // remarks: item.remarks,
            status: 'pending'
        });

        const savedIndent = await newIndent.save();
        res.status(201).json({ 
            message: 'Indent submitted and email sent', 
            data: savedIndent 
        });
    } catch (error) {
        console.error('Error creating indent:', error);
        res.status(400).json({ 
            error: 'Failed to process indent or send email',
            message: error.message
        });
    }
});

// Get all indents
app.get('/indents', async (req, res) => {
    try {
        const indents = await PurchaseIndent.find().sort({ createdAt: -1 });
        res.json(indents);
    } catch (error) {
        console.error('Error fetching indents:', error);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

// Update indent status
app.post('/indents/update-status', async (req, res) => {
    try {
        const { indentIds, status, approverRole } = req.body;

        if (!indentIds || !Array.isArray(indentIds) || !status || !approverRole) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        let updateStatus;
        let updateField;

        switch (approverRole) {
            case 'hod':
                updateStatus = status === 'approved' ? 'hod_approved' : 'rejected';
                updateField = {
                    status: updateStatus,
                    hodApproval: {
                        approved: status === 'approved',
                        date: new Date()
                    }
                };
                break;
            case 'principal':
                updateStatus = status === 'approved' ? 'principal_approved' : 'rejected';
                updateField = {
                    status: updateStatus,
                    principalApproval: {
                        approved: status === 'approved',
                        date: new Date()
                    }
                };
                break;
            case 'secretary':
                updateStatus = status === 'approved' ? 'approved' : 'rejected';
                updateField = {
                    status: updateStatus,
                    secretaryApproval: {
                        approved: status === 'approved',
                        date: new Date()
                    }
                };
                break;
            default:
                return res.status(400).json({ message: "Invalid approver role" });
        }

        const updateResult = await PurchaseIndent.updateMany(
            { 
                _id: { $in: indentIds },
                status: approverRole === 'hod' ? 'pending' :
                        approverRole === 'principal' ? 'hod_approved' :
                        'principal_approved'
            },
            { $set: updateField }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: "No indents found to update" });
        }

        res.json({ 
            message: `Successfully updated ${updateResult.modifiedCount} indents`,
            modifiedCount: updateResult.modifiedCount
        });
    } catch (error) {
        console.error('Error updating indent status:', error);
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
});

// Update delivery status and remarks
app.post('/indents/update-delivery', async (req, res) => {
    try {
        const { indentId, deliveryStatus, remark} = req.body;

        const indent = await PurchaseIndent.findById(indentId);
        if (!indent) {
            return res.status(404).json({ message: "Indent not found" });
        }

        // If already delivered, don't allow changes
        if (indent.deliveryStatus === 'delivered') {
            return res.status(400).json({ message: "Cannot update delivery status of delivered items" });
        }

        const update = {};
        
        if (deliveryStatus) {
            update.deliveryStatus = deliveryStatus;
        }

        if (remark) {
            update.$push = {
                deliveryRemarks: {
                    remark,
                    date: new Date()
                }
            };
        }

        const updatedIndent = await PurchaseIndent.findByIdAndUpdate(
            indentId,
            update,
            { new: true }
        );

        res.json({
            message: "Successfully updated delivery status",
            data: updatedIndent
        });
    } catch (error) {
        console.error('Error updating delivery status:', error);
        res.status(500).json({ message: "Error updating delivery status", error: error.message });
    }
});


//GATE ENTRY//

const gateEntrySchema = new mongoose.Schema({
    entryId: {
      type: String,
      required: true,
      unique: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    items: [{
      serialNo: {
        type: Number,
        required: true
      },
      invoiceNumber: {
        type: String,
        required: true
      },
      supplierName: {
        type: String,
        required: true
      },
      itemName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 0
      },
      totalPrice: {
        type: Number,
        required: true
      },
      remarks: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  });
  
  const GateEntry = mongoose.model('GateEntry', gateEntrySchema);
  
  // Add these routes to your existing Express routes
  app.post('/gate-entry', async (req, res) => {
    try {
      const gateEntry = new GateEntry(req.body);
      await gateEntry.save();
      res.status(201).json(gateEntry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.get('/gate-entries', async (req, res) => {
    try {
      const entries = await GateEntry.find().sort({ date: -1 });
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// const gateEntrySchema = new mongoose.Schema({
//     entryId: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     invoiceNumber: {
//       type: String,
//       required: true
//     },
//     supplierName: {
//       type: String,
//       required: true
//     },
//     itemName: {
//       type: String,
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     total: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now
//     }
//   });
  
//   const GateEntry = mongoose.model('GateEntry', gateEntrySchema);
  
  
//   app.post('/gate-entry', async (req, res) => {
//     try {
//       const gateEntry = new GateEntry(req.body);
//       await gateEntry.save();
//       res.status(201).json(gateEntry);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
//   app.get('/gate-entries', async (req, res) => {
//     try {
//       const entries = await GateEntry.find().sort({ timestamp: -1 });
//       res.json(entries);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });
  
//   // SendGrid configuration
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
//   // Send email notification
//   app.post('/send-email', async (req, res) => {
//     const { to, subject, indentId, department, items, totalAmount, role } = req.body;
  
//     const approvalLink = `http://localhost:3001/approve/${indentId}`;
//     const rejectLink = `http://localhost:3001/reject/${indentId}`;
  
//     const htmlContent = `
//       <h2>New Purchase Indent Notification</h2>
//       <p>Department: ${department}</p>
//       <h3>Items:</h3>
//       <table border="1" cellpadding="5" style="border-collapse: collapse;">
//         <tr>
//           <th>Item</th>
//           <th>Quantity</th>
//           <th>Unit Price</th>
//           <th>Total</th>
//         </tr>
//         ${items.map(item => `
//           <tr>
//             <td>${item.itemDescription}</td>
//             <td>${item.quantity}</td>
//             <td>₹${item.unitPrice}</td>
//             <td>₹${item.totalPrice}</td>
//           </tr>
//         `).join('')}
//       </table>
//       <p><strong>Total Amount: ₹${totalAmount}</strong></p>
//       <div style="margin-top: 20px;">
//         <a href="${approvalLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; margin-right: 10px;">
//           Approve
//         </a>
//         <a href="${rejectLink}" style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none;">
//           Reject
//         </a>
//       </div>
//     `;
  
//     try {
//       const msg = {
//         to,
//         from: process.env.EMAIL_FROM,
//         subject,
//         html: htmlContent,
//       };
  
//       await sgMail.send(msg);
//       res.json({ message: 'Email sent successfully' });
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Failed to send email' });
//     }
//   });
  
//   // Handle approval
//   app.get('/approve/:indentId', async (req, res) => {
//     const { indentId } = req.params;
    
//     try {
//       const indent = await PurchaseIndent.findById(indentId);
//       if (!indent) {
//         return res.status(404).send('Indent not found');
//       }
  
//       let nextStatus;
//       let nextEmail = false;
  
//       switch (indent.status) {
//         case 'pending':
//           nextStatus = 'hod_approved';
//           nextEmail = true;
//           break;
//         case 'hod_approved':
//           nextStatus = 'principal_approved';
//           nextEmail = true;
//           break;
//         case 'principal_approved':
//           nextStatus = 'approved';
//           break;
//       }
  
//       await PurchaseIndent.findByIdAndUpdate(indentId, { status: nextStatus });
  
//       if (nextEmail) {
//         const msg = {
//           to: 'dhanush.erramuri.raj@gmail.com',
//           from: process.env.EMAIL_FROM,
//           subject: `Purchase Indent ${nextStatus === 'hod_approved' ? 'HOD Approved' : 'Principal Approved'}`,
//           html: `
//             <h2>Purchase Indent Update</h2>
//             <p>The purchase indent has been approved by ${nextStatus === 'hod_approved' ? 'HOD' : 'Principal'}.</p>
//             <p>Please review and take necessary action.</p>
//             <div style="margin-top: 20px;">
//               <a href="http://localhost:3001/approve/${indentId}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; margin-right: 10px;">
//                 Approve
//               </a>
//               <a href="http://localhost:3001/reject/${indentId}" style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none;">
//                 Reject
//               </a>
//             </div>
//           `
//         };
  
//         await sgMail.send(msg);
//       }
  
//       res.send('Indent approved successfully');
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).send('Error processing approval');
//     }
//   });

// Material Issue API
// app.post('/material-issue', async (req, res) => {
//     try {
//       const { issueId, itemId, issuedQty, requiredQty, department, issuerName, date } = req.body;
      
//       // Check if item exists and has enough stock
//       const itemIndex = consumableItems.findIndex(item => item._id === itemId);
//       if (itemIndex === -1) {
//         return res.status(404).json({ message: 'Item not found' });
//       }
      
//       if (consumableItems[itemIndex].quantity < issuedQty) {
//         return res.status(400).json({ 
//           message: 'Not enough stock',
//           availableQuantity: consumableItems[itemIndex].quantity
//         });
//       }
      
//       // Create material issue record
//       const materialIssue = new MaterialIssue({
//         issueId,
//         itemId,
//         itemName: consumableItems[itemIndex].itemName,
//         requiredQty,
//         issuedQty,
//         remainingQty: requiredQty - issuedQty,
//         department,
//         issuerName,
//         date,
//         status: 'pending'
//       });
      
//       // Reduce inventory
//       consumableItems[itemIndex].quantity -= issuedQty;
      
//       // Create history record
//       const historyRecord = new History({
//         itemName: consumableItems[itemIndex].itemName,
//         category: consumableItems[itemIndex].category,
//         department,
//         type: 'consumable',
//         quantity: issuedQty,
//         price: consumableItems[itemIndex].price,
//         totalAmount: issuedQty * consumableItems[itemIndex].price
//       });
      
//       await Promise.all([
//         materialIssue.save(),
//         historyRecord.save()
//       ]);
      
//       res.status(201).json({ 
//         message: 'Material issued successfully',
//         materialIssue
//       });
//     } catch (error) {
//       console.error('Error issuing material:', error);
//       res.status(500).json({ message: 'Error issuing material', error: error.message });
//     }
//   });
  
//   // Get all material issues
//   app.get('/material-issues', async (req, res) => {
//     try {
//       const issues = await MaterialIssue.find().sort({ date: -1 });
//       res.json(issues);
//     } catch (error) {
//       console.error('Error fetching material issues:', error);
//       res.status(500).json({ message: 'Error fetching material issues', error: error.message });
//     }
//   });
  
//   // Get material issues for a specific department
//   app.get('/material-issues/:department', async (req, res) => {
//     try {
//       const { department } = req.params;
//       const issues = await MaterialIssue.find({ department }).sort({ date: -1 });
//       res.json(issues);
//     } catch (error) {
//       console.error('Error fetching department material issues:', error);
//       res.status(500).json({ message: 'Error fetching department material issues', error: error.message });
//     }
//   });
  
//   // Department issue API
//   app.post('/department-issue', async (req, res) => {
//     try {
//       const { issueId, department } = req.body;
      
//       const issue = await MaterialIssue.findById(issueId);
//       if (!issue) {
//         return res.status(404).json({ message: 'Issue not found' });
//       }
      
//       if (issue.status === 'issued') {
//         return res.status(400).json({ message: 'Issue already processed' });
//       }
      
//       issue.status = 'issued';
//       issue.departmentIssueDate = new Date();
      
//       // Create history record for department issue
//       const historyRecord = new History({
//         itemName: issue.itemName,
//         category: 'Department Issue',
//         department: department,
//         type: 'consumable',
//         quantity: issue.issuedQty,
//         price: 0, // Price is not relevant for department issues
//         totalAmount: 0 // Total amount is not relevant for department issues
//       });
      
//       await Promise.all([
//         issue.save(),
//         historyRecord.save()
//       ]);
      
//       res.json({ 
//         message: 'Department issue processed successfully',
//         issue
//       });
//     } catch (error) {
//       console.error('Error processing department issue:', error);
//       res.status(500).json({ message: 'Error processing department issue', error: error.message });
//     }
//   });
  
//   // Get material issue history
//   app.get('/material-issue-history', async (req, res) => {
//     try {
//       // Get all material issues
//       const issues = await MaterialIssue.find().sort({ date: -1 });
      
//       // Get history records related to material issues
//       const history = await History.find({
//         $or: [
//           { category: 'Department Issue' },
//           { type: 'consumable', department: { $ne: 'Inventory' } }
//         ]
//       }).sort({ date: -1 });
      
//       res.json({
//         issues,
//         history
//       });
//     } catch (error) {
//       console.error('Error fetching material issue history:', error);
//       res.status(500).json({ message: 'Error fetching material issue history', error: error.message });
//     }
//   });


// Material Issue Schema
// const MaterialIssueSchema = new mongoose.Schema({
//     issueId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     itemId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'ConsumableItem',
//         required: true
//     },
//     itemName: {
//         type: String,
//         required: true
//     },
//     requiredQty: {
//         type: Number,
//         required: true,
//         min: 1
//     },
//     issuedQty: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     remainingQty: {
//         type: Number,
//         required: true
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     issuerName: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'issued', 'rejected'],
//         default: 'pending'
//     },
//     departmentIssueDate: {
//         type: Date
//     }
// });

// const MaterialIssue = mongoose.model('MaterialIssue', MaterialIssueSchema);

// // Material Issue API Routes
// app.post('/material-issue', async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { issueId, itemId, issuedQty, requiredQty, department, issuerName, date } = req.body;
        
//         // Find the consumable item
//         const consumableItem = await ConsumableItem.findById(itemId).session(session);
        
//         if (!consumableItem) {
//             throw new Error('Item not found');
//         }
        
//         // Check if there's enough stock
//         if (consumableItem.quantity < issuedQty) {
//             throw new Error('Not enough stock');
//         }
        
//         // Reduce inventory
//         await ConsumableItem.findByIdAndUpdate(
//             itemId,
//             { $inc: { quantity: -issuedQty } },
//             { session }
//         );
        
//         // Create material issue record
//         const materialIssue = new MaterialIssue({
//             issueId,
//             itemId,
//             itemName: consumableItem.itemName,
//             requiredQty,
//             issuedQty,
//             remainingQty: requiredQty - issuedQty,
//             department,
//             issuerName,
//             date: date || new Date(),
//             status: 'pending'
//         });
        
//         // Create history record
//         const historyEntry = new History({
//             itemName: consumableItem.itemName,
//             category: consumableItem.category,
//             department,
//             type: 'consumable',
//             quantity: issuedQty,
//             price: consumableItem.price,
//             totalAmount: issuedQty * consumableItem.price
//         });
        
//         // Save material issue and history
//         await materialIssue.save({ session });
//         await historyEntry.save({ session });
        
//         // Commit transaction
//         await session.commitTransaction();
        
//         res.status(201).json({ 
//             message: 'Material issued successfully',
//             materialIssue
//         });
//     } catch (error) {
//         // Abort transaction in case of error
//         await session.abortTransaction();
        
//         console.error('Error issuing material:', error);
//         res.status(500).json({ 
//             message: 'Error issuing material', 
//             error: error.message 
//         });
//     } finally {
//         // End the session
//         session.endSession();
//     }
// });

// // Get all material issues
app.get('/material-issues', async (req, res) => {
    try {
        const issues = await MaterialIssue.find()
            .populate('itemId', 'itemName category') // Populate item details
            .sort({ date: -1 });
        res.json(issues);
    } catch (error) {
        console.error('Error fetching material issues:', error);
        res.status(500).json({ 
            message: 'Error fetching material issues', 
            error: error.message 
        });
    }
});

// // Get material issues for a specific department
app.get('/material-issues/:department', async (req, res) => {
    try {
        const { department } = req.params;
        const issues = await MaterialIssue.find({ department })
            .populate('itemId', 'itemName category')
            .sort({ date: -1 });
        res.json(issues);
    } catch (error) {
        console.error('Error fetching department material issues:', error);
        res.status(500).json({ 
            message: 'Error fetching department material issues', 
            error: error.message 
        });
    }
});


// // Process department issue
// app.post('/department-issue', async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { issueId, department } = req.body;
        
//         const issue = await MaterialIssue.findById(issueId).session(session);
        
//         if (!issue) {
//             throw new Error('Issue not found');
//         }
        
//         if (issue.status === 'issued') {
//             throw new Error('Issue already processed');
//         }
        
//         // Update issue status
//         issue.status = 'issued';
//         issue.departmentIssueDate = new Date();
        
//         // Create history record for department issue
//         const historyEntry = new History({
//             itemName: issue.itemName,
//             category: 'Department Issue',
//             department: department,
//             type: 'consumable',
//             quantity: issue.issuedQty,
//             price: 0,
//             totalAmount: 0
//         });
        
//         // Save updates
//         await issue.save({ session });
//         await historyEntry.save({ session });
        
//         // Commit transaction
//         await session.commitTransaction();
        
//         res.json({ 
//             message: 'Department issue processed successfully',
//             issue
//         });
//     } catch (error) {
//         // Abort transaction in case of error
//         await session.abortTransaction();
        
//         console.error('Error processing department issue:', error);
//         res.status(500).json({ 
//             message: 'Error processing department issue', 
//             error: error.message 
//         });
//     } finally {
//         // End the session
//         session.endSession();
//     }
// });
app.post('/distribute-material', async (req, res) => {
    try {
      const { issueId, subDepartment, facultyName, issuedQty } = req.body;
      
      const issue = await MaterialIssue.findOne({ issueId });
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }
      
      if (issue.remainingQty < issuedQty) {
        return res.status(400).json({ 
          message: 'Not enough quantity available',
          availableQuantity: issue.remainingQty
        });
      }
  
      if (!issue.issueDetails) {
        issue.issueDetails = [];
      }
  
      issue.issueDetails.push({
        subDepartment,
        facultyName,
        issuedQty,
        issueDate: new Date()
      });
  
      issue.remainingQty -= issuedQty;
  
      if (issue.remainingQty === 0) {
        issue.status = 'fully distributed';
      } else if (issue.remainingQty < issue.requiredQty) {
        issue.status = 'partially distributed';
      }
  
      const historyRecord = new History({
        itemName: issue.itemName,
        category: 'Department Distribution',
        department: subDepartment,
        type: 'consumable',
        quantity: issuedQty,
        price: 0,
        totalAmount: 0,
        details: `Distributed to ${facultyName}`
      });
  
      await Promise.all([
        issue.save(),
        historyRecord.save()
      ]);
  
      res.json({
        message: 'Material distributed successfully',
        issue
      });
    } catch (error) {
      console.error('Error distributing material:', error);
      res.status(500).json({ 
        message: 'Error distributing material', 
        error: error.message 
      });
    }
  });
  

// // Get material issue history
app.get('/material-issue-history', async (req, res) => {
    try {
        // Get all material issues
        const issues = await MaterialIssue.find()
            .populate('itemId', 'itemName category')
            .sort({ date: -1 });
        
        // Get history records related to material issues
        const history = await History.find({
            $or: [
                { category: 'Department Issue' },
                { type: 'consumable', department: { $ne: 'Inventory' } }
            ]
        }).sort({ date: -1 });
        
        res.json({
            issues,
            history
        });
    } catch (error) {
        console.error('Error fetching material issue history:', error);
        res.status(500).json({ 
            message: 'Error fetching material issue history', 
            error: error.message 
        });
    }
});

// const MaterialIssue = mongoose.model('MaterialIssue', MaterialIssueSchema);

// Material Issue API Routes
const MaterialIssueSchema = new mongoose.Schema({
    issueId: {
        type: String,
        required: true,
        unique: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConsumableItem',
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    parentIssueId: {
        type: String,
        default: null
    },
    requiredQty: {
        type: Number,
        required: true,
        min: 1
    },
    issuedQty: {
        type: Number,
        required: true,
        min: 0
    },
    remainingQty: {
        type: Number,
        required: true
    },
    issueDetails: [{
        subDepartment: {
            type: String,
            required: true
        },
        facultyName: {
            type: String,
            required: true
        },
        issuedQty: {
            type: Number,
            required: true,
            min: 0
        },
        issueDate: {
            type: Date,
            default: Date.now
        }
    }],
    issuerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'issued', 'partially distributed', 'fully distributed'],
        default: 'pending'
    }
});

const MaterialIssue = mongoose.model('MaterialIssue', MaterialIssueSchema);

// Route to issue material to a department
app.post('/material-issue', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { 
            issueId, 
            itemId, 
            department,
            issuedQty, 
            requiredQty, 
            issuerName
        } = req.body;
        
        // Find the consumable item
        const consumableItem = await ConsumableItem.findById(itemId).session(session);
        
        if (!consumableItem) {
            throw new Error('Item not found');
        }
        
        // Check if there's enough stock
        if (consumableItem.quantity < issuedQty) {
            throw new Error('Not enough stock');
        }
        
        // Reduce inventory
        await ConsumableItem.findByIdAndUpdate(
            itemId,
            { $inc: { quantity: -issuedQty } },
            { session }
        );
        
        // Create material issue record
        const materialIssue = new MaterialIssue({
            issueId,
            itemId,
            itemName: consumableItem.itemName,
            department,
            requiredQty,
            issuedQty,
            remainingQty: issuedQty,
            issuerName,
            date: new Date(),
            status: 'issued'
        });
        
        // Create history record
        const historyEntry = new History({
            itemName: consumableItem.itemName,
            category: consumableItem.category,
            department: department,
            type: 'consumable',
            quantity: issuedQty,
            price: consumableItem.price,
            totalAmount: issuedQty * consumableItem.price
        });
        
        // Save material issue and history
        await materialIssue.save({ session });
        await historyEntry.save({ session });
        
        // Commit transaction
        await session.commitTransaction();
        
        res.status(201).json({ 
            message: 'Material issued to department successfully',
            materialIssue
        });
    } catch (error) {
        // Abort transaction in case of error
        await session.abortTransaction();
        
        console.error('Error issuing material:', error);
        res.status(500).json({ 
            message: 'Error issuing material', 
            error: error.message 
        });
    } finally {
        // End the session
        session.endSession();
    }
});

// // Route to distribute material within a department
// app.post('/distribute-material', async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { 
//             issueId, 
//             subDepartment,
//             facultyName,
//             issuedQty 
//         } = req.body;
        
//         // Find the original material issue
//         const materialIssue = await MaterialIssue.findOne({ issueId }).session(session);
        
//         if (!materialIssue) {
//             throw new Error('Material issue not found');
//         }
        
//         // Check if there's enough remaining quantity
//         if (materialIssue.remainingQty < issuedQty) {
//             throw new Error('Not enough remaining quantity');
//         }
        
//         // Update the material issue
//         materialIssue.remainingQty -= issuedQty;
        
//         // Add distribution details
//         materialIssue.issueDetails.push({
//             subDepartment,
//             facultyName,
//             issuedQty,
//             issueDate: new Date()
//         });
        
//         // Update status based on remaining quantity
//         if (materialIssue.remainingQty === 0) {
//             materialIssue.status = 'fully distributed';
//         } else {
//             materialIssue.status = 'partially distributed';
//         }
        
//         // Create history record for distribution
//         const historyEntry = new History({
//             itemName: materialIssue.itemName,
//             category: 'Intradepartment Distribution',
//             department: materialIssue.department,
//             subDepartment: subDepartment,
//             type: 'consumable',
//             quantity: issuedQty,
//             facultyName: facultyName
//         });
        
//         // Save updated material issue and history
//         await materialIssue.save({ session });
//         await historyEntry.save({ session });
        
//         // Commit transaction
//         await session.commitTransaction();
        
//         res.status(201).json({ 
//             message: 'Material distributed within department successfully',
//             materialIssue
//         });
//     } catch (error) {
//         // Abort transaction in case of error
//         await session.abortTransaction();
        
//         console.error('Error distributing material:', error);
//         res.status(500).json({ 
//             message: 'Error distributing material', 
//             error: error.message 
//         });
//     } finally {
//         // End the session
//         session.endSession();
//     }
// });

// // Get material issues for a specific department
// app.get('/material-issues/:department', async (req, res) => {
//     try {
//         const { department } = req.params;
//         const issues = await MaterialIssue.find({ department })
//             .populate('itemId', 'itemName category')
//             .sort({ date: -1 });
        
//         res.json(issues);
//     } catch (error) {
//         console.error('Error fetching department material issues:', error);
//         res.status(500).json({ 
//             message: 'Error fetching department material issues', 
//             error: error.message 
//         });
//     }
// });

app.listen(3001, () => {
    console.log("Server running on port 3001");
});