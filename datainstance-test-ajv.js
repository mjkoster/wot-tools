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

var valid = ajv.validate(schema, instance);
console.log(instance);
console.log(valid);
if (!valid) console.log(ajv.errors);
