// 필요한 것들 미리 import, import에 이상이 없으면 app을 실행
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

// Listen external connections
const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
