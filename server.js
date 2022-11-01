const bodyParcer=require('body-parser');
const { MongoClient } = require("mongodb");
var express = require ("express");
var app=express();
app.listen(3001);
let db;
let Students;
let Teachers;
let Users;
let Courses;
let Exams;
let NoteStudent;
let NoteTeacher;
let ToDoListStudent;
let ToDoListTeacher;
const objectId=require('mongodb').ObjectID
const mongoClient=require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbname='ChemSchoolDB';
//------------APIs-------------//
const cors=require('cors');
const corsOptions={
    origin:'http://localhost:4200',
    optionsSuccessStatus:200
}
//npm i core-js
app.use(cors());
// const path = require("path");  
// app.use("/Assets", express.static(path.join("CS.Back/images")));  
//-----------DataBase--------------//
mongoClient.connect(url,(err,client)=>{
    if(err)console.log("Erreur de connexion")
    else {
    db = client.db(dbname)
        console.log("connexion avec Mongodb: ", url);
        console.log(`BD selected est : ${dbname}`);
        Students= db.collection("Students");
        Teachers=db.collection("Teachers");
        Users=db.collection("Users");
        Courses=db.collection("Courses");
        Exams=db.collection("Exams");
        NoteStudent=db.collection("NoteStudent");
        NoteTeacher=db.collection("NoteTeacher");
        ToDoListStudent=db.collection("ToDoListStudent");
        ToDoListTeacher=db.collection("ToDoListTeacher");
}
})

//-----------bodyParcer-------------//
app.use(express.static("assets"));
var session=require('express-session');
const { connect } = require('http2');
app.use(session({secret:'keyboard'}));
app.use(bodyParcer.json());
var session=require('express-session');
app.use(session({secret:'keyboard'}))

//-------------LogInAdmin-----------------//
app.post('/LogIn',function(req,res){
    var user={
        EmailUser:req.body.Email,
        UserPassword:req.body.Password
    }
    console.log('logIn');
    console.log(user);
    db.collection("Users").findOne({Email:user.EmailUser,Password:user.UserPassword}).then(connect=>{
            req.session.connected=connect;
                res.json(connect);
        })
})
//---------------LogOut-------------------//

app.get('/logOut',function(req,res){
    res.json("/LogIn");
})


//-------------------------Super Admin Layout-----------------------///
//-------------AddUser---------------//
app.post("/AddUser",function(req,res){
    Users.insertOne(req.body).then(result=>{
        console.log("successful add users")
        res.json(result)
    }).catch(error=>console.log('error(Add'))
})
//----------View User---------------//
app.get("/ViewUsers",function(req,res){
    Users.find().toArray().then(result=>{
        res.json(result)
    })
})

//-----------Delete User--------------//
app.get("/DeleteUser/:_id",function(req,res){
    var id=req.params._id;
    Users.remove({_id:objectId(id)}).then(deleteUser=>{
        res.json(deleteUser);
    })
})
//-------------Edit User------------------//
     //----------Get Data--------//
    app.get("/getUserData/:_id",function(req,res){ 
    var id=req.params._id;
        Users.findOne({_id:objectId(id)}).then(getData=>{
            console.log(id)
            res.json(getData)
        })
      })
    //----------Update----------//
      app.post("/updateUser",function(req,res){
        var id=req.body._id;
        var query={_id:objectId(id)};
        var newQuery={$set:
        {
            Email:req.body.Email,
            Password:req.body.Password,
            Role:req.body.Role
        }};
        Users.updateOne(query,newQuery,function(err,result){
            if (err) throw err;
            else{
                console.log("updated");
                res.json(newQuery.$set)
            }
        })

      })
//-------------------------Admin Layout-----------------------///
      //----------Teacher--------//
