import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ListingServices } from './Listings.services';


const createListing = catchAsync(async (req, res) => {
  
  const result = await ListingServices.createListingIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Listing successfully created',
    data: result,
  });
});

const updateListing = catchAsync(async (req, res) => {
  const result = await ListingServices.updateListingIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'List successfully updated',
    data: result,
  });
});

const getSingleListing = catchAsync(async (req, res) => {
  const result = await ListingServices.getSingleListingFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single List successfully retrieved',
    data: result,
  });
});
const getAllListings = catchAsync(async (req, res) => {
  const result = await ListingServices.getAllListingsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tasks successfully retrieved',
    data: result,
  });
});

const deleteSingleListing = catchAsync(async (req, res) => {
  const result = await ListingServices.deleteSingleListingFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'List successfully deleted',
    data: result,
  });
});





export const ListingControllers = {
  createListing,
  updateListing,
  getAllListings,
  deleteSingleListing,
  getSingleListing,
  
};
