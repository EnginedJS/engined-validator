const Joi = require('joi');
const { Service } = require('engined');

module.exports = (opts = {}) => class extends Service {

	constructor(context) {
		super(context);
	}

	async start() {

		let agent = {
			validate: async (validationRules, data) => {

				try {
					// Validate
					return await new Promise((resolve, reject) => {

						Joi.validate(data, validationRules, { abortEarly: false }, (err, value) => {
							if (err)
								return reject(err);

							resolve(value);
						});
					});
				} catch(e) {

					switch(e.name) {
					case 'ValidationError':
						let err = new Error(e.name);
						err.name = 'ValidationFailed';
						err.errors = e.details.map((error) => {
							return {
								field: error.path,
								type: error.type
							};
						});
						throw err;
					}

					throw e;
				}
			}
		};

		this.getContext().set('Validator', agent);
	}

	async stop() {

		this.getContext().set('Validator', undefined);
	}
}
