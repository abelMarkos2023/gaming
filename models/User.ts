import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    secure_url: {required: true, type: String},
    public_id: {required: true,type: String}
})

const userSchema = new mongoose.Schema({
    username:{type: String,required:true,unique: true},
    email:{type: String,required: true,unique: true},
    password: {type: String,required: true},
    bio:{type: String,default: "No Bio"},
    avatar: ImageSchema,
    whishList: [{type: String}],
    gameReview: [{type: mongoose.Schema.Types.ObjectId,ref:"GameReview"}],
    topTen:[{type: String,max:10}],
    createdAt:{type: Date,default: Date.now}
})

const User = mongoose.models.User || mongoose.model('User',userSchema);
export default User; 