"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken"); // Importe JwtPayload para tipar o retorno
function isAuthenticated(req, res, done // O Fastify espera a função done() ser chamada
) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).send({ message: 'No token provided' });
    }
    const [, token] = authToken.split(' '); // Extrai o token da string "Bearer token"
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.sub) {
            return res.status(401).send({ message: 'Invalid token payload' });
        }
        // Atribui o ID do usuário ao objeto de requisição
        req.user = { id: decoded.sub };
        // Chama done() para continuar a execução da rota
        done();
    }
    catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).send({ message: 'Invalid token' });
    }
}
