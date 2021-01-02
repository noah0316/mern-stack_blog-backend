import Joi from 'joi';
import Post from '../../model/post';

/* 포스트 작성
POST /api/posts
{ title, body }
*/
export const write = async ctx => {
  // Request body 검증

  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string(),
  });
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad request
    ctx.body = result.error;
    return;
  }

  const { title, content } = ctx.request.body;
  const { admin } = ctx.state;

  try {
    const post = new Post({
      title,
      content,
      author: admin.id,
    });
    await post.save();

    const data = post.toJSON();
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 목록 조회
GET /api/posts
*/
export const list = async ctx => {
  try {
    const posts = await Post.find({}).populate('author', 'name');
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await (await Post.findById(id)).populated('author', '-hashedPassword');
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{ title, body }
*/
export const update = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회수 업데이트
PATCH /api/posts/:id:views
*/
export const viewUpdate = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    post.view += 1;
    post.save();
    ctx.body = post.view;
  } catch (e) {
    ctx.throw(500, e);
  }
};
