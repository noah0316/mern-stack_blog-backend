import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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
  const result = await bcrypt.compare(password, this.pw);
  return result; // true / false
};

AdminSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

const Admin = model('Admin', AdminSchema);

export default Admin;
