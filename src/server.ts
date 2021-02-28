import 'dotenv/config'

import { IndexRoute } from '@modules/index'
import App from './app'
import UserRoute from '@modules/users/user.route';

const routes = [
    new IndexRoute(),
    new UserRoute()
];
const app = new App(routes);

app.listen();