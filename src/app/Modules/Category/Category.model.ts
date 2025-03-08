// import { model, Schema } from 'mongoose';

// import { ListingStaticModel, TListing } from './Category.interface';
// import { conditions } from './Category.constant';

// const imagesUrlSchema= {
//   type: String,
// }

// const categorySchema = new Schema<TListing, ListingStaticModel>(
//   {
  
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price:{
//       type: Number,
//       required: true,
//     },
//     condition: {
//       type: String,
//       enum: conditions,
//     },
//     images: {
//       type: [imagesUrlSchema]
//     },

//    userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Auth',
//    },
//     category: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );



// export const CategoryModel = model<TCategory, ListingStaticModel>(
//   'Category',
//   categorySchema,
// );
