var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Url = "mongodb://localhost:27017"
var port = 2000;
var app = express();
var cors = require('cors');
var dbs;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/userdata', function (req, res) {
    console.log(req.body);
    var rbody = req.body;
    rbody.date = new Date();
    console.log("qqqqq", rbody)
    MongoClient.connect(Url, (err, conn) => {
        var dbs = conn.db('Userlist');
        dbs.collection('Userlist').save(rbody);
        var obj = { status: "success" };
        res.json(obj)
        res.end();
    })

}),

    app.post('/saveData', function (req, res) {
        console.log(req.body);
        MongoClient.connect(Url, (err, conn) => {
            var dbs = conn.db('Userlist');
            var result = dbs.collection('Userlist').save({ "EnterName": req.body.EnterName, "UserName": req.body.UserName, "Password": req.body.password, "email": req.body.email, "city": req.body.city, "gender": req.body.gender, "contact": req.body.contact, "hobbies": req.body.hobbies, "animalControl": req.body.animalControl });
            dbs.collection('Userlist').find();
        })
    })

app.post('/authenticate', function (req, res) {
    console.log("login");
    console.log(req.body.username);
    MongoClient.connect(Url, (err, conn) => {
        var dbs = conn.db('Userlist');

        var result = dbs.collection("Userlist").find({ "UserName": req.body.username, "Password": req.body.password });//display data
        //console.log(result);    
        result.toArray(function (err, data) {

            console.log("data: ", data);

            if (data.length) {
                res.send('success');
            }
            else {
                res.send('fail');
            }
        });

    })
});

// app.get('/getInfo/:pageIndex/:pageSize', function(req,res){
//     console.log('aaa');
//     MongoClient.connect(Url, function(err, conn){

//             console.log("Database connected");
//             dbs = conn.db('Userlist');
//             dbs.collection("Userlist").find({}).toArray(function(err, data){
//                 if (err) throw err;
//                 console.log(data);
//                 res.send(data);
//                });

//     });

// });
app.get('/getInfo/:pageIndex/:pageSize', function (req, res) {
    // console.log("getinfo");
    // console.log("pageIndex", req.params.pageIndex);
    // console.log("pageSize",req.params.pageSize);
    MongoClient.connect(Url, function (err, conn) {
        if (err) throw err;
        dbs = conn.db('Userlist');
        var page = req.params.pageIndex || 1;
        var size = parseInt(req.params.pageSize) || 3;
        var start = ((parseInt(page) + 1) - 1) * (size)
        var pageIndex = parseInt(req.params.pageIndex);
        var count = dbs.collection("Userlist").find().count().then(function (numItems) {
            console.log("qqq", numItems);
            let result = dbs.collection("Userlist").find().skip(page * size).limit(size).toArray(function (err, data) {
                if (err) throw err;
                //    console.log("send:",data);
                res.send({ data: data, pageIndex: pageIndex, pageSize: size, count: numItems });
            });

        });
    })
});

app.get('/getInfo/:pageIndex/:pageSize/:colname/:direction', function(req, res){
    console.log("angad",req.params.colname);
    console.log("angad1",req.params.direction);
    MongoClient.connect(Url, function(err, conn){
        if (err) throw err;
        dbs = conn.db('Userlist');
        var page = req.params.pageIndex || 1;
        var size = parseInt(req.params.pageSize) || 3;
        var start = ((parseInt(page) + 1) - 1) * (size)
        var pageIndex = parseInt(req.params.pageIndex);
        var count = dbs.collection("Userlist").find().count().then(function (numItems) {
            console.log("qqq", numItems);
            let result = dbs.collection("Userlist").find().sort().skip(page * size).limit(size).toArray(function (err, data) {
                if (err) throw err;
                //    console.log("send:",data);
                res.send({ data: data, pageIndex: pageIndex, pageSize: size, count: numItems });
            });

        });
    });
});



app.get('/:pageIndex/:pageSize/:filterValue', function (req, res) {
    console.log("FILTER:", req.params.pageIndex, req.params.pageSize, req.params.filterValue);
    var str = req.params.filterValue;

    MongoClient.connect(Url, function (err, conn) {
        var result2 = [];
        var dbs = conn.db('Userlist');
        if (str == 'nodata') {
            console.log("rtrtrtr")
            var result = dbs.collection("Userlist").find();
            result.toArray(function (err, data) {
                if (err) throw err;
                res.send(data)
            });
        }
        else {
            var result = dbs.collection("Userlist").find({ 'EnterName': { $regex: str } });
            result.toArray(function (err, data) {
                if (err) throw err;
                res.send(data)
            });
        }
    });
});

