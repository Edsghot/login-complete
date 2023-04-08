import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import otpGenerator from 'otp-generator'


/**midleware for verify user */

export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;

        // verificamos si existe el user
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" })
    }
}

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
    const { username, password } = req.body;

    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        //creando jwt token

                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "24h" })

                        return res.status(200).send({
                            msg: "login successful ...!",
                            username: user.username,
                            token
                        })
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })
    } catch (error) {
        return res.status(500).send({ error })
    }
}

export async function getUser(req, res) {
    //recogemos como parametro el username
    const {username} = req.params;
    console.log("--->",username)
    
    try{

        if(!username){
            return res.status(501).send({error: "invalid username"})
        }

        const user = await UserModel.findOne({username})

        return res.status(201).send(user);
        
    }catch(error){
        return res.status(404).send({error: "Cannot Find user data"})
    }

}

export async function updateUser(req, res) {
    try{

        const {userId} = req.user;

        if(userId){
            const body = req.body;

            UserModel.updateOne({_id:userId}, body, function(err,data){
                if(err) throw err;
                
                return res.status(201).send({msg: "Actualizado correctamente ..:!"})
            })


        }else{
            return res.status(401).send({error: "user not found"})
        }

    }catch(error){
        return res.status(401).send({error})
    }
}

export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets: false,upperCaseAlphabets: false,specialChars: false})
    res.status(201).send({code: req.app.locals.OTP})
}

export async function verifyOTP(req, res) {
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reseteamos el valor del OTP
        req.app.locals.resetSession = true;
        return res.status(201).send({msg: 'Verify Successfully!'})
    }
    return res.status(400).send({error: "Invalid OTP"})
}

export async function createResetSession(req, res) {
    if(req.app.locals.resetSession) {
        
    }
}

export async function resetPassword(req, res) {
    res.json('resetPassword route')
}
