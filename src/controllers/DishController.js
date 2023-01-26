import Dish from '../models/Dish.js'
import fs from 'fs'

class DishController {
    async createDish(req, res) {
        try {
            // const userId = req.userId;
            const { typeDishesId } = req.params;
            const file = req?.file;
            const { name, description, price} = req.body;

            if (!name, !description, !price) {
                return res.status(404).json({ msg: 'Campo não preenchido.' });
            }

            const dish = await Dish.findOne({ typeDishesId, name })

            if (dish) {
                return res.status(422).json({ msg: `Já possui um prato com nome ${name}.`})
            }
            
            await Dish.create({
                typeDishesId,
                name,
                description,
                price,
                image: file?.path? (file.destination + file.filename) : null,
                status: 'ativo'
            })

            return res.status(201).json({ msg: 'Prato criado com sucesso.' })
        } catch (err) {
            return res.status(500).json({ msg: 'Erro ao criar prato.', error: true })
        }
    }

    async readDish(req, res) {
        try {
            const { id } = req.params;
            
            if(!id){
                return res.status(404).json({ msg: 'Prato não informado.' });
            }

            const dish = await Dish.findById({ _id: id })
            
            if(!dish) {
                return res.status(404).json({ msg: 'Prato não encontrado.' });
            }

            return res.status(200).json(dish)
            
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async updateDish(req, res) {
        try {
            const { id, typeDishesId} = req.params;
            const file = req?.file;
            const { name, price, description, status} = req.body;

            if(!id, !typeDishesId, !name, !price, !description, !status) {
                return res.status(404).json({ msg: 'Campo não preenchido.' });
            }

            const updateDish = await Dish.findOne({ _id: id, typeDishesId})

            if(!updateDish){
                return res.status(404).json({ msg: 'Prato não encontrado.' });
            }

            const isDish = await Dish.findOne({ typeDishesId, name })

            if(isDish && isDish._id != id) { 
                return res.status(404).json({ msg: 'Já existe um prato com esse nome.' });
            }

            if(file){
                fs.unlinkSync(updateDish.image.replace("/", "\\"))
            }

            await updateDish.updateOne({
                name,
                price,
                description,
                status,
                image: file ? (file.destination + file.filename) : updateDish.image
            })

            return res.status(200).json({ msg: 'Prato atualizado com sucesso.' });
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async deleteDish(req, res) {
        try {
            const { id, typeDishesId} = req.params;

            if(!id, !typeDishesId) {
                return res.status(404).json({ msg: 'Campo não preenchido.' });
            }

            const dish = await Dish.findOne({ typeDishesId, _id: id })

            if(!dish) {
                return res.status(404).json({ msg: 'Prato não encontrado.' });
            }
            
            if(dish.image){
                fs.unlinkSync(dish.image.replace("/", "\\"))
            }

            await dish.deleteOne();
            
            return res.status(200).json({ msg: 'Prato excluido com sucesso.' })
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async readDishes(req, res) {
        try {
            const { typeDishesId } = req.params;

            if(!typeDishesId){
                return res.status(404).json({ msg: 'Tipo não encontrado.' });
            }

            const dishes = await Dish.find({ typeDishesId })

            if(!dishes) {
                return res.status(404).json({ msg: 'Nenhum parto encontrado.' });
            }

            return res.status(200).json(dishes)
            
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }
}

export default new DishController();