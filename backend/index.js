const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportMiddleware = require('./middleware/passport')
const AuthRouter = require('./routes/AuthRouter')
const UserRouter = require('./routes/UserRouter')
const ApplicationRouter = require('./routes/ApplicationRouter')
const MongoClient = require('./MongoClient')

const app = express()
const PORT = 8000

// allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(passport.initialize())
passportMiddleware(passport)

// parse data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/application', ApplicationRouter)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port`)
})

MongoClient.connect()
