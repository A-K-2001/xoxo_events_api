const { timeStamp } = require("console");
const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema(

    {
        title:{ type: String, required: true, unique:true},
        desc : { type:String , required:true , },
        Experts : {type:Array, required:true },
        date:{type:Date,required:false},
        participants:{type:Array},
        category:{type:Array,required:true},
        link :{type:String,required:true}
         
    },{timestamps:true}
);

module.exports = mongoose.model("Event",EventSchema);