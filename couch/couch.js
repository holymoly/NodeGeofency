var request = require('request');
var config = require('../config');

//Constructor
function Couch(){
  this.url  = config.couchUrl;
  this.user = config.couchUser;
  this.pass = config.couchPass;
}

//*****************************************************
//*             Call the couch                        *
//*****************************************************
function requestCouch(url,type,method,data,destination,cb){
  var contentLength = 0;
  if(data !== undefined){
    data = JSON.stringify(data);
    var contentLength = data.length;
  }
  //Returns the welcome message and version information
  request({
    headers: {
      'Accept': 'application/json',
      'Content-Length': contentLength,
      'Content-Type': 'application/json',
      'Destination': destination,
    },
    uri: url + type,
    body: data,
    method: method
  }, function (err, res, body) {
    if (err) {
      cb(err,undefined);
    }
    if (!err && res.statusCode == 200) {
      cb(undefined,JSON.parse(body));
    }
    if (!err && res.statusCode == 404) {
      cb(undefined,JSON.parse(body));
    }
    //revision conflict
    if (!err && res.statusCode == 409) {
          cb(undefined,JSON.parse(body),{conflict:true});
    }
    if (!err && res.statusCode == 201) {
      cb(undefined,JSON.parse(body));
    }
  });
}

//Returns the special security object for the database
Couch.prototype.getDbDocid = function(db,docid,cb){
  requestCouch(this.url,'/' + db + '/' + docid,'GET',undefined,undefined,function(err,response){
    cb(err,response);
  });
};

//Creates document in db
Couch.prototype.postDb = function(db,data,cb){
  requestCouch(this.url,'/' + db,'POST',data,undefined,function(err,response){
    cb(err,response);
  });
};

module.exports = Couch;
