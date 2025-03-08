import express from 'express';

import { ListingRoutes } from '../Modules/Listings/Listings.routes';
import { AuthRoutes } from '../Modules/Auth/Auth.routes';
import { TransactionRoutes } from '../Modules/Transactions/Transactions.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  
  {
    path: '/listings',
    route: ListingRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
