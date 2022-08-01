const UserModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const consts = require('../consts.js')
const jwt = require('jsonwebtoken')

let controller = {
    register: async (req, res) => {
        try {
            let user = await UserModel.findOne({email: req.body.email})
            if(!user) {
                const user = new UserModel(req.body)
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts)
                await user.save()
                delete user.password
                res.status(200).json(user)
            }else{
                res.status(403).json(
                    {
                        message: 'Email already registered!',
                        error: {}
                    }
                )
            }
        } catch (error) {
            res.status(500).send({msg: `Error while saving the user`, error: error})
        }
    },
    login: (req, res) => {
        const password = req.body.password
        const email = req.body.email
        UserModel.findOne({email: email}).lean().exec((err, user) => {
            if(err) {
                return res.status(500).json({
                    message: 'Server error', error: err
                })
            }
            const auth_err = (password == '' || password == null || !user)
            if(!auth_err) {
                if(bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({_id: user._id}, consts.keyJWT, {expiresIn: consts.expiresJWT})
                    delete user.password
                    return res.json({
                        ...user, token: token
                    })
                }
            }
            return res.status(404).json({
                message: 'Wrong e-mail or password!'
            })
        })
    },
    check_token: (req, res, next) => {
        const token = req.get('Authorization')
        if(!token) {
            res.status(401).json({
                message: 'Could not acccess!'
            })
        }
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            if(err || !decoded){
                return res.status(401).json({
                    message: `Authentication error!`,
                    err: err
                })
            }
            next()
        })
    },
    user_data: (req, res) => {
        const token = req.get('Authorization')
        jwt.verify(token, consts.keyJWT, (err, decoded) => {
            const id = decoded._id
            UserModel.findById(id).lean().exec((err, user) => {
                if(err || !user){
                    return res.status(500).json({
                        message: 'Login error!',
                        error: err
                    })
                }
                let token = jwt.sign({_id: user._id}, consts.keyJWT, {expiresIn: consts.expiresJWT})
                delete user.password
                return res.json({
                    ...user, token: token
                })
            })
        })
    }
}

module.exports = {
    controller
}