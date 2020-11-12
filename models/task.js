const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema(
  {
    userId:{type: Schema.Types.ObjectId, ref: "Users", required:true},
    task: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
      },
    isArchive: {
        type: Boolean,
        default: false,
      },
    priority:{
      type: Number,
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// taskSchema.pre("save", function (next) {
//   try {
//     if (!this.isNew) return next();
//     this.constructor.count;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });


module.exports = mongoose.model("Task", taskSchema);
