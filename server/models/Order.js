import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    image: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'cod', 'wallet', 'tabby'],
    required: true
  },
  paymentDetails: {
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paidAt: Date
  },
  subtotal: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: String,
  deliveredAt: Date,
  cancelledAt: Date,
  cancellationReason: String
}, {
  timestamps: true
});


orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order
