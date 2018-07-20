const MongoClient = require('mongodb').MongoClient;


module.exports  = (req,res,next)=>{
    MongoClient.connect('mongodb://sa:liaqat@ds255309.mlab.com:55309/quotes',(err,client)=>{
        if(err) return console.log(err);
        req.db = client.db('quotes');
        next();

        });
}

// module.exports = function (req, res, next) {
//     req.requestTime = Date.now()
//     next()
//   }




