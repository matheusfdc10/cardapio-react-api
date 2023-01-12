import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {   
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        email: {
            type: String,
            required: true,
        },
        telephone: {
            type: String,
            required: true,
        },
        whatsapp: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Restaurant', restaurantSchema);