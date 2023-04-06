import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';
import {Jwt} from 'jsonwebtoken'

export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            throw new Error("Please use a unique username");
        }

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            throw new Error("Please use a unique email");
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new UserModel({
                username: username,
                password: hashedPassword,
                profile: profile,
                email: email,
            });

            const result = await user.save();
            res.status(201).send({ msg: "User register successfull" });
        }

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function login(req, res) {
    const {username,password} = req.body;

    try{
        UserModel.findOne({username})
            .then(user=>{
                bcrypt.compare(password,user.password)
                    .then(passwordCheck =>{

                        if(!passwordCheck) return res.status(400).send({error: "Don't have Password"});

                        //creando jwt token
                        
                        const token = jwt.sign({
                                        userId: user._id,
                                        username: user.username
                                      },'secret',{expiresIn : "24h"})
                        
                        return res.status(200).send({
                            msg: "login successful ...!",
                            username: user.username,
                            token
                        })

                    })
                    .catch(error =>{
                        return res.status(400).send({error: "password does not Match"})
                    })
            })
            .catch(error =>{
                return res.status(404).send({error: "Username not Found"});
            })
    }catch(error){
        return res.status(500).send({error})
    }
}

export async function getUser(req, res) {
    res.json('getUser route')
}

export async function updateUser(req, res) {
    res.json('updateUser route')
}

export async function generateOTP(req, res) {
    res.json('generateOTP route')
}

export async function verifyOTP(req, res) {
    res.json('verifyOTP route')
}

export async function createResetSession(req, res) {
    res.json('createResetSession route')
}

export async function resetPassword(req, res) {
    res.json('resetPassword route')
}
