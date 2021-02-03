const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = Schema({
	source_id:{
		type:String
	},
	author:{
		type:String
	},
	title:{
		type:String
	},
	url:{
		type:String
	},
	image:{
		type:String
	},
	content:{
		type:String
	},
	isTop:{
		type:Boolean,
		default:false
	},
	query:{
		type:String
	}
},{timestamps : true});

module.exports = mongoose.model('news',NewsSchema);