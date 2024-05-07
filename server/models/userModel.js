const { DataTypes, Sequelize } = require('sequelize')
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    // passwordResetToken: {
    //     type: DataTypes.STRING,
    // },
    // passwordResetExpires: {
    //     type: DataTypes.DATE,
    // },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
},)

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password ,12)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;