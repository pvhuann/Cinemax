import mongoose from "mongoose";

let isConnected: boolean= false;
export const connectToDB= async(): Promise<void>=>{
    mongoose.set("strictQuery", true)

    if(isConnected) {
        console.log("Connect mongoose to database is already connected");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL|| "",{
            dbName: 'Cinema',
        })

        isConnected = true;
        console.log("Mongoose is connected successfully")
    } catch (error) {
        console.log("error: ", error)           
    }
}