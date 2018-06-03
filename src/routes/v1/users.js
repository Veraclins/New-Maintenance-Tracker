import { Router } from 'express';
import { getAllRequests, createRequest, getRequestById, UpdateRequest } from '../../controllers/users';
import { validateRequest } from '../../validations/validate';


const usersRoute = Router();

// Used for routes that start with /api/v1/users
// /api/v1/users is already prepended to the route
// Used by logged in users only


usersRoute.get('/requests', getAllRequests);

usersRoute.post('/requests', validateRequest, createRequest);

usersRoute.get('/requests/:requestId', getRequestById);

usersRoute.put('/requests/:requestId', validateRequest, UpdateRequest);

export default usersRoute;
