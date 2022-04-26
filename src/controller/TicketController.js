import prisma from '@prisma/client';
import Joi from 'joi';
import Controller from './Controller.js';

const { TicketType } = prisma;
const schema = Joi.object({
  price: Joi.number().precision(2).required(),
  type: Joi.string().valid(...Object.values(TicketType)).required(),
  session: Joi.object({ connect: Joi.object({ id: Joi.string().required() }) }),
  user: Joi.object({ connect: Joi.object({ id: Joi.string().required() }) }),
  purchaseDate: Joi.date(),
});

class TicketController extends Controller {
  constructor() {
    super({
      entity: 'ticket',
      validationSchema: schema,
      prismaOptions: {
        include: {
          session: true,
          user: true,
        },
      },
    });
  }

  store(request, response) {
    const { sessionId, userId } = request.body;

    delete request.body.sessionId;
    delete request.body.userId;

    request.body = {
      ...request.body,
      session: {
        connect: { id: sessionId },
      },
      user: {
        connect: { id: userId },
      },
      purchaseDate: new Date(),
    };

    super.store(request, response);
  }
}

export default TicketController;
