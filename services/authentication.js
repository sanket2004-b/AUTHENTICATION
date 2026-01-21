const JWT=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();    
const JWT_SECRET=process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("JWT_SECREAT is not defined");
}
function createToken(user){
    const payload={
        _id:user.id,
        email:user.email,
    };
    const token=JWT.sign(payload,JWT_SECRET,{expiresIn:'1h'});
    return token;

}
function verifyToken(token){
    try{
        const payload=JWT.verify(token,JWT_SECRET);
        return payload;
    }catch(err){
        return null;
    } 
}

module.exports={
    createToken,
    verifyToken 
}
