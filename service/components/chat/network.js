import express from 'express';
import { success, error } from '../../network/response';
import controller from './controller';

const router = express.Router();

router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    controller.listChats(userId)
        .then(users => {
            success(req, res, users, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        });
});

router.post('/', (req, res) => {
    const { users } = req.body;

    controller.addChat(users)
        .then(data => {
            success(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        });
});

export default router;