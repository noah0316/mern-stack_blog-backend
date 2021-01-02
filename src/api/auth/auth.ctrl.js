import Admin from '../../model/admin';
import Joi from 'joi';
import * as jwt from 'jsonwebtoken';

/*
  // POST /api/auth/register
  {
    name: '홍승현',
    email: 'noa316@naver.com'
    password: 'password1234'
  }
*/

// 회원가입
export const register = async ctx => {
  // Request body 검증용 schema
  const schema = Joi.object().keys({
    name: Joi.string().min(2).max(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad request
    ctx.body = result.error;
    return;
  }

  const { name, email, password } = ctx.request.body;

  try {
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      ctx.status = 409; // Conflict
      return;
    }
    const admin = new Admin({
      name,
      email,
    });
    await admin.setPassword(password);
    await admin.save();

    ctx.body = admin.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// POST /api/auth/login
// 로그인
export const login = async ctx => {
  // Request body 검증용 schema
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  // 양식이 맞지 않으면 400 에러
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  const { email, password } = ctx.request.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      ctx.status = 401; // Unauthorized
      ctx.body = 'Wrong Email';
      return;
    }

    const valid = await admin.checkPassword(password);

    if (!valid) {
      ctx.status = 401; // Unauthorized
      ctx.body = 'Wrong Password';
      return;
    }
    console.log(admin);
    ctx.body = admin.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// POST /api/auth/check
export const check = async ctx => {
  const { admin } = ctx.state;
  ctx.body = admin;
};

// POST /api/auth/logout
export const logout = async ctx => {
  // 로그아웃
};
