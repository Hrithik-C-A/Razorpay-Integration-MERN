import Razorpay from 'razorpay';
import crypto from 'crypto';

const createOrder = (req, res) => {
    const {price, currency, receipt, notes} = req.body;

    const amount = price * 100;

    const KEY_ID = process.env.KEY_ID;
    const KEY_SECRET = process.env.KEY_SECRET; 

    const razorpayInstance = new Razorpay({
        key_id: `${KEY_ID}`,
        key_secret: `${KEY_SECRET}`
    });

    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          if(!err)
            res.json({order, KEY_ID});
          else
            res.send(err);
        })
};

const verifyOrder = (req, res) => {
      const { razorpay_order_id, razorpay_payment_id } = req.body;
      const razorpay_signature = req.headers['x-razorpay-signature'];

      const sign = razorpay_order_id + "|" + razorpay_payment_id;

      const KEY_SECRET = process.env.KEY_SECRET;

      const generated_signature = crypto
			.createHmac("sha256", KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

      // console.log('1', razorpay_signature)
      // console.log('2', generated_signature)
            
    if(razorpay_signature===generated_signature){
      res.json({success:true, message:"Payment has been verified"})
    }
    else {
      res.json({success:false, message:"Payment verification failed"})
    }

};

export { createOrder, verifyOrder };