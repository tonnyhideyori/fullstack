const jwt=require('jsonwebtoken')
const keys =require('../keys/key')

module.exports=function auth(req,res,next) {
    const token = req.header("token");
    if (!token) {
        res.status(401).send('Acces denied! provide auth token')
    }
    try {
        const decodedUser = jwt.verify(token, keys.jwtPrivate)
        req.user = decodedUser;
        next()
    }
    catch (e) {
        res.status(404).send('invalide token')
    }
}
