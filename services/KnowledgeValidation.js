const Joi = require('joi');

const fullKnowledgeItemSchema  = Joi.object({ //should be used in the create - all fields are required!
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  vettedDate: Joi.date().required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional()
});

const paritalKnowledgeItemSchema = Joi.object({ //should be used in PATCH - minimum 1 field to update
  title: Joi.string(),
  subtitle: Joi.string(),
  vettedDate: Joi.date(),
  content: Joi.string(),
  tags: Joi.array().items(Joi.string())
}).min(1)

  
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);  // validates request body with the given schema
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }
    next();
  };
};



module.exports = {
  validateFull: validate(fullKnowledgeItemSchema),
  validatePartial: validate(paritalKnowledgeItemSchema)
};
