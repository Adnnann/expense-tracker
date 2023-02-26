import mongoose from 'mongoose'
import crypto from 'crypto'
import mongooseUniqueValidator from 'mongoose-beautiful-unique-validation'
import validate from 'mongoose-validator'

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Please enter valid email address '
    })
]

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:'First name is required',
        trim: true,
    },
    lastName:{
        type:String,
        required:'Last name is required',
        trim: true,
    },
    email:{
        type:String,
        unique:'Email already exists.',
        required:'Email is required',
        validate: emailValidator
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password:{
        type:String,
        required: 'Password is required'
    },
    salt:String
})

UserSchema.virtual('password')
.set(function(password){
    this._password = password,
    this.salt = this.makeSalt(),
    this.hashed_password = this.encryptPassword(password)
})

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return err
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}
// Validate password length
UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password', 'Password must be at least 6 characters')
    }
}, null)
// Validate if first name and last name include only letters (no numbers or special characters)
UserSchema.path('firstName').validate(function(v){
    if(this.firstName.match(/[0-9!@#\$%\^\&*\)\(+=._-]+$/g)){
        this.invalidate('firstName', 'First name can include only letters')
    }else{
        this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase()
        console.log(this.firstName)
    }
}, null)

UserSchema.path('lastName').validate(function(v){
    if(this.lastName.match(/[0-9!@#\$%\^\&*\)\(+=._-]+$/g)){
        this.invalidate('lastName', 'Last name can include only letters')
    }else{
        this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase()
        console.log(this.lastName)
    }
}, null)
// Validate if email is unique
UserSchema.path("email").validate(async function (email) {
    const user = await this.constructor.findOne({ email });
    if (user) {
      if (this.id === user.id) {
        return true;
      }
      return false;
    }
    return true;
  }, "Email already exists!");
  
mongoose.set('strictQuery', true)
export default mongoose.model('User', UserSchema)
