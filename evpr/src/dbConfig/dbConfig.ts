import mongoose, {mongo} from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.once('connected', () => {
            console.log("MongoDB database connection established successfully")
        })

        connection.on('error', (err) => {
            console.log("Error connecting to database: ", err)
            process.exit();
        })
        
    } catch (error: any){
        console.log("Error connecting to database");
        console.log(error);
    }
}