import express from 'express';
import multer from 'multer';
import config from '../../config';
import { success, error } from '../../network/response';
import controller from './controller';

const router = express.Router();

// dest: file location
const upload = multer({
    dest: `public/${config.filesRoute}/`,
});

router.get('/', (req, res) => {
    const { chat: chatId } = req.query || null;

    controller.getMessages(chatId)
        .then((messageList) => {
            success(req, res, messageList, 200);
        })
        .catch(e => {
            error(req, res, 'Unexpected Error', 500, e);
        });
});

// middleware upload: multer add a image file
router.post('/', upload.single('file'), (req, res) => {
    const { chat, user, message } = req.body;
    const file = req.file;

    controller.addMessage(chat, user, message, file)
        .then((fullMessage) => {
            success(req, res, fullMessage, 201);    
        })
        .catch(e => {
            error(req, res, 'invalid information', 400, 'controller error');
        });
});

router.patch('/:id', (req, res) => {
    const { message } = req.body;
    const { id } = req.params;

    controller.updateMessage(id, message)
        .then((data) => {
            success(req, res, data, 200);
        })
        .catch(e => {
            error(req, res, 'Internal Error', 500, e);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    controller.deleteMessage(id)
        .then(() => {
            success(req, res, `message ${id} delete`, 200);
        })
        .catch(e => {
            error(req, res, 'Internal Error', 500, e);
        });
});

export default router;