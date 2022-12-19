import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        dateOfBirth: {
            type: String,
        },
        userStatus: {
            type: String,
            enum: ['Hoạt động', 'Không hoạt động'],
        },
    },
    { timestamps: true },
)

const userModel = mongoose.model('wireframes', userSchema)

export default userModel
