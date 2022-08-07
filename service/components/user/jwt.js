import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const handleError = (message, code) => {
  const e = new Error(message);

  if (code)
    e.statusCode = code;

  return e;
};

export const jwtSignature = (data) => jwt.sign(data, secret);

const jwtVerify = (token) => jwt.verify(token, secret);

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);

    // check if user's token is the owner
    if (decoded.id !== owner)
      throw handleError("No puedes hacer esto", 401);
  },

  logged: (req, owner) => {
    const decoded = decodeHeader(req);
    // console.log({ decoded, owner });
  },
};

const getTokenFromHeader = (auth) => {
  if (!auth)
    throw handleError("No viene token", 401);

  // check correct format token
  if (auth.indexOf("Bearer ") === -1)
    throw handleError("Formato invalido", 401);

  // Bearer => give access to this token's owner
  // Authorization: Bearer <token>
  let token = auth.replace("Bearer ", "");

  return token;
}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || "";
  const token = getTokenFromHeader(authorization);
  const decoded = jwtVerify(token);

  req.user = decoded;

  return decoded;
}

export default {
  check,
};
