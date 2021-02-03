const router = require('express').Router();

router.get('/',(req,res)=>{
	res.json({
		error:false,
		message:'server is up and running'
	})
})

router.use('/api',require('./news.route'));

module.exports = router;