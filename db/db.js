const { default: mongoose, model } = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.mongoose_url).then(() => {
    console.log('Connected to MongoDB')
}).catch(() => {
    console.log('Error connecting to MongoDB')
    process.exit(1)  
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "required"]
    },
    password: {
        type: String,
        required: [true, "required"]
    }


})


const User = mongoose.model('User', UserSchema);
module.exports = User;