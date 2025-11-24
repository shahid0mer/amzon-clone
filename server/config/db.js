import mongoose from "mongoose";                    


export const connectDb = async () => {

    try {
          await mongoose.connect("mongodb+srv://shahid:ns2009517@cluster1.zsjwipv.mongodb.net/amazon-clone")
          mongoose.connection.on("mongodb connected", () => console.log(`mongodb connected`)
          )
    } catch (error) {
        console.log(error.message);       
    }
    
}