import { Router } from 'express';
import usersRoute from './users';
import adminRoute from './admin';
import authRoute from './auth';
import { verifyToken } from '../../middlewares/jwt';
import admin from '../../middlewares/admin';

const routes = Router();


// Used for routs that start with /api/v1
// /api/v1 is already prepended to the route

routes.all('/', (req, res) => {
  res.send({ message: 'Welcome to Maintenance Tracker API.' });
});

routes.use('/users', verifyToken, usersRoute);

routes.use('/requests', verifyToken, admin, adminRoute);

routes.use('/auth', authRoute);

export default routes;
