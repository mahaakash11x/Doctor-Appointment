import mongoose from 'mongoose';
import 'colors';


const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('MongoDB Database connected'.cyan.underline);
    });
    await mongoose.connect(process.env.MONGO_LOCAL_URL)
}

export default connectDB;