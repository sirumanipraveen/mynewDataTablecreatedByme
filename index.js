const express = require('express')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

app.use(express.json())
const path = require('path')

const dbPath = path.join(__dirname, 'cricket.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

app.post('/plyaers', async (request, response) => {
  const selctqury = `
  CREATE TABLE playerss(
    name VARCHAR(200),
    age INT,
    score INT
  );`
  const dbre = await db.all(selctqury)
  response.send(dbre)
})

app.post('/player/', async (request, response) => {
  const playerDetails = request.body
  const {name, age, score} = playerDetails
  const getBooksQuery = `
    INSERT INTO
  playerss (name, age, score)
VALUES(
    "${name}",
    "${age}",
    "${score}")`
  const dbResponse = await db.run(getBooksQuery)
  const bookId = dbResponse.lastID
  response.send({bookId: bookId})
})

//getvalues 

app.get("/playesss/",async (request,response)=>{
  const getquesryfrotable = `
  SELECT * FROM playerss;
  `
})
