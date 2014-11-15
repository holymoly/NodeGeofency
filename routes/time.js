/*
 * catch geofency Webhook
 */
var couch  = require('../couch/couch');
var couchClient = new couch();

exports.receive = function(req, res){
  console.log(req.body);

  couchClient.postDb('geofency',req.body,function(err,response,conflict){
    if (err) {
      res.end(err);
    }else{
      res.end('It worked!');
    }
  });
};
