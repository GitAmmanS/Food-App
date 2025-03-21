 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }, 
    userState:{
        type:String,
        default:"manager"
    }
});

module.exports = mongoose.model('users', userSchema);
