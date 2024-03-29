import config from '~/config';

import { AuthenLayout } from '~/components/Layout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import About from '~/pages/About';
import Product from '~/pages/Product';
import Detail from '~/pages/Detail';
import CartPage from '~/pages/CartPage';
import Checkout from '~/pages/Checkout';
import CheckoutDone from '~/pages/CheckoutDone';
import UserPurchase from '~/pages/UserPurchase';
import UserProfile from '~/pages/UserProfile';
import Contact from '~/pages/Contact';
import ForgotPassword from '~/pages/ForgotPassword';
import RecoveryPassword from '~/pages/RecoveryPassword';

export const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login, layout: AuthenLayout },
  { path: config.routes.forgotPassword, component: ForgotPassword, layout: AuthenLayout },
  { path: config.routes.recoveryPassword, component: RecoveryPassword, layout: AuthenLayout },
  { path: config.routes.register, component: Register, layout: AuthenLayout },
  { path: config.routes.products, component: Product },
  { path: config.routes.detail, component: Detail },
  { path: config.routes.cart, component: CartPage },
  { path: config.routes.checkoutDone, component: CheckoutDone },
  { path: config.routes.checkout, component: Checkout },
  { path: config.routes.userPurchase, component: UserPurchase },
  { path: config.routes.userAccount, component: UserProfile },
  { path: config.routes.contact, component: Contact },
  { path: config.routes.about, component: About },
];

export const privateRoutes = [];
