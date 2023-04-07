import {Router} from "express"
const router = Router();

/**importamos los controladores */
import * as controller from "../controllers/appController.js"
import Auth from "../middleware/auth.js";

/*POST Methods*/
router.route('/register').post(controller.register)
//router.route('/registerMail').post();
router.route('/authenticate').post((req,res)=>res.end());
router.route('/login').post(controller.verifyUser,controller.login);

/**GET  Methods*/
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.generateOTP) //para generar de manera random el OTP
router.route('/verifyOTP').get(controller.verifyOTP) //verificar el OTP
router.route('/createResetSession').get(controller.createResetSession) //RESetear las variables

/**PUT Methods s*/
router.route('/updateuser').put(controller.updateUser)
router.route('/resetPassword').put(controller.resetPassword)


export default router;