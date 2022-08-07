import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    // create: must receive user's and chat's "_id"
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    date: Date,
    file: String,
});

const model = mongoose.model('Message', mySchema);

export default model;