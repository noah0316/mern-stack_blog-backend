import Router from 'koa-router';

const auth= new Router();

// auth.post() // CREATE
// auth.get() // READ
// auth.patch() // UPDATE
// auth.delete() // DELETE


auth.post('/register', ());

auth.post('/login',());
auth.get('/check', ());
auth.post('/logout', ());

auth.patch('/update', ());
auth.delete('/delete', ());