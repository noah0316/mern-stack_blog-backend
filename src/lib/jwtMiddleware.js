import jwt from 'jsonwebtoken';

import Admin from '../model/admin';

const jwtMiddleware = async (ctx, next) => {
  if (!ctx.req.headers.authorization) {
    return next();
  }

  const token = ctx.req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    ctx.state.admin = {
      id: admin.id,
      name: admin.name,
    };
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
