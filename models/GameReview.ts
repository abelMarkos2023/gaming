import mongoose from 'mongoose';


const gameSchema = new mongoose.Schema({
    gameId:{type: String,required:true,unique: true},
    userId: {required: true,type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    whishList: [{type: String}],
    textReview: {type: String,required:true},
    ratting:{type: Number,min: 0 ,ax: 10},
    likes:[{type: mongoose.Schema.Types.ObjectId,ref:'User',unique: true}],
    createdAt:{type: Date,default: Date.now}
})

const GameReview = mongoose.models.GameReview || mongoose.model('GameReview',gameSchema);
export default GameReview; 