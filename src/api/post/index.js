import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as Post from './post.ctrl';

const post = new Router();

post.post('/', checkLoggedIn, Post.write);
post.get('/', Post.list);
post.get('/:id', Post.read);
post.delete('/:id', checkLoggedIn, Post.remove);
post.patch('/:id', checkLoggedIn, Post.update);
post.patch('/:id:views', Post.viewUpdate);

export default post;
