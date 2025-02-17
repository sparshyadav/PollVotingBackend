import mongoose, { model} from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: [6, "Password must be of 6 Characters"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is Required"],
        unique: true
    },
    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
    }]
}, { timestamps: true });

export default model('User', userSchema);
