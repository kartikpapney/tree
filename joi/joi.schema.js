import Joi from 'joi'

const schemas = { 
    addNode: Joi.object().keys({ 
        parent: Joi.number().optional(),
        label: Joi.string().required() 
    }),
    removeNode: Joi.object().keys({ 
        _id: Joi.number().required()
    }) 
}; 

export default schemas;