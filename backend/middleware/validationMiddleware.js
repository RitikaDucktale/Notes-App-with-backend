const validate = (schema)=> (req,res,next)=>{
    try{
        console.log('req body...',req.body)
        const {error} = schema.validate(req.body);
        console.log('full error --->>',error)
        console.log("error==>",error?.details[0]?.message)
        if(error){
            return res.status(400).json({
                message: error?.details[0]?.message || "Validation error"
            })
        }
        next();
    }catch(err){
            console.log("Validation middleware error:", err);
    return res.status(500).json({
      message: "Server error in validation",
    });
    }
} 

module.exports  = validate;