const express=require("express")
const route=express.Router()
let posts=require("../index")


route.get("/:id",(req,res)=>{
    posts.post.fetchDatabase({}).then(data=>{
        let redirect=true
        data.data.forEach((post)=>{
            if(post.link===req.params.id){
                redirect=false
                res.render("singlePost",{
                    post:post,
                    title:post.head
                })}
        })
        if(redirect){
            res.redirect("/blogs")
        }
    })
    
})

module.exports=route