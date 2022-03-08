const express=require("express")
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const DatabaseMongo=require("./database")
let databasePost=new DatabaseMongo("mongodb://localhost:27017/ExpressBlog","Posts",{head:String,content:String,link:String,date:String})

const homeString="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi, impedit libero doloremque ducimus, et soluta eos architecto culpa tempora, error mollitia sit. Nobis, fuga."
const contactString="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi, impedit libero doloremque ducimus, et soluta eos architecto culpa tempora, error mollitia sit. Nobis, fuga."
const aboutString="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi, impedit libero doloremque ducimus, et soluta eos architecto culpa tempora, error mollitia sit. Nobis, fuga."

//Static request handler for text/style and text/javascript
app.use("/",express.static("./views"))

//Setting EJS view engine
app.set("view engine","ejs")

//route middleware
app.use("/single-post",require("./routes/post"))
app.use("/post/api",require("./routes/api/api"))

//Render Controls
app.get("/",(req,res)=>{
    let pagetitle=(req.url=="/")?"Home": req.url
    databasePost.fetchDatabase().then(data=>{
        dataBaseContent=data.data
        res.render("index",{
            title:pagetitle,
            content:homeString,
            posts:dataBaseContent
        })
    })
})

app.get("/about-us",(req,res)=>{
    res.render("about",{
        title:"About us",
        content:aboutString,
    })
})

app.get("/contact-us",(req,res)=>{
    res.render("contact",{
        title:"Contact Us",
        content:contactString,
    })
})
 
app.get("/blogs",(req,res)=>{
    databasePost.fetchDatabase().then(data=>{
        dataBaseContent=data.data
            res.render("blogs",{
            title:"Blogs",
            posts:dataBaseContent
        })
    })    
})

//--Get blogs from frontend and add it to post veriable

app.post("/add-post",(req,res)=>{
    if(req.body.head!=="" || req.body.content!==""){
        const head=req.body.head
        const content=req.body.content
        let date=`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
        data={
            head:head,
            content:content,
            link:head.toLowerCase().split(" ").join("-"),
            date:date
        }
        databasePost.saveToDataBase(data)
        res.redirect("/blogs")
    }
    else{
        res.redirect("/blogs")
    }
})

//Server Listen in port 6500

app.listen(process.env.PORT || 6500,()=>{
    console.log(`Server open in port ${process.env.PORT || 6500}`)
})

//export modules
module.exports.post=databasePost