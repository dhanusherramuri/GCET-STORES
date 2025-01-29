

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("Your Connection String")
    .then(() => console.log("Database connected successfully"))
    .catch(err => {
        console.log("Database connection error:", err);
        process.exit(1);
    });

// Login route
app.post('/login', async(req,res) => {
    const {username,password,role} = req.body;
    console.log(username,password,role);

    try {
        const user = await UserModel.findOne({ Un: username });
        if(user) {
            if(user.Pwd === password && user.Role === role) {
                console.log("SUCCESS")
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

// Create new consumable items
app.post('/consumables', async (req, res) => {
    const { items } = req.body;

    try {
        const savedItems = await ConsumableItem.insertMany(items);
        res.status(201).json({ 
            message: 'Items added successfully', 
            data: savedItems 
        });
    } catch (error) {
        console.error('Error adding items:', error);
        res.status(400).json({ 
            error: 'Failed to add items',
            message: error.message
        });
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
            studentId : studentId,
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
            message: 'Data inserted successfully', 
            data: savedIndent 
        });
    } catch (error) {
        console.error('Error creating indent:', error);
        res.status(400).json({ 
            error: 'Failed to insert data',
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



app.listen(3001, () => {
    console.log("Server running on port 3001");
});