import Router from 'koa-router';
import jwtMiddleware from '../../lib/jwtMiddleware';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', jwtMiddleware, authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;
