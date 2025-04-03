const Joi = require('joi');

const knowledgeItemSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  vettedDate: Joi.date().required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.number().integer()).optional()
});
  
function validate(req, res, next) {
  const { error } = knowledgeItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', details: error.details });
  }
  next();
}

module.exports = validate;
