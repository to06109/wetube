import express from 'express'

///// 서버 만들기
const PORT = 4000
const app = express() // express 앱 만듬

///// 서버의 request 설정
// req, res: express한테서 받은 object
const handleHome = (req, res) => {
  return res.send('<h1>Hi!!!!!</h1>') // request를 종료시킴
}

const handleLogin = (req, res) => {
  return res.send({ message: 'Login Here.' })
}
app.get('/', handleHome)
app.get('/login', handleLogin)

///// 외부 접속 listen
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`)
app.listen(PORT, handleListening) // (listen할 port, callback)
