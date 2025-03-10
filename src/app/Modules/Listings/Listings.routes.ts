import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { listingsValidationSchema } from './Listings.validation';
import { ListingControllers } from './Listings.controller';

const router = express.Router();

router.post(
  '/create-listing',

  validateRequest(listingsValidationSchema.createListingValidationSchema),
  ListingControllers.createListing,
);
router.patch(
  '/update-listing/:id',

  validateRequest(listingsValidationSchema.updateListingValidationSchema),
  ListingControllers.updateListing,
);
router.get('/', ListingControllers.getAllListings);
router.get('/one-listing/:id', ListingControllers.getSingleListing);
router.get('/user-listings/:id', ListingControllers.getUserListings);
router.delete('/delete-listing/:id', ListingControllers.deleteSingleListing);

export const ListingRoutes = router;
