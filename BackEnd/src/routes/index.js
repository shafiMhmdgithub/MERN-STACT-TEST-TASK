
import { deleteProductRoute } from './deleteProductRoute';
import { facebookRoute } from './facebookRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { getAllProductsRoute } from './getAllProductsRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { getUsersRoute } from './getUsersRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import { logInRoute } from './loginRoute';
import { productRoute } from './productRoute';
import { profileRoute } from './profileRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { signUpRoute } from './SignUpRoute';
import { testRoute } from './testRoute';
import { updateUserProfile } from './updateUserProfile';
import { verifyEmailRoute } from './verifyEmailRoute';
//for payment


export const routes = [
    testRoute,
    signUpRoute,
    logInRoute,
    updateUserProfile,
    profileRoute,
    resetPasswordRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    productRoute,
    getAllProductsRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    facebookRoute,
    deleteProductRoute,
   getUsersRoute,
  
];
