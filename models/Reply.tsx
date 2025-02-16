import mongoose from 'mongoose';


const replySchema = new mongoose.Schema({
    reviewId:{type: mongoose.Schema.Types.ObjectId,ref: 'GameReview',required:true,unique: true},
    userId: {required: true,type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    
    replyText: {type: String,required:true},
   
    likes:[{type: mongoose.Schema.Types.ObjectId,ref:'User',unique: true}],
    createdAt:{type: Date,default: Date.now}
})

const ReplySchema = mongoose.models.ReplySchema || mongoose.model('ReplySchema',replySchema);
export default ReplySchema; 