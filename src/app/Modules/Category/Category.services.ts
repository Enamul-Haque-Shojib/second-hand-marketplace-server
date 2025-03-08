// import AppError from '../../errors/AppError';

// import { TListing } from './Category.interface';
// import { ListingsModel} from './Category.model';


// const createListingIntoDB = async (payload: TListing) => {
//   const result = await ListingsModel.create(payload);
//   return result;
// };

// const updateListingIntoDB = async (id: string, payload: Partial<TListing>) => {
//   const updateListingInfo = await ListingsModel.findByIdAndUpdate(id, payload, {
//     new: true,
//   });

//   if (!updateListingInfo) {
//     throw new AppError(400, 'Failed to update Task');
//   }

//   return updateListingInfo;
// };



// // const getAllTasksFromDB = async (query: Record<string, unknown>) => {
// //   const taskQuery = new QueryBuilder(TaskModel.find().populate('auth'), query)
// //   .search(taskSearchableField)
// //     .filter();
// //   const result = await taskQuery.modelQuery; // **Add `await` to execute query**

// //   return result;
// // };

// const getAllListingsFromDB = async (query: Record<string, unknown>) => {
  
// };



// const getSingleListingFromDB = async (id: string) => {
//   const deleteListingInfo = await ListingsModel.findById(id).populate('auth');
//   return deleteListingInfo;
// };


// const deleteSingleListingFromDB = async (id: string) => {
//   const deleteListingInfo = await ListingsModel.findByIdAndDelete(id);
//   return deleteListingInfo;
// };


// export const ListingServices = {
//   createListingIntoDB,
//   updateListingIntoDB,
//   getAllListingsFromDB,
//   deleteSingleListingFromDB,
//   getSingleListingFromDB
// };
