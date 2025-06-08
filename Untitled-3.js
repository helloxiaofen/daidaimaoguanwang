// server/models/Order.js
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  amount: { type: Number, min: 0 },
  status: { type: String, enum: ['未处理', '处理中', '已完成'] },
  progress: { type: Number, min: 0, max: 100 },
  createTime: { type: Date, default: Date.now }
});