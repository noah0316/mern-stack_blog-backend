import Koa from 'koa';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { PORT, MONGO_URI } = process.env;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
}
connectDB();

const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
