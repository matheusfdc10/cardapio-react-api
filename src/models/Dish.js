import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
    {   
        typeDishesId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        image: {
            type: String,
            require: true
        },
        status: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Dishes', dishSchema);