import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransactionsServices } from './Transactions.services';



const createTransaction = catchAsync(async (req, res) => {
  const result = await TransactionsServices.createTransactionIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Transaction successfully created',
    data: result,
  });
});

const updateTransaction = catchAsync(async (req, res) => {
  const result = await TransactionsServices.updateTransactionIntoDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Transaction successfully updated',
    data: result,
  });
});


const getAllPurchases = catchAsync(async (req, res) => {
  const result = await TransactionsServices.getAllPurchasesFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Purchases successfully retrieved',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await TransactionsServices.getAllSalesFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sales successfully retrieved',
    data: result,
  });
});

const deleteSingleTransactions = catchAsync(async (req, res) => {
  const result = await TransactionsServices.deleteSingleTransactionFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Transaction successfully deleted',
    data: result,
  });
});



export const TransactionsControllers = {
  createTransaction,
  updateTransaction,
  getAllPurchases,
  getAllSales,
  deleteSingleTransactions,

};
