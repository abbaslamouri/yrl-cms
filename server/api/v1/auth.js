import express from 'express';
import errorHandler from '~/server/utils/errorHandler';
import {
  register,
  completeRegistration,
  login,
  protect,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
  updateCurrentUserInfo,
  updateCurrentUserPassword,
  // uploadUserAvatar,
  // resizeAvatar,
  authorize,
} from '~/server/controllers/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/complete-registration/:token').patch(completeRegistration);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').patch(resetPassword);

router.use(protect);

router.route('/update-current-user').patch(updateCurrentUserInfo);
router.route('/update-current-user-password').patch(updateCurrentUserPassword);
router.route('/current-user').get(getCurrentUser);

router.use(authorize('admin'));

// router.route('/').get(getAllUsers).post(createUser)
// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

router.use(errorHandler);

export default router;

// router.route('/signup').post(signup)
// router.route('/login').post(login)
// router.route('/logout').get(logout)
// router.route('/forgot-password').post(forgotPassword)
// router.route('/reset-password/:token').patch(resetPassword)

// router.use(checkAuth)

// router.route('/update-my-password').patch(updateMyPassword)

// router.route('/get-me').get(getMe, getUser)
// router.route('/update-me').patch(uploadUserPhoto, updateMe)
// router.route('/delete-me').delete(deleteMe)

// router.use(restrictTo('admin'))

// router.route('/').get(getAllUsers).post(createUser)
// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
