# engined-validator

Field validator for engined, which is base on joi.

[![NPM](https://nodei.co/npm/engined-validator.png)](https://nodei.co/npm/engined-validator/)

## Installation

Install via NPM:

```shell
npm install engined-validator
```

## Usage

Start engined-validator service in engined, see example below:

```javascript
const { Manager } = require('engined');
const ValidatorService = require('engined-validator');

const validator = ValidatorService();

const main = async () => {

	// Create manager
	let serviceManager = new Manager({ verbose: true });

	// Adding service to manager
	serviceManager.add('Validator', validator);

	// Start all services
	await serviceManager.startAll();
};

main();
```

## Using Validator Methods

Pretty easy to get validator agent to check data.

```javascript
let validator = this.getContext('Validator');

// Check
let data = {
	email: 'abc@example.com'
};

// It should throw error because there is no password field.
validator.validate({
	email: Joi.string().email().required(),
	password: Joi.string().email().required()
}, data);
```

## License
Licensed under the MIT License
 
## Authors
Copyright(c) 2017 Fred Chien（錢逢祥） <<cfsghost@gmail.com>>
