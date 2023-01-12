import mongoose from "mongoose";

const typeDishesSchema = new mongoose.Schema(
    {   
        restaurantId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('TypeDishes', typeDishesSchema);