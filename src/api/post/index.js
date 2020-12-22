import Router from 'koa-router';
import * as Post from './post.ctrl';

const post = new Router();

post.post('/', Post.write);
post.get('/', Post.list);
post.get('/:id', Post.read);
post.delete('/:id', Post.remove);
post.patch('/:id', Post.update);
post.patch('/:id:views', Post.viewUpdate);
