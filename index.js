const express=require("express")
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
let post=[]

const homeString="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi, impedit libero doloremque ducimus, et soluta eos architecto culpa tempora, error mollitia sit. Nobis, fuga."
const contactString="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi, impedit libero doloremque ducimus, et soluta eos architecto culpa tempora, error mollitia sit. Nobis, fuga."
const aboutString="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi, impedit libero doloremque ducimus, et soluta eos architecto culpa tempora, error mollitia sit. Nobis, fuga."

//Static request handler for text/style and text/javascript
app.use("/",express.static("./views"))

//Setting EJS view engine
app.set("view engine","ejs")

//route middleware
app.use("/single-post",require("./routes/post"))

//Render Controls
app.get("/",(req,res)=>{
    let pagetitle=(req.url=="/")?"Home": req.url
    res.render("index",{
        title:pagetitle,
        content:homeString,
        posts:(post!==[])?post:[{head:"No post available",content:"No post available"}]
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

app.get("/single-post")

app.get("/blogs",(req,res)=>{
    res.render("blogs",{
        title:"Blogs",
        posts:post
    })
})

//--Get blogs from frontend and add it to post veriable

app.post("/add-post",(req,res)=>{
    const head=req.body.head
    const content=req.body.content
    console.log(head)
    data={
        head:head,
        content:content,
        link:head.toLowerCase().split(" ").join("-")
    }
    post.push(data)
    res.redirect("/blogs")
})

//Server Listen in port 6500

app.listen(process.env.PORT || 6500,()=>{
    console.log(`Server open in port ${process.env.PORT || 6500}`)
})

//export modules
module.exports.posts=post