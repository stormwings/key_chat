import jwt from'./jwt';

export const sessionMiddleware = (action) => (req, res, next) => {
    switch(action) {
        case 'owner':
            const owner = req.body.id;
            jwt.check.own(req, owner);
            next();
            break;
        
        case 'logged':
            jwt.check.logged(req);
            next();
            break;

        default:
            next();
    }
}