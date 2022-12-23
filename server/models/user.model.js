const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, 'Username is required to register'],
        minLength: [6, 'Username must be at least 6 characters'],
        maxLength: [12, 'Username cannot exceed 12 characters']
    },
    email: {
        type:String,
        required:[true, 'An email is required'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password:{
        type: String,
        required: [true, "A password is required"],
        minLength:[8, "Password must be at least 8 characters long"],
        maxLength:[20, "Password cannot exceed 20 characters, You will surely forget it"]
    },
},{timestamps:true})

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model('Users', UserSchema);
module.exports = User;