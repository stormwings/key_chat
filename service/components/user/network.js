import express from 'express';
import { success, error } from '../../network/response';
import controller from './controller';
import { sessionMiddleware } from "./middleware";

const router = express.Router();

router.get('/', sessionMiddleware("logged"), (req, res) => {
    controller.listUsers()
        .then(users => {
            success(req, res, users, 200);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        });
});

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then(data => {
            success(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal error', 500, err);
        });
});

router.post("/login", (req, res) => {
  controller
    .login(req.body.username, req.body.password)
    .then((token) => {
      success(req, res, token, 200);
    })
    .catch((err) => {
      error(req, res, "Internal error", 500, err);
    });
});

router.post("/register", (req, res) => {
  controller
    .register(req.body.username, req.body.password)
    .then((token) => {
      success(req, res, token, 201);
    })
    .catch((err) => {
      error(req, res, "Internal error", 500, err);
    });
});

export default router;