import 'dotenv/config'

import { IndexRoute } from '@modules/index'
import App from './app'
import UserRoute from '@modules/users/user.route';
import AuthRoute from '@modules/auth/auth.route';

const routes = [
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute()
];
const app = new App(routes);

app.listen();