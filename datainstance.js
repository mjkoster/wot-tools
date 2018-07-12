/**
 * http://usejsdoc.org/
 */
var Ajv = require('ajv');
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

var schema = {
  "type": "array",
  "allOf": [
    {
	  "contains": {
  		"type": "object",
  		"properties": {
  		  "n": {
  		    "type": "string",
  		    "const": "5700"
  		  },
  		  "vb": {
  		    "type": "boolean",
  		    "@type": "iot:SwitchData"
  		  }
  		},
  		"required": ["n", "vb"]
      }
    },
    {
      "contains": {
  		"type": "object",
  		"properties": {
  		  "n": {
  		    "type": "string",
  		    "const": "5750"
  		  },
  		  "vs": {
  		    "type": "string",
  		    "@type": "iot:ApplicationType"
  		  }
  		},
  		"required": ["n", "vs"]
      }
    }
  ]
};

var instance = [
  {
    "n": "5700",
    "vb": true
  },
  {
	"n": "5750",
	"vs": "tester"
  }
];

function validate(schema, instance) {
	
	// Validate JSON type of the instance
	
	if ('number' == schema['type']) {
		if (typeof(instance) == "number") {
			//console.log('number');
			if (schema['const']) {
				if (instance != schema['const']) {
					return false;
				}
			}
			else {
				console.log("path:", schema);
			}
			return true;
		}
		else {
			//console.log('not number');
			return false;
		}
	};
	
	if ('string' == schema['type']) {
		if (typeof(instance) == "string") {
			//console.log('string');
			if (schema['const']) {
				if (instance != schema['const']) {
					return false;
				}
			}
			else {
				console.log("path:", schema);
			}
			return true;
		}
		else {
			//console.log('not string');
			return false;
		}
	};
	
	if ('boolean' == schema['type']) {
		if (typeof(instance) == "boolean") {
			//console.log('boolean');
			if (schema['const']) {
				if (instance != schema['const']) {
					return false;
				}
			}
			else {
				console.log("path:", schema);
			}
			return true;
		}
		else {
			//console.log('not boolean');
			return false;
		}
	};
	
	if ('object' == schema['type']) {
		if (typeof(instance) == "object" && ! Array.isArray(instance) ) {
			//console.log('object');
		}
		else {
			//console.log('not object');
		}
	};
	
	if ('array' == schema['type']) {
		if (Array.isArray(instance) ) {
			//console.log('array');
		}
		else {
			//console.log('not array');
		}
	};
	
	// Apply one or more schemas to the instance
	
	if (schema['anyOf']) {
		//console.log('anyOf');
		schema['anyOf'].forEach(function (subschema) {
			validate(subschema, instance);
			} );
	};
	
	if (schema['allOf']) {
		//console.log('allOf');
		schema['allOf'].forEach(function (subschema) {
			validate(subschema, instance);
			} );
	};
	
	if (schema['oneOf']) {
		//console.log('oneOf');
		schema['oneOf'].forEach(function (subschema) {
			validate(subschema, instance);
			} );
	};
	
	// apply a schema to one or more items or properties in the instance
	
	if (schema['items']) {
		//console.log('items');
		if (schema['additionalItems']) {
			//console.log('additionalItems');
		};
	};
	
	if (schema['contains']) {
		//console.log('contains');
		instance.forEach(function (item) {
			validate(schema['contains'], item);
			
		});
	};
	
	if (schema['properties']) {
		//console.log('properties');
		for ( var schemaproperty in schema['properties']) {
			if (schemaproperty in instance) {
				if ( validate( schema['properties'][schemaproperty], instance[schemaproperty] ) ) {
					//console.log(schema['properties'][schemaproperty]);
				}
			}
		}
	};
	
	if (schema['additionalProperties']) {
		//console.log('additionalProperties');
	};
	
	return;
}

var valid = ajv.validate(schema, instance);
console.log(valid);
if (!valid) 
	console.log(ajv.errors);

validate(schema, instance);