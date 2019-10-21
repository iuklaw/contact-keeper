import config from 'config'
import mongoose from "mongoose";


const db = config.get("MongoURI")

const connectDB = async () => {
    try {
        await mongoose
            .connect(
                db as string,
                {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true
                }
            )
        console.log("mongoDB connected :)")
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB