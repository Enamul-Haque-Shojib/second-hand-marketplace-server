/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type imagesUrl = string;

export type TListing = {
  title: string;

  images: imagesUrl;
 
};

// export interface ListingStaticModel extends Model<TListing> {
//   isProductExistById(id: string): Promise<TListing>;
// }
