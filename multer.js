const express=require("express");
const multer = require("multer");
const path = require("path");

const port=2000

const app = express();
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.get("/",(req,res)=>{
    // res.send("Hello World");
    res.render("index");    
})
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const storage=multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }   

})
const upload=multer({storage})
app.post("/upload", upload.single('myfile'), (req, res) => {
    if(!req.file){
        return res.status(400).send("No file uploaded.");
    }
    console.log(req.file); // Log file details to the console
    res.send(`file ${req.file.originalname} uploaded successfully.`);
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})       // Set storage engine
// Set storage engine
