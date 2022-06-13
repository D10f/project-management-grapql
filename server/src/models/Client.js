import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default new mongoose.model('Client', schema);
