import { Router } from 'express';
import usersRoute from './users';
import adminRoute from './admin';
import authRoute from './auth';
import { verifyToken } from '../../middlewares/jwt';
import admin from '../../middlewares/admin';
import prepTable from '../../controllers/data';

const routes = Router();


// Used for routs that start with /api/v1
// /api/v1 is already prepended to the route

routes.all('/', (req, res) => {
  res.send({
    message: 'Welcome to Maintenance Tracker API.',
    adminLogin: {
      email: 'admin@admin.com or clinton@test.com',
      password: 'password',
    },
    docs: 'https://veraclins-m-tracker.herokuapp.com/api-docs',
  });
});

routes.use('/users', verifyToken, usersRoute);

routes.use('/requests', verifyToken, admin, adminRoute);

routes.use('/auth', authRoute);

routes.use('/data', prepTable);

export default routes;
