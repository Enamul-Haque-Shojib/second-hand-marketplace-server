// import { z } from 'zod';
// import { conditions } from './Category.constant';

// const createListingValidationSchema = z.object({
//   body: z.object({
//     title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   price: z.number().min(0, "Price must be a positive number"),
//   condition: z.enum(conditions),
//   images: z.array(
//     z.object({
//       url: z.string().url(),
//     })
//   ),
//   category: z.string(),
//   }),
// });

// const updateListingValidationSchema = z.object({
//   body: z.object({
//     title: z.string().optional(),
//   description: z.string().optional(),
//   price: z.number().optional(),
//   condition: z.enum([
//     'Brand New',
//     'Like New',
//     'Excellent',
//     'Good',
//     'Fair (Acceptable)',
//     'Needs Repair / For Parts',
//   ]).optional(),
//   images: z.array(
//     z.object({
//       url: z.string().url(),
//     }).optional()
//   ),
//   category: z.string(),
//   }),
// });



// export const listingsValidationSchema = {
//   createListingValidationSchema,
//   updateListingValidationSchema,
// };