//-----------Add Teacher------------//
app.post('/AddTeacher',function(req,res){
    console.log(req.body)
    Teachers.insertOne(req.body).then(result=>{
        console.log("successful add")
        res.json(result)
    }).catch(error=>console.log('error(Add)'))
})
//-----------View Teacher----------//
app.get("/ViewTeacher",function(req,res){
    db.collection("Teachers").find().toArray().then(result=>{
        res.json(result)
    })
})
//------------Delete-------------//
app.get("/DeleteTeacher/:_id",function(req,res){
    var id=req.params._id;
    db.collection("Teachers").remove({_id:objectId(id)}).then(deleteTeacher=>{
        res.json(deleteTeacher);
    })
})
//------------Edit----------------//
//-----------Get details----------//
app.get("/getDetailsTeacher/:_id",function(req,res){
    var id=req.params._id;
    console.log(id+"hi idd");
    db.collection("Teachers").findOne({_id:objectId(id)}).then(getInfo=>{
        res.json(getInfo);
    })
})
 //----------Update----------//
 app.post("/updateTeacher",function(req,res){
    var id=req.body._id;
    var query={_id:objectId(id)};
    var newQuery={$set:
    {
        First_name:req.body.First_name,
        Last_name:req.body.Last_name,
        Speciality:req.body.Speciality,
        Email:req.body.Email,
        Age:req.body.Age,
        Phone_number:req.body. Phone_number,
        Address:req.body.Address
    }};
    Teachers.updateOne(query,newQuery,function(err,result){
        if (err) throw err;
        else{
            console.log("updated");
            res.json(newQuery.$set)
        }
    })

  }) 
  //----------Student--------//
  //-----------Add Student------------//
  app.post('/AddStudent',function(req,res){
    Students.insertOne(req.body).then(result=>{
          console.log("successful add")
          res.json(result)
      }).catch(error=>console.log('error(Add)'))
  })
  //-----------View Students----------//
  app.get("/ViewStudent",function(req,res){
      db.collection("Students").find().toArray().then(result=>{
          res.json(result)
      })
  })
  //------------Delete-------------//
  app.get("/DeleteStudent/:_id",function(req,res){
      var id=req.params._id;
      db.collection("Students").remove({_id:objectId(id)}).then(deleteData=>{
          res.json(deleteData);
      })
  })
  //------------Edit----------------//
  //-----------Get details----------//
  app.get("/getDetailsTeacher/:_id",function(req,res){
      var id=req.params._id;
      console.log(id+"hi idd");
      db.collection("Students").findOne({_id:objectId(id)}).then(getInfo=>{
          res.json(getInfo);
      })
  })
   //----------Update----------//
   app.post("/updateTeacher",function(req,res){
      var id=req.body._id;
      var query={_id:objectId(id)};
      var newQuery={$set:
      {
          First_name:req.body.First_name,
          Last_name:req.body.Last_name,
          Speciality:req.body.Speciality,
          Email:req.body.Email,
          Age:req.body.Age,
          Phone_number:req.body. Phone_number,
          Address:req.body.Address
      }};
      Students.updateOne(query,newQuery,function(err,result){
          if (err) throw err;
          else{
              console.log("updated");
              res.json(newQuery.$set)
          }
      })
  
    })
     //----------Courses--------//
  //-----------Add Courses------------//
  app.post('/Add_Course',function(req,res){
    Courses.insertOne(req.body).then(result=>{
        console.log("successful add")
        res.json(result)
    }).catch(error=>console.log('error(Add)'))
})
//-----------View Students----------//
app.get("/View_Course",function(req,res){
    
    db.collection("Courses").find().toArray().then(result=>{
        res.json(result)
    })
})
//------------Delete-------------//
app.get("/DeleteCourse/:_id",function(req,res){
    var id=req.params._id;
    db.collection("Courses").remove({_id:objectId(id)}).then(deleteData=>{
        res.json(deleteData);
    })
})
//-------------------------Students Layout-----------------------///
    //----------To Do list--------//
  //-----------Add To Do list------------//
  app.post('/AddToDolist_Student',function(req,res){
    ToDoListStudent.insertOne(req.body).then(result=>{
        console.log("successful add")
        res.json(result)
    }).catch(error=>console.log('error(Add)'))
})
//-----------View To Do list----------//
app.get("/ViewtodoList_Student",function(req,res){
    db.collection("ToDoListStudent").find().toArray().then(result=>{
        res.json(result)
    })
})
//------------Delete-------------//
app.get("/DeletetodoList_Student/:_id",function(req,res){
    var id=req.params._id;
    db.collection("ToDoListStudent").remove({_id:objectId(id)}).then(deleteData=>{
        res.json(deleteData);
    })
})
  //----------Note--------//
  //-----------Add Note------------//
  app.post('/Add_Note_Student',function(req,res){
    NoteStudent.insertOne(req.body).then(result=>{
        console.log("successful add")
        res.json(result)
    }).catch(error=>console.log('error(Add)'))
})
//-----------View Note----------//
app.get("/ViewNote_Student",function(req,res){
    db.collection("NoteStudent").find().toArray().then(result=>{
        res.json(result)
    })
})
//------------Delete-------------//
app.get("/DeleteNoteStudent/:_id",function(req,res){
    var id=req.params._id;
    db.collection("NoteStudent").remove({_id:objectId(id)}).then(deleteData=>{
        res.json(deleteData);
    })
})
 //-----------Get details----------//
 app.get("/getNoteStudent/:_id",function(req,res){
    var id=req.params._id;
    console.log(id+"hi idd");
    db.collection("NoteStudent").findOne({_id:objectId(id)}).then(getInfo=>{
        res.json(getInfo);
    })
})
 //----------Update----------//
 app.post("/updateNoteStudent",function(req,res){
    var id=req.body._id;
    var query={_id:objectId(id)};
    var newQuery={$set:
    {
        Title_Note:req.body. Title_Note,
        Text_Note:req.body.Text_Note,
        Date:req.body.Date,
    }};
    NoteStudent.updateOne(query,newQuery,function(err,result){
        if (err) throw err;
        else{
            console.log("updated");
            res.json(newQuery.$set)
        }
    })

  })
