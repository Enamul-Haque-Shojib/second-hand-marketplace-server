
import express from 'express';
import { TransactionsControllers } from './Transactions.controller';


const router = express.Router();

router.post(
  '/create-transaction',

  TransactionsControllers.createTransaction,
);
router.patch(
  '/update-transaction/:id',
  TransactionsControllers.updateTransaction,
);
router.get(
  '/purchase/:id',
  TransactionsControllers.getAllPurchases,
);
router.get(
  '/sales/:id',
  TransactionsControllers.getAllSales,
);

router.delete('/delete-transaction/:id', TransactionsControllers.deleteSingleTransactions);


export const TransactionRoutes = router;

