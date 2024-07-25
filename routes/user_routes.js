import express from 'express';
import { getAllUser, signup , login} from '../controllers/user_controller.js';

//import { signup } from '../controllers/user_controller';
const router  = express.Router();

router.get('/',getAllUser);
router.post('/signup',signup);
router.post('/login',login);

export default router


