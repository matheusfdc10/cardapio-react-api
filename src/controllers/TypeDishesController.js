import TypeDishes from '../models/TypeDishes.js'

class TypeDishesController {
    async createTypeDish(req, res) {
        try {
            // const userId = req.userId;
            const { name, restaurantId } = req.body;
            
            if (!name, !restaurantId) {
                return res.status(404).json({ msg: 'Campo não preenchido.' });
            }

            const restaurant = await TypeDishes.findOne({ restaurantId, name })

            if (restaurant) {
                return res.status(422).json({ msg: `Já possui um tipo de cardápio com nome ${name}.`})
            }
            
            await TypeDishes.create({
                restaurantId,
                name
            })

            return res.status(201).json({ msg: 'Tipo de cardápio criado com sucesso.' })
        } catch (err) {
            return res.status(500).json({ msg: 'Erro ao criar Tipo de cardápio.', error: true })
        }
    }

    async readTypeDish(req, res) {
        try {
            
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async updateTypeDish(req, res) {
        try {
            const { restaurantId } = req.params;
            const { name, id } = req.body;

            if (!name, !id) {
                return res.status(404).json({ msg: 'Campo não preenchido.' });
            }

            const restaurant = await TypeDishes.findOne({ restaurantId, name })

            if (restaurant) {
                return res.status(422).json({ msg: `Já possui um tipo de cardápio com nome ${name}.`})
            }

            const updateRestaurant = await TypeDishes.findById(id);

            if(!updateRestaurant) {
                return res.status(404).json({ msg: 'Tipo de prato não encontrado.'})
            }
 
            await updateRestaurant.updateOne({ name })

            return res.status(200).json({ msg: 'Tipo de prato atualizado com sucesso.'});
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async deletTypeDish(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }
}

export default new TypeDishesController();