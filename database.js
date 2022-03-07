const mongoose=require("mongoose")

class DatabaseMongo extends mongoose.Mongoose{
    constructor(url,collectionName,schemaModel){
        super()
        this.connect(url)
        this.schemaModel(schemaModel,collectionName)
    }

    schemaModel(schemaModel,collectionName){
        this.databaseSchema=new mongoose.Schema(schemaModel)
        this.databaseModel=this.model(collectionName,this.databaseSchema)
    }

    saveToDataBase(data){
        let insertTo=new this.databaseModel(data)
        insertTo.save((error)=>{
            console.log(error)
        })
    }

    fetchDatabase(query){
        return new Promise((resolve,reject)=>{
            this.databaseModel.find((err,result)=>{
                if(result){
                    resolve({message:"Success",data:result})
                }
                else{
                    reject({message:"Error",data:err})
                }
            },query)    
        })    
    }
}

module.exports=DatabaseMongo