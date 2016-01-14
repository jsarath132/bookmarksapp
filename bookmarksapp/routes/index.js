var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookmarks = mongoose.model('bookmarksfolder');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/bookmarks/search/:q', function(req, res) {
		bookmarks.find({'children.name': req.params.q},function(err, bookmarks) {
			if(err) {
				return console.error(err);
			} else {
				res.json(bookmarks);
			}
		});	
});

router.get('/bookmarks/:id', function(req, res) {
		bookmarks.findOne({'children._id': req.params.id},{"foldername":1,"children.$" : 1} ,function(err, bookmarks) {
			if(err) {
				return console.error(err);
			} else {
				res.json(bookmarks);
			}
		});
});

router.get('/bookmarks', function(req, res) {
	bookmarks.find({},{},{'group':'foldername'},function(err, bookmarks) {
		if(err) {
			return res.send(err);
		} else {
			res.json(bookmarks);
		}
	});
});

//router.params(":q")



router.post('/bookmarks', function(req, res) {
	bookmarks.findOne({'foldername':req.body.foldername}, function(err, bookmark) {
		if(err){ res.send(err); }
		if(bookmark !== null && typeof bookmark.children !== 'undefined') {
			bookmark.children.push({"name":req.body.children[0].name,"url":req.body.children[0].url});
		} else {
			bookmark = new bookmarks();
			bookmark.foldername = req.body.foldername;
			bookmark.children = [{"name":req.body.children[0].name,"url":req.body.children[0].url}];
		}
		bookmark.save(function(err, bookmark) {
			if(err){ res.send(err); }
			res.json(bookmark);
		});
	});
});

router.put('/bookmarks/:id', function(req, res) {
	bookmarks.findOne({'children._id': req.params.id}, function(err, bookmark) {
		if (err) {res.send(err);}
		//var child = {"name":req.body.children[0].name,"url":req.body.children[0].url};
		bookmark.children.id(req.params.id).remove();
		bookmark.save(function(err, bookmark) {
			if (err) {res.send(err);}
			if(bookmark.children.length <= 0) {
				bookmark.remove();
			}
		});
	});
	bookmarks.findOne({'foldername':req.body.foldername}, function(err, bookmark) {
		if (err) {res.send(err);}
		if(bookmark !== null && typeof bookmark.children !== 'undefined') {
			bookmark.children.push({"name":req.body.children[0].name,"url":req.body.children[0].url});
		} else {
			bookmark = new bookmarks();
			bookmark.foldername = req.body.foldername;
			bookmark.children = [{"name":req.body.children[0].name,"url":req.body.children[0].url}];
		}
		bookmark.save(function(err,bookmark) {
			if (err) {res.send(err);}
			res.json([{"status":"success"}]);
		});
	});
});

router.delete('/bookmarks/:id', function(req, res) {
	//res.json(req.body);
	bookmarks.findOne({'children._id': req.params.id}, function(err, bookmark) {
		if (err) {res.send(err);}
		bookmark.children.id(req.params.id).remove();
		bookmark.save(function(err, bookmark) {
			if (err) {res.send(err);}
			if(bookmark.children.length <= 0) {
				bookmark.remove();
			}
			res.json([{"status":"success"}]);
		});
	});
	
});




module.exports = router;
