import { model, Schema } from 'mongoose';

import { ListingStaticModel, TListing } from './Listings.interface';
import { conditions } from './Listings.constant';

const listingsSchema = new Schema<TListing, ListingStaticModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: conditions,
    },
    image: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
    category: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Available', 'Sold'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  },
);

export const ListingsModel = model<TListing, ListingStaticModel>(
  'Listings',
  listingsSchema,
);
