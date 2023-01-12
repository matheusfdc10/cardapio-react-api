import Restaurant from '../models/Restaurant.js'
import TypeDishes from '../models/TypeDishes.js'
import Dish from '../models/Dish.js'
// import { createPasswordHash } from '../services/auth.js';

class RestaurantController {
    async index(req, res) {
        try {
            const userId = '63bed16289fc5bf233378b23';

            if (!userId) {
                return res.status(404).json({ msg: 'Usuário não informado.' });
            }

            const restaurant = await Restaurant.findOne({ userId })

            if (!restaurant) {
                return res.status(404).json({ msg: 'Restaurante não encontrado.' });
            } 

            const typeDishes = await TypeDishes.find({ restaurantId: restaurant._id })

            const array = []

            for(let i = 0; i < typeDishes.length; i++){
                const dishes = await Dish.find({ typeDishesId: typeDishes[i]._id, status: 'ativo'})
                array.push({
                    id: typeDishes[i]._id,
                    restaurantId: typeDishes[i].restaurantId,
                    name: typeDishes[i].name,
                    dishes: dishes
                })
            }

            return res.status(200).json({
                id: restaurant._id,
                name: restaurant.name,
                email: restaurant.email,
                telephone: restaurant.telephone, 
                whatsapp: restaurant.whatsapp, 
                logo: restaurant.logo,
                typeDish: array
            })
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async createRestaurant(req, res) {
        try {
            const userId = req.userId;
            const { name, email, telephone, whatsapp, logo } = req.body;

            if (!userId) {
                return res.status(404).json({ msg: 'Usuário não informado.' });
            }

            if (!name, !email, !telephone, !whatsapp, !logo) {
                return res.status(404).json({ msg: 'Campo não preenchido.' });
            }

            const restaurant = await Restaurant.findOne({ userId, name })

            if (restaurant) {
                return res.status(422).json({ msg: `Já possui restaurante com nome ${name}.`})
            }

            await Restaurant.create({
                userId,
                name,
                email,
                telephone,
                whatsapp,
                logo
            })

            return res.status(201).json({ msg: 'Restaurante criado com sucesso.' })
        } catch (err) {
            return res.status(500).json({ msg: 'Erro ao criar restaurante.', error: true })
        }
    }

    async readRestaurant(req, res) {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(404).json({ msg: 'Usuário não informado.' });
            }

            const restaurant = await Restaurant.findOne({ userId })

            if (!restaurant) {
                return res.status(404).json({ msg: 'Restaurante não encontrado.' });
            } 
            
            const typeDishes = await TypeDishes.find({ restaurantId: restaurant._id })

            const array = []

            for(let i = 0; i < typeDishes.length; i++){
                const dishes = await Dish.find({ typeDishesId: typeDishes[i]._id })
                array.push({
                    id: typeDishes[i]._id,
                    restaurantId: typeDishes[i].restaurantId,
                    name: typeDishes[i].name,
                    dishes: dishes
                })
            }

            return res.status(200).json({
                id: restaurant._id,
                name: restaurant.name,
                email: restaurant.email,
                telephone: restaurant.telephone, 
                whatsapp: restaurant.whatsapp, 
                logo: restaurant.logo,
                typeDish: array
            })
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async updateRestaurant(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async updateRestaurant(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }
}

export default new RestaurantController();