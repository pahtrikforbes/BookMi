const mongoose = require('mongoose');
const { Schema } = mongoose;

const appoinmentSchema = new Schema({
    user: String, //{type: Schema.Types.ObjectId, ref: 'users'},
    date: { type: Date, default: Date.now },
    time: String,
    status: {type: String, default: 'pending'}
}, { collation: { locale: 'en_US', strength: 1 }, timestamps: true });

appoinmentSchema.index({user: 1})
mongoose.model("appointments",appoinmentSchema)