import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { listingsSearchableField } from './Listings.constant';

import { TListing } from './Listings.interface';
import { ListingsModel } from './Listings.model';

const createListingIntoDB = async (payload: TListing) => {
  const result = await ListingsModel.create(payload);
  return result;
};

const updateListingIntoDB = async (id: string, payload: Partial<TListing>) => {
  const updateListingInfo = await ListingsModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updateListingInfo) {
    throw new AppError(400, 'Failed to update Task');
  }

  return updateListingInfo;
};

// const getAllTasksFromDB = async (query: Record<string, unknown>) => {
//   const taskQuery = new QueryBuilder(TaskModel.find().populate('auth'), query)
//   .search(taskSearchableField)
//     .filter();
//   const result = await taskQuery.modelQuery; // **Add `await` to execute query**

//   return result;
// };

const getAllListingsFromDB = async (query: Record<string, unknown>) => {
  const { minPrice, maxPrice, ...pQuery } = query;

  const listingQuery = new QueryBuilder(
    ListingsModel.find().populate('userId'),
    pQuery,
  )
    .search(listingsSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);

  const listings = await listingQuery.modelQuery.lean();
  return listings;
};

const getUserListingsFromDB = async (userId: string) => {
  const userListingInfo = await ListingsModel.find({userId}).populate('userId');
  return userListingInfo;
};

const getSingleListingFromDB = async (id: string) => {
  const ListingInfo = await ListingsModel.findById(id).populate('userId');
  return ListingInfo;
};

const deleteSingleListingFromDB = async (id: string) => {
  const deleteListingInfo = await ListingsModel.findByIdAndDelete(id);
  return deleteListingInfo;
};

export const ListingServices = {
  createListingIntoDB,
  updateListingIntoDB,
  getAllListingsFromDB,
  deleteSingleListingFromDB,
  getSingleListingFromDB,
  getUserListingsFromDB
};
