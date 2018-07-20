/**
 * http://usejsdoc.org/
 */


class DataInstance {
	constructor ( schema, instance ) {
		this.schema = schema;
		this.instance = instance;
	};
	get() {
		return this.schema;
	};
};

test = new DataInstance(2,2);

console.log(test.get());