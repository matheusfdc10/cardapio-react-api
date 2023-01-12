import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'

export default async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1]

        if(!token) {
            return res.status(401)
        }

        const id = jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) {
                return null
            } 
            return decoded.id
        })

        if(!id) {
            return res.status(401)
        }
        
        req.userId = id

        return next()
    } catch(err) {
        return res.status(500).json({ msg: 'Erro ao validar usuario.', error: true })
    }
}