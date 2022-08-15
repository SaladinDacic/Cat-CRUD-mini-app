var express         = require("express"),
    app             = express(),
    methodOverride  = require("method-override");
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");


mongoose.connect("mongodb://localhost/cats_test_app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// APP CONFIG  
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE MODEL CONFIG

// title
// image
// body
// created/Date

var catSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Cat = mongoose.model("Cat", catSchema);

//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................

/* Cat.create({
    title: "Quqi",
    image: "https://media2.fdncms.com/orlando/imager/u/original/25770336/p1769397_3391580689_5.jpg",
    body: "This is test for creating database",
});
 */
app.get("/", function(req, res){
    res.redirect("/cats");
});


app.get("/cats", function(req, res){
    Cat.find({}, function(err, cats){
        if(err){
            console.log(err);
        }else{
            res.render("index", {cats: cats});
        };
    });
});




app.get("/cats/new", function(req, res){
    res.render("new");
});


app.post("/cats", function(req, res){
    Cat.create(req.body.cats, function(err, newCat){
        if(err){
            console.log(err);
            res.redirect("cats");
        }else{
            res.redirect("cats");
        };
    });
});

app.get("/cats/:id", function(req, res){
    Cat.findById(req.params.id, function(err, idOfCat){
        if(err){
            res.redirect("/cats");
        }else{
            res.render("show", {cat: idOfCat});
        }
    });
});

app.get("/cats/:id/edit", function(req, res){
    Cat.findById(req.params.id, function(err, idOfCat){
        if(err){
            res.redirect("/cats");
        }else{
            res.render("edit", {cat: idOfCat});
        }
    });
});

app.put("/cats/:id", function(req, res){
    Cat.findByIdAndUpdate(req.params.id, req.body.cat, function(err, updatedCat){
        if(err){
            res.redirect("/cats");
        }else{
            res.redirect("/cats/" + req.params.id);
        }
    });
});

app.delete("/cats/:id", function(req, res){
    Cat.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/cats");
        }else{
            res.redirect("/cats");
        }
    });
});




//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................
//......................................................................................................................................


app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server started!");
});