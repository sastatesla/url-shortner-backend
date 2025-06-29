import Joi from 'joi';

const shortenUrl = {
	body: Joi.object({
		url: Joi.string()
			.uri({ scheme: ['http', 'https'] })
			.required()
			.label('URL')
			.messages({
				'any.required': '"URL" is required',
				'string.uri': '"URL" must be a valid URI (http or https)',
			}),
	}),
};

const resolveUrl = {
	params: Joi.object({
		shortCode: Joi.string().alphanum().min(4).max(10).required().label('Short Code'),
	}),
};

export default {
	shortenUrl,
	resolveUrl,
};
