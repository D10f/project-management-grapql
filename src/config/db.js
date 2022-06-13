import mongoose from 'mongoose';

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE = process.env.MONGODB_DATABASE;
const MONGO_URI = `mongodb://${USERNAME}:${PASSWORD}@mongo:27017/${DATABASE}?authSource=admin`;

export default async () => {
  try {
    mongoose.connection.on('connecting', () => {
      console.info('Connecting to MongoDB...');
    });

    mongoose.connection.on('connected', () => {
      console.info('Connection to MongoDB ready');
    });

    mongoose.connection.on('disconnected', () => {
      console.error('Connection to MongoDB lost, attempting to reconnect...');
    });

    mongoose.connection.on('reconnectFailed', () => {
      console.error('Failed to reconnect to MongoDB');
    });

    return await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