//-------------------------Teacher Layout-----------------------///
    //----------To Do list--------//
  //-----------Add To Do list------------//
  app.post('/AddToDolist_Teacher',function(req,res){
    ToDoListTeacher.insertOne(req.body).then(result=>{
        console.log("successful add")
        res.json(result)
    }).catch(error=>console.log('error(Add)'))
})
//-----------View To Do list----------//
app.get("/ViewtodoList_Teacher",function(req,res){
    db.collection("ToDoListTeacher").find().toArray().then(result=>{
        res.json(result)
    })
})
//------------Delete-------------//
app.get("/DeleteToDoTeacher/:_id",function(req,res){
    var id=req.params._id;
    db.collection("ToDoListTeacher").remove({_id:objectId(id)}).then(deleteData=>{
        res.json(deleteData);
    })
})
  //----------Note--------//
  //-----------Add Note------------//
  app.post('/Add_Note_Teacher',function(req,res){
    NoteTeacher.insertOne(req.body).then(result=>{
        console.log("successful add")
        res.json(result)
    }).catch(error=>console.log('error(Add)'))
})
//-----------View Note----------//
app.get("/ViewNote_Teacher",function(req,res){
    db.collection("NoteTeacher").find().toArray().then(result=>{
        res.json(result)
    })
})
//------------Delete-------------//
app.get("/DeleteNoteTeacher/:_id",function(req,res){
    var id=req.params._id;
    db.collection("NoteTeacher").remove({_id:objectId(id)}).then(deleteData=>{
        res.json(deleteData);
    })
})
 //-----------Get details----------//
 app.get("/getNoteTeacher/:_id",function(req,res){
    var id=req.params._id;
    console.log(id+"hi idd");
    db.collection("NoteTeacher").findOne({_id:objectId(id)}).then(getInfo=>{
        res.json(getInfo);
    })
})
 //----------Update----------//
 app.post("/updateNoteTeacher",function(req,res){
    var id=req.body._id;
    var query={_id:objectId(id)};
    var newQuery={$set:
    {
        Title_Note:req.body. Title_Note,
        Text_Note:req.body.Text_Note,
        Date:req.body.Date,
    }};
    NoteTeacher.updateOne(query,newQuery,function(err,result){
        if (err) throw err;
        else{
            console.log("updated");
            res.json(newQuery.$set)
        }
    })

  })
//----------Exams--------//
  //-----------Add Exams------------//
  app.post('/AddExams',function(req,res){
    Exams.insertOne(req.body).then(result=>{
        console.log("successful add")
        res.json(result)
    }).catch(error=>console.log('error(Add)'))
})
//-----------View Exams----------//
app.get("/ViewExams",function(req,res){
    db.collection("Exams").find().toArray().then(result=>{
        res.json(result)
    })
})
//------------Delete-------------//
app.get("/DeleteExam/:_id",function(req,res){
    var id=req.params._id;
    db.collection("Exams").remove({_id:objectId(id)}).then(deleteData=>{
        res.json(deleteData);
    })
})
 //-----------Get details----------//
 app.get("/getExams/:_id",function(req,res){
    var id=req.params._id;
    console.log(id+"hi idd");
    db.collection("Exams").findOne({_id:objectId(id)}).then(getInfo=>{
        res.json(getInfo);
    })
})
 //----------Update----------//
 app.post("/updateExams",function(req,res){
    var id=req.body._id;
    var query={_id:objectId(id)};
    var newQuery={$set:
    {
        course:req.body.course,
        Date:req.body.Date,
        Duration:req.body.Duration,
        Description1:req.body.Description1,
        Description2:req.body.Description2,
        Description3:req.body.Description3,
    }};
    Exams.updateOne(query,newQuery,function(err,result){
        if (err) throw err;
        else{
            console.log("updated");
            res.json(newQuery.$set)
        }
    })

  })
