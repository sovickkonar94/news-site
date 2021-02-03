const News = require('../models/News');
const NewsApi = require('newsapi');
const { KEY } = require('../config/config');
const newsApi = new NewsApi(KEY);

const top = async(req,res)=>{

	try{

		let checkNews = await News.findOne({isTop:true});
		if(checkNews){
			// console.log(checkNews)
			let newsDate =  new Date(checkNews.createdAt);
			let currentDate = new Date();
			let todayStart = new Date(currentDate.getFullYear() , currentDate.getMonth(), (currentDate.getDate()),6);
			let parsedNewsDate = newsDate.getTime();
			let parsedTodayStart = todayStart.getTime();
			if(parsedNewsDate > parsedTodayStart){

				console.log('current news')
				let topNews = await News.find({isTop:true});
				return res.json({
					news:topNews
				})
			}
			else{
				console.log('old news');

				//FirstDelete old news
				let deletedNews = await News.deleteMany({topNews:true});

				let news = await newsApi.v2.topHeadlines({
		  			language: 'en',
		  			country: 'us',
		  			pageSize:100
				});
				let  saveNews = news.articles.map((news)=>{
					let storeNews = new News({
						source_id: news.source.id,
						author : news.author,
						title : news.title,
						url : news.url,
						image : news.urlToImage,
						content : news.content,
						isTop : true,
					})
					return storeNews
				})
				let sendNews = saveNews.map((news)=>{
					return new Promise((resolve,reject)=>{
						news.save((err,res)=>{
							if(err){
								reject(err)
							}else{
								resolve(res);
							}
						})
					})
				})


				Promise.all(sendNews).then((results)=>{
					return res.json({
						news:results
					})
				},(err)=>{
					throw new Error('unable to fetch top news headlines');
				})
			}
		}

	}catch(err){
		return res.json({
			error:true,
			message:err.message
		})
	}

}



const search = async(req,res)=>{
	try{

		let queryItem = req.body.query;
		// let sources = req.body.sources.toString();
		let source = [];
		if(req.body.cnn)
			source.push('cnn');
		if(req.body.bbcnews)
			source.push('bbc-news')
		if(req.body.abcnews)
			source.push('abc-news')
		if(req.body.bbcsports)
			source.push('bbc-sports')
		if(req.body.espn)
			source.push('espn')
		if(req.body.buzzfeed)
			source.push('buzzfeed')
		if(req.body.businessinsider)
			source.push('business-insider');

		let sources = source.toString();


		// console.log(req.body);
		// return res.json({
		// 	query:queryItem,
		// 	sources:sources
		// })

		let newsAvailable = await News.findOne({query:queryItem});
		if(newsAvailable){
			//news available in the database
			console.log('news available in database');

			let provideNews = await News.find({query:queryItem});
			return res.json({
				error:false,
				news:provideNews
			})

		}else{
			//save the news in the database
			console.log('save the news');

			let searchedNews = await newsApi.v2.everything({
				q:queryItem,
				sources:sources,
				language:'en',
				sortBy: 'relevancy',
	  			pageSize:100

			})

			let newsArray = searchedNews.articles.map(news=>{
				return new News({
					source_id: news.source.id,
					author : news.author,
					title : news.title,
					url : news.url,
					image : news.urlToImage,
					content : news.content,
					query:queryItem
				})
			})

			let newsToSave = newsArray.map(news=>{
				return new Promise((resolve,reject)=>{
					news.save((err,result)=>{
						if(err){
							reject(err);
						}else{
							resolve(result);
						}
					})
				})
			})


			Promise.all(newsToSave).then((results=>{
				res.json({
					error:false,
					news:results
				})
			}))

		}
	
	}catch(err){
		return res.json({
			error:true,
			message:err.message
		})
	}

}

module.exports = {
	top,
	search
}