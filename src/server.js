import express from 'express'

///// 서버 만들기
const PORT = 4000
const app = express() // express 앱 만듬
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`)
app.listen(PORT, handleListening) // (listen할 port, callback)
