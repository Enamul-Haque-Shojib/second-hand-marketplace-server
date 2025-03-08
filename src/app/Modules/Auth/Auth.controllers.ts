import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './Auth.services';

const registerUser = catchAsync(async (req, res) => {
  
  const result = await AuthServices.registerUserIntoDB(
    req.body
 );

 const { refreshToken, accessToken, user } = result;

 res.cookie('secondHandMarketplace_refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
 });

 sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registration completed successfully!',
    data: {
      user,
       accessToken,
       refreshToken
    },
 });
});

const loginUser = catchAsync(async (req, res) => {
  
  const result = await AuthServices.loginUserIntoDB(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie('secondHandMarketplace_refreshToken', refreshToken, {
     secure: config.NODE_ENV === 'production',
     httpOnly: true,
     sameSite: 'none',
     maxAge: 1000 * 60 * 60 * 24 * 365,
  });


  sendResponse(res, {
     statusCode: 200,
     success: true,
     message: 'User logged in successfully!',
     data: {
        user,
        accessToken,
        refreshToken
     },
  });
});

const updateAuth = catchAsync(async (req, res) => {
 
  const result = await AuthServices.updateAuthIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auth updated successfully',
    data: result,
  });
});

const getSingleAuth = catchAsync(async (req, res) => {
  
  const result = await AuthServices.getSingleAuthFromDB(req.params.email);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auth one one retrieved successfully',
    data: result,
  });
});
const getAllAuths = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllAuthsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auths --------------- retrieved successfully',
    data: result,
  });
});


const deleteSingleAuth = catchAsync(async (req, res) => {
  const result = await AuthServices.deleteAuthFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auth deleted successfully',
    data: result,
  });
});



const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.createJwtToken(refreshToken);

  sendResponse(res, {
     statusCode: 200,
     success: true,
     message: 'User logged in successfully!',
     data: result,
  });
});

const feedBackUser = catchAsync(async(req, res) => {

  const result = await AuthServices.feedBackUserIntoDB(req.body);

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User feedback created successfully",
      data: result
  })
});
const getAllFeedBackUser = catchAsync(async(req, res) => {
  

  const result = await AuthServices.getAllFeedBackUserIntoDB();

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User feedback retrieve successfully",
      data: result
  })
});

export const AuthControllers = {
  registerUser,
  loginUser,
  updateAuth,
  getAllAuths,
  getSingleAuth,
  deleteSingleAuth,
  refreshToken,
  feedBackUser,
  getAllFeedBackUser

};