app.get('/delete/:userid', function (req, res) {
    console.log('bbb', req.params.userid);
    MongoClient.connect(Url, function (err, conn) {
        if (err) throw err;
        dbs = conn.db('Userlist');
        //"_id" : ObjectId(req.params.userid);

        dbs.collection("Userlist").deleteOne({ "_id": ObjectId(req.params.userid) }, function (err, data) {
            if (err) throw err;
            console.log('deleted');
            res.send(data);
        })
    })

    app.get('/edit/:userid', function (req, res) {
        console.log('top');
        MongoClient.connect(Url, function (err, conn) {
            if (err) throw err;
            dbs = conn.db('Userlist');
            dbs.collection("Userlist").updateOne({ "_id": ObjectId(req.params.userid) }, function (err, data) {
                if (err) throw err;
                console.log('edited');
                res.send(data);
            });
        })
    });
});

app.put('/updateData/:userid', function (req, res) {
    console.log('sss', req.body);
    MongoClient.connect(Url, function (err, conn) {
        if (err) throw err;
        dbs = conn.db('Userlist');
        var myquery = { "_id": ObjectId(req.params.userid) };
        var newvalues = { $set: { EnterName: req.body.EnterName, UserName: req.body.UserName, email: req.body.email, gender: req.body.gender, contact: req.body.contact, city: req.body.city, animalControl: req.body.animalControl } };
        dbs.collection("Userlist").updateOne(myquery, newvalues, function (err, data) {
            if (err) throw err;
            console.log('updated');
            res.send(data);
        })
    })
});

app.listen(port, function () {
    console.log("listen at :", +port);
})

// app.get('/userlist', function(req,res){
//     console.log('aaa');
//     MongoClient.connect(Url, function(err, conn){

//             console.log("Database connected");
//             dbs = conn.db('User');
//             dbs.collection("info").find({}).toArray(function(err, data){
//                 if (err) throw err;
//                 console.log(data);
//                 res.send(data);
//                });

//     });

// });

// app.get('/delete/:userid', function(req, res){
//     console.log('bbb',req.params.userid);
//     MongoClient.connect(Url, function(err, conn){
//         if(err) throw err;
//         dbs=conn.db('User');
//         //"_id" : ObjectId(req.params.userid);

//         dbs.collection("info").deleteOne({"_id" : ObjectId(req.params.userid)}, function(err, data){
//             if (err) throw err;
//             console.log('deleted');
//             res.send(data);
//         })
//     })
// });

// app.get('/edit/:userid', function(req, res){
//     console.log('top');
//     MongoClient.connect(Url, function(err, conn){
//         if(err) throw err;
//         dbs = conn.db('User');
//         dbs.collection("info").updateOne({"_id": ObjectId(req.params.userid)}, function(err, data){
//             if (err) throw err;
//             console.log('edited');
//             res.send(data);
//         });
//     })
// });


// app.get('/getInfo/:pageIndex/:pageSize', function(req, res){
//     console.log("getinfo");
//     console.log("pageIndex", req.params.pageIndex);
//     console.log("pageSize",req.params.pageSize);
//     MongoClient.connect(Url, function(err, conn){
//         if (err) throw err;
//         dbs = conn.db('User');
//         var page = req.params.pageIndex || 1;
//         var size = parseInt(req.params.pageSize) || 3;
//         var start = ((parseInt(page)+1) - 1) *(size)
//          var pageIndex = parseInt(req.params.pageIndex)+1;
//         var count =  dbs.collection("info").find().count().then(function(numItems){
//         console.log("qqq",numItems);
//         let result = dbs.collection("info").find().skip(page*size).limit( size ).toArray(function(err,data)
//         {
//            if (err) throw err;
//            console.log(data);
//            res.send({data:data,pageIndex:pageIndex,pageSize:size, count:numItems});
//         });

//         });
//     })
// });

// app.get('/getInfo1/:pageIndex/:pageSize/:colname/:direction', function(req, res){
//     console.log("angad");
//     MongoClient.connect(Url, function(err, conn){
//         if (err) throw err
//         dbs = conn.db('User');
//         var active = req.params.colname;
//         var action = req.params.direction;
//         if(active=='asc'){
//             var mySort = { [active]:1 };
//         }
//         else{
//             var mySort = { [active]:-1 };
//         }

//         console.log("mySort",mySort);
//         dbs.collection("info").find().sort(mySort).toArray(function(err, data) {
//             if (err) throw err;
//             console.log("Sort",data);
//             //db.close();
//           });
//     });
// });


// app.put('/updateData/:userid', function(req, res){
//     console.log('sss',req.body);
//     MongoClient.connect(Url, function(err, conn){
//         if(err) throw err;
//         dbs = conn.db('User');
//         var myquery = { "_id": ObjectId(req.params.userid)};
//   var newvalues = { $set: {id: req.body.id, first_name: req.body.first_name, last_name:req.body.last_name } };
//         dbs.collection("info").updateOne(myquery, newvalues, function(err, data){
//             if(err) throw err;
//             console.log('updated');
//             res.send(data);
//         })
//     })
// });

// app.listen(port, function(){
//     console.log("listen at :",+port);
// })