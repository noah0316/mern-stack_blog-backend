import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', checkLoggedIn, authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;
