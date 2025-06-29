const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/Task");
const dbConnect = require("./config/database");
const path = require("path");
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"https://task-manager-5ca3.onrender.com",
		credentials:true,
	})
)

dbConnect.connect();


const _dirname = path.resolve();

app.use("/api/auth",userRoutes);
app.use("/api/auth",taskRoutes);

app.use(express.static(path.join(_dirname,"/Client/dist")));
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(_dirname,"Client","dist","index.html"));
});

app.get('/', (req, res)=>{
    res.send('hello welcome to server');
});

app.listen(PORT,()=>{
    // console.log(`Server running at http://localhost:${PORT}}`);
    // console.log("welcome to server")
});