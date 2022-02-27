const express=require("express")
const route=express.Router()
const post=require("../index")

route.get("/:id",(req,res)=>{
    post.posts.forEach(post=>{
        if(post.link===req.params.id){
            res.render("singlePost",{
                post:post,
                title:post.head
            })
        }else{
            res.redirect("/blogs")
        }
    })
})

module.exports=route