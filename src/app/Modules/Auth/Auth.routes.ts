import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidationSchema } from './Auth.validation';
import { AuthControllers } from './Auth.controllers';


const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidationSchema.authRegisterValidationSchema),
  AuthControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(authValidationSchema.authLoginValidationSchema),
  AuthControllers.loginUser,
);
router.patch(
  '/update-auth/:id',
  
  validateRequest(authValidationSchema.updateAuthInfoValidationSchema),
  AuthControllers.updateAuth,
);
router.get(
  '/one-auth/:email',

  AuthControllers.getSingleAuth,
);
router.get(
  '/',

  AuthControllers.getAllAuths,
);

router.delete(
  '/delete-auth/:id',

  AuthControllers.deleteSingleAuth,
);



router.post('/refresh-token', AuthControllers.refreshToken);


router.post('/feedback-user', AuthControllers.feedBackUser);

router.get('/feedback', AuthControllers.getAllFeedBackUser);

export const AuthRoutes = router;
