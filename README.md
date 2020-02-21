# Components
IATE common components

## How to use it

### errors
Example using express req and res objects:
```
    const { toHttp, VALIDATION_ERROR } = require('iate-components').errors
    const interactor = require('./interactor')

    const translator = {
        create: async (req, res) => {
            try {
                if (!req.params.id) throw new VALIDATION_ERROR('Missing param', 'ID is required')
                res.json(await interactor.create(req.body))
            } catch (error) {
                // translates application errors to HTTP semantics
                toHttp(error, res)
            }
        }
    }
```

### validator
Example using express req and res objects:
```
    const { toHttp } = require('iate-components').errors
    const { validator } = require('iate-components')

    const interactor = require('./interactor')

    const translator = {
        create: async (req, res) => {
            // ajv schema
            const schema = {
                additionalProperties: false,
                type: 'object',
                properties: {
                    file_name: { type: 'string' },
                    description: { type: 'string' },
                    content: { type: 'string' },
                    visibility: { enum: [ 'public', 'private' ]},
                },
                required: [ 'file_name', 'description', 'content', 'visibility' ]
            }
            try {
                // validates schema against req.body, throws a VALIDATION_ERROR if fails
                validator(schema, req.body)
                res.json(await interactor.create(req.body))
            } catch (error) {
                // translates application errors to HTTP semantics
                toHttp(error, res)
            }
        }

    }
``` 
