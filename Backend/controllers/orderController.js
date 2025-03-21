const Order=require("../models/t4OrderSchema")

exports.createOrder=async (req,res)=>{
    try {
        const { userId, items } = req.body; 
       
        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ error: 'User ID and items are required' });
        }

      
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        // Create a new Order instance
        const newOrder = new Order({
            userId,      // Assign userId
            items,       // Assign items array
            totalAmount  // Assign totalAmount
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        // Handle errors if any occur
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getOrder= async (req,res)=>{
    try{
    const Data = await Order.find()
    // .populate('items.productId');
    res.status(200).json(Data);
    }
    catch(err){
        res.status(500).json({err:"Internal server Error"});
    }
};
exports.getOrderById = async (req, res) => {
    try {
      const { orderId } = req.query;
      if (!orderId) {
        return res.status(400).json({ err: "Order ID is required" });
      }
  
      const order = await Order.findById(orderId).populate('items.productId');
      if (!order) {
        return res.status(404).json({ err: "Order not found" });
      }
  
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ err: "Internal server error" });
    }
  };