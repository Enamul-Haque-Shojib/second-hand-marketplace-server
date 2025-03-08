import AppError from '../../errors/AppError';
import { ListingsModel } from '../Listings/Listings.model';
import { TTransaction } from './Transactions.interface';
import { TransactionsModel } from './Transactions.model';


const createTransactionIntoDB = async (payload: TTransaction) => {
  console.log(payload);
  const result = await TransactionsModel.create(payload);
  return result;
};

const updateTransactionIntoDB = async (id: string) => {
  const updateTransactionInfo = await TransactionsModel.findByIdAndUpdate(id, {status:"Complete"}, {
    new: true,
  });
  

  if (!updateTransactionInfo) {
    throw new AppError(400, 'Failed to update Transaction');
  }
  const updateListingInfo = await ListingsModel.findByIdAndUpdate(updateTransactionInfo?.itemId?._id, {status:"Sold"}, {
    new: true,
  });

  if (!updateListingInfo) {
    throw new AppError(400, 'Failed to update item');
  }

  return updateTransactionInfo;
};





const getAllPurchasesFromDB = async (id: string) => {
  const purchaseData = await TransactionsModel.find({buyerId: id}).populate('buyerId').populate('sellerId').populate('itemId');
  if(!purchaseData) {
    throw new AppError(400, 'Data not found');
  }
  return purchaseData;
};
const getAllSalesFromDB = async (id: string) => {
  const salesData = await TransactionsModel.find({sellerId: id}).populate('buyerId').populate('sellerId').populate('itemId');
  if(!salesData) {
    throw new AppError(400, 'Data not found');
  }
  return salesData;
};




const deleteSingleTransactionFromDB = async (id: string) => {
  const deleteTransactionInfo = await TransactionsModel.findByIdAndDelete(id);
  return deleteTransactionInfo;
};


export const TransactionsServices = {
  createTransactionIntoDB,
  updateTransactionIntoDB,
  getAllPurchasesFromDB,
  getAllSalesFromDB,
  deleteSingleTransactionFromDB,
  
};
