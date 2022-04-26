import prisma from '@prisma/client';

import Joi from 'joi';
import Controller from './Controller.js';

const { Room, SeatType, SeatStatus } = prisma;
const schema = Joi.object({
  sessionDate: Joi.date().required(),
  room: Joi.string().valid(...Object.values(Room)).required(),
  caption: Joi.boolean().required(),
  movie: Joi.object({ connect: Joi.object({ id: Joi.string().required() }) }),
  SessionSeat: Joi.any(),
});

class SessionController extends Controller {
  constructor() {
    super({
      entity: 'session',
      validationSchema: schema,
      prismaOptions: {
        include: {
          movie: true, Ticket: true, SessionSeat: true,
        },
      },
    });
    this.maxOfColumns = 5;
    this.maxofRows = 5;
  }

  generateSeats() {
    const seats = [];
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let x = 0; x < this.maxOfColumns; x++) {
      for (let y = 0; y < this.maxofRows; y++) {
        seats.push({
          line: alphabet[x],
          colum: y + 1,
          type: SeatType.STANDART,
          status: SeatStatus.AVALIABLE,
        });
      }
    }
    return seats;
  }

  store(request, response) {
    // eslint-disable-next-line prefer-destructuring
    const movieId = request.body.movieId;

    delete request.body.movieId;

    request.body = {
      ...request.body,
      movie: {
        connect: { id: movieId },
      },
      SessionSeat: {
        createMany: {
          data: this.generateSeats(),
        },
      },
    };

    super.store(request, response);
  }
}

export default SessionController;
