//set up the mongoose Connection
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//load variables from .env
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//check to see if MongoDB is connected
.then(() => {
})
.catch(() => {
});