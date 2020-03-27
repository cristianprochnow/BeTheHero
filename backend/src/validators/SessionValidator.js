const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required().alphanum().trim(),
  }),
});

module.exports = {
  create, 
};
