const express =require('express');
const bodyparser =require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors =require('cors');
const knex = require('knex')
const db=knex({
  client: 'PostgreSQL 10',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'cate',
    database : 'finalproject'
  }

});

//postgres.select('*').from('login').then(data=>{
//	console.log(data);
//	});



const app=express();

app.use(cors());

app.use(bodyparser.json());


const database= {
	users:[
	{
		id:'100',
		name:'George',
		email:'george@gmail.com',
		password:'12345',
		entries:0,
		joined:new Date()
	},
	{
	    id:'101',
		name:'Diana',
		email:'diana@gmail.com',
		password:'54321',
		entries:0,
		joined:new Date()
	}
	]
}

app.get('/', (req,res)=>{
	res.json(database.users)
})

app.post('/signin',(req,res)=>{
	if(req.body.email===database.users[0].email && req.body.password===database.users[0].password){
		res.json('success');
	}else{
		res.status(404).json(alert('oops wrong Email and password'))
	}
})

app.post('/register',(req,res)=>{
	const {name,email,password}=req.body;
	//bcrypt.hash(password, null, null, function(err, hash) {
    //console.log(hash)
    db('users').insert({
       email:email,
       name:name,
       joined:new Date()
    }).then(console.log)
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=>{
	const {id}=req.params;
	let found=false;
	database.users.forEach(user=>{
		if(user.id=== id){
			found=true;
			 return res.json(user);
		}
	})
		if(!found){
		res.status(404).json('invalid user')
	}
})

app.put('/image',(req,res)=>{
	const {id}=req.body;
	let found=false;
	database.users.forEach(user=>{
		if(user.id=== id){
			found=true;
			user.entries++
			 return res.json(user.entries);
		}
	})
		if(!found){
		res.status(404).json('invalid user')
	}
})
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });







app.listen(3001)
