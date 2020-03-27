const { celebrate, Segments, Joi } = require('celebrate');

const list = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1),
  }),
});

const create = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().max(255).trim(),
    description: Joi.string().required().max(255).trim(),
    value: Joi.number().required().precision(2).positive(),
  }),
});

const remove = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required().min(0),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

module.exports = {
  list, 
  create, 
  remove, 
};
