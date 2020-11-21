import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const Comment = model('Comment', CommentSchema);

export default Comment;
