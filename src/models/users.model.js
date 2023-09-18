import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    userMail: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userPassword: {
        type: String,
        trim: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    userRoll : {
        type: String,
        required: true,
    }
},
{
    strictPopulate: false
})

userSchema.pre('findOne', function () {
    this.populate('cartId').populate({
        path: 'cartId',
        populate: [
            {path: 'products.productId'}
        ]
    })
})

const User = mongoose.model('User', userSchema)

export default User