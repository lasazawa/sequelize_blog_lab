var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    db = require('./models/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Home
app.get('/', function(req, res) {
    db.Post.findAll().done(function(err, posts) {
        console.log(posts);
        res.render('home', {allPosts:posts});
    });
});

//New blog
app.get('/new', function(req, res){
    db.Author.findAll().done(function(err,authors){
        res.render('new', {title:"", blog:"",authors:authors});
    });


});

//Author
app.get('/author',function(req,res) {
    res.render('author');
});

app.post('/author', function(req,res) {
    var name = req.body.author.name;
    var authorId = req.body.author.id;
    db.Author.create({
        name: name,
        authorId: authorId
    }).done(function(err,success) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

//Create blog
app.post('/new', function(req, res) {
    var title = req.body.post.title;
    var blog = req.body.post.blog;
    var authorId = req.body.author.id;
    var author = req.body.author.name;
    console.log("clicked save");
    db.Post.create({
        title:title,
        blog:blog,
        AuthorId: authorId
    }).done(function(err, success) {
        if (err) {
            console.log(err);
            var errMsg = "Error here, yo";
            res.render('new', {errMsg:errMsg, title:title, blog:blog, author:author});
        }
        else {
            res.redirect('/');
        }
    });
});

//Edit
app.get('/posts/:id/edit',function(req,res) {
    db.Post.find(req.params.id).done(function(err, post) {
        res.render('edit', {post:post});
    });
});

//Update
app.put('/posts/:id', function(req,res) {
    var id = req.params.id;
    var title = req.body.post.title;
    var blog = req.body.post.blog;
    var authorId = req.body.author;
    db.Post.find(id).dont(function(err, post) {
        post.updateAttributes({
            title: title,
            blog: blog,
            AuthorId: authorId
        }).done(function(err) {
            res.redirect('/');
        });
    });
});

//Delete
app.delete('/:id',function(req,res) {
    var id = req.params.id;
    db.Post.find(id).done(function(err, post) {
        post.destroy().done(function(err) {
            res.redirect('/');
        });
    });
});


var server = app.listen(3333, function() {
    console.log('Listening on port 3333', server.address().port);
});