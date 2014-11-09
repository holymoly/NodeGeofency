/*
 * catch geofency Webhook
 */
var couch  = require('../couch/couch');

var couchClient = new couch('http://127.0.0.1.35:5984','root','relax');


exports.receive = function(req, res){
  console.log(req.body);

  couchClient.postDb('geofency',req.body,function(err,response,conflict){
    if (err) {
     res.end(err);
    }else{
      console.log(response);
      res.end('It worked!');
    }
  });
};
