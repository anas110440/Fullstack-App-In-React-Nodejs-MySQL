const express = require("express");
const app = express();
const db = require('./models');
const cors = require("cors");

app.use(express.json())
app.use(cors())

// Routers

const postRouter = require('./routes/Posts');
app.use('/posts',postRouter)


const commentsRouter = require('./routes/Comments');
app.use('/comments',commentsRouter)


const usrsRouter = require('./routes/Users');
app.use('/auth',usrsRouter)

const likesRouter = require('./routes/likes');
app.use('/like',likesRouter)


db.sequelize.sync().then(()=>{
  
  app.listen(3001, ()=>{
    console.log("Server Running On Port 3001");
  })
  
})