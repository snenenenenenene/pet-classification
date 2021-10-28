let express = require('express')
let app = express();

app.use(function(req,res,next) {
  console.log(`${new Date()} - ${req.method} request for ${req.url}`);
  next();
})

app.use(express.static('./assets'))

app.listen(8080, function() {
  console.log("serving app on 8080")
})