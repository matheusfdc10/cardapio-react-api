import User from '../models/User.js'
import { createPasswordHash } from '../services/auth.js';

class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            if (!name, !email, !password, !confirmPassword) {
                return res.status(404).json({ msg: 'Campo não preenchido.' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ msg: 'Senhas não conferem.' });
            }

            const user = await User.findOne({ email });

            if (user) {
                return res.status(422).json({ msg: 'Email existente.' });
            }

            const passwordHash = await createPasswordHash(password)

            await User.create({ name, email, password: passwordHash })

            return res.status(201).json({ msg: 'Usuario criado com sucesso.' })
        } catch (err) {
            return res.status(500).json({ msg: 'Erro ao criar usuário.', error: true })
        }
    }

    async readUser(req, res) {
        try {
            const id = req.userId;
            
            if (!id) {
                return res.status(404).json({ msg: 'Usuário não informado.' });
            }

            const user = await User.findById(id, '-password');

            if(!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado.' })
            }

            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async updateUser(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }

    async updateUser(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ msg: '.', error: true })
        }
    }
}

export default new UserController();