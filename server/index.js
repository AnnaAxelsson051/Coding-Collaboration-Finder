const PORT = 8000

const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')

const uri = 'mongodb+srv://aaxelsson51:belsebub@cluster0.tawi6z0.mongodb.net/?retryWrites=true&w=majority'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
res.json('Test')
})

app.post('/signup', async (req,res) =>{
    const client = new MongoClient(uri)
    const{email, password} = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        /*check by email if user allready exists*/
        const existingUser = await users.findOne({email})
        if (existingUser){
            return res.status(409).send('User already exists. Please log in ')
        }

       /*save email to db in lowercase*/
       const sanitizedEmail =  email.toLowerCase()

        /*make a data object assign values to it and insert*/
        const data ={
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = await users.insertOne(data)

        /*generate a token that expires in 24 hrs so see that we re logged in*/
        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        })

        res.status(201).json({token, userId: generatedUserId})
        /*res.status(201).json({token})*/
    }catch (err){
        console.log(err)
    }
})

app.post('/login', async( req, res) =>{
    const client = new MongoClient(uri)
    const {email,password} = req.body

    try{
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const user = await users.findOne({email})

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

    if(user && correctPassword){
    const token = jwt.sign(user,email, {
        expiresIn: 60 * 24
    })
       res.status(201).json({token, userId: user.user_id})
           /* res.status(201).json({token})*/
    }
    res.status(400).send('Invalid Credentials')
    }catch(err){
        console.log(err)
    }

})

/*populate data find it by user id*/
app.get('/user', async (req,res) =>{
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        /*find one user based on the query and send back*/
        const query ={user_id: userId}
        const user = await users.findOne(query)
        res.send(user)
    }finally {
        await client.close()
    }
})

/*filtering by gender*/
app.get('/gendered-users', async (req,res) =>{
    const client = new MongoClient(uri)
    const gender = req.query.gender

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {gender_identity: {$eq : gender}}
        const foundUsers = await users.find(query).toArray()

        res.send(foundUsers)
    }finally{
        await client.close()
    }
})

app.put('/user', async(req, res) =>{
    const client = new MongoClient(uri)
    const formData = req.body.formData

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        /*find the user with user id we passed*/
        const query = {user_id: formData.user_id}
        const updateDocument ={
            $set:{
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches


            },
        }
        /*update db with inserted user*/
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)
    }finally{
        await client.close
    }
})

/*Find user and update user with their mateches array*/
app.put('/addmatch', async (req,res) => {
    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        /*update matches array*/
        const query = { user_id: userId}
        const updateDocument = {
            $push: {matches: {user_id: matchedUserId}},
            }
            const user = await users.updateOne(query, updateDocument)
    res.send(user)
    }finally{
        await client.close()
    }
})







app.listen(PORT, () => console.log('Server running on port ' + PORT))