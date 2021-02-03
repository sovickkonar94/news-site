const mongoose = require('mongoose');

let count = 0;

const { URI } = require('./config');

const options = {
	useNewUrlParser :true,
	useUnifiedTopology: true,
}

const connect = ()=>{
	mongoose.connect(URI,options)
	.then(()=>console.log('database connected'))
	.catch(err=>{
		count++;
		console.log('Error: ',err.message);
		console.log('connection retry in 5 seconds..')
		setTimeout(connect,5000);
		if(count>5)
			process.exit();
	})
}

module.exports = connect;