import Joi from "joi";

export const getTodoQuerySchema = Joi.object({
  q: Joi.string().optional(),
}).options({
  stripUnknown: true,
});

export const createTodoBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "description is required",
  }),
});

export const updateTodoBodySchema = Joi.object({
  title: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});
