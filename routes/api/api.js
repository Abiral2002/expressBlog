const express=require("express")
const route=express.Router()
const posts=require("../../index")

route.get("/",(req,res)=>{
    posts.post.fetchDatabase({}).then(data=>{
        const {limit,title}=req.query
        console.log(title)
        var dataList=Array.from(data.data)
        if (limit!=0){
            sendData=dataList.slice(0,limit)
        }
        if (title){
            sendData=data.data.filter(data=>{
                return data.head.toLocaleLowerCase()===title.toLocaleLowerCase()
            })
        }
        if(!sendData){
            sendData=data.data
        }
        res.json(sendData)

    })
    
})

module.exports=route