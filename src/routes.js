import { Router } from 'express';
import RestaurantController from './controllers/RestaurantController.js';
// import auth from './middlewares/auth.js'
import SessionController from './controllers/SessionController.js';
import UserController from './controllers/UserController.js';
import TypeDishesController from './controllers/TypeDishesController.js';
import auth from './middlewares/auth.js';
import DishController from './controllers/DishController.js';

const routes = new Router();

// -----controler publicos-----
routes.post('/session', SessionController.create);
routes.post('/createUser', UserController.createUser);
routes.get('/indexRestaurant', RestaurantController.index);


// -----middlewares-----
routes.use(auth);


// -----controler privados-----
routes.get('/getUser', UserController.readUser);

routes.post('/createRestaurant', RestaurantController.createRestaurant);
routes.get('/getRestaurant', RestaurantController.readRestaurant);


routes.post('/createTypeDishes', TypeDishesController.createTypeDish);
routes.put('/updateTypeDish/:restaurantId', TypeDishesController.updateTypeDish);
routes.delete('/deleteTypeDish/:id/:restaurantId', TypeDishesController.deleteTypeDish);


routes.post('/createDish/:typeDishesId', DishController.createDish);
routes.get('/readDish/:id', DishController.readDish);
routes.get('/readDishes/:typeDishesId', DishController.readDishes);
routes.put('/updateDish/:id/:typeDishesId', DishController.updateDish);
routes.delete('/deleteDish/:id/:typeDishesId', DishController.deleteDish);

export default routes;