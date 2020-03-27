const { celebrate, Joi, Segments } = require('celebrate');

const list = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
});

module.exports = {
  list, 
};
