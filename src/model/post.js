import { model, Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'Admin' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    view: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const Post = model('Post', PostSchema);

export default Post;
