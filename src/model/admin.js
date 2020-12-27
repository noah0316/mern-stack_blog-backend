import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
});

// Add methods
AdminSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

AdminSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true / false
};

AdminSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

AdminSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // 7 days
    },
  );
  return token;
};

const Admin = model('Admin', AdminSchema);

export default Admin;
