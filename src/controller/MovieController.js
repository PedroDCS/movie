/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import prisma from '@prisma/client';
import Joi from 'joi';
import Controller from './Controller.js';

const { ParentalGuidance } = prisma;
const schema = Joi.object({
  director: Joi.string().required().min(3).max(50),
  languages: Joi.array().items(Joi.string()),
  name: Joi.string().required(),
  rating: Joi.number().max(10),
  duration: Joi.string().required(),
  thumbnail: Joi.string().allow(''),
  description: Joi.string().required().max(10000),
  parental_guidance: Joi.string().required().valid(
    ...Object.values(ParentalGuidance),
  ),
});

class MovieController extends Controller {
  constructor() {
    super({ entity: 'movie', validationSchema: schema });
  }
}

export default MovieController;

/*
"description": "Interestelar 2",
"parental_guidance": "GENERAL_AUDIENCE",
"director": "Christopher Nolan",
"duration": "250",
"name": "Interestelar",
"rating":8.66,
"languages": ["Portuguese", "English"],
"thumbnail": "https://br.web.img3.acsta.net/pictures/14/10/31/20/39/476171.jpg"
*/
