var fs = require('fs');


module.exports.data = function(req, res){
  fs.readFile('src/client/public/combined.json', 'utf-8',function(err, data){
    if (err) {
      res.status(201).send(data)
    } else {
      res.status(200).send(data);
    }
  });
};