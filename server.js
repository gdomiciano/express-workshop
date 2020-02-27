var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

app.use(formidable());
app.use(express.static("public"));

var previousPosts = {}
app.get("/get-posts", function (req, res) {
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var parsedFile = JSON.parse(file);
    res.send(parsedFile)
    previousPosts = JSON.parse(file);
  });
});

app.post('/create-post', function (req, res) {
  var timestamp = Date.now()
  var newPost = { [timestamp]: req.fields.blogpost }
  var updatedPosts = JSON.stringify(Object.assign(previousPosts, newPost))

  fs.writeFile(__dirname + '/data/posts.json', updatedPosts, function (error) {
    if (error) console.log(error)
  });

  res.send(newPost)

})

app.listen(4000, function () {
  console.log('Server is listening on port 4000. Ready to accept requests!');
});
