'use babel';

class Utilities {
	/**
	 * checks if the object is a string
	 */
	isString (obj) {
		return (typeof obj) === 'string';
	}

	/**
	 * checks if the object is a boolean
	 */
	isBoolean (obj) {
		return (typeof obj) === 'boolean';
	}

	/**
	 * checks if the object is null
	 */
	isNull (obj) {
		return (typeof obj) === 'undefined';
	}

	/**
	 * checks if the object is an object
	 */
	isObject (obj) {
		//an array will also respond true to an object, so we gotta make shure
		//it's not an array.
		return (typeof obj) === 'object' && !this.isArray(obj);
	}

	/**
	 * checks if the object is an object and that it contains more than one key
	 */
	isNonEmptyObject (obj) {
		//an array will also respond true to an object, so we gotta make shure
		//it's not an array.
		return this.isObject(obj) && Object.keys(obj).length > 0;
	}

	/**
	 * checks if the object is an object and that it contains no keys
	 */
	isEmptyObject (obj) {
		//an array will also respond true to an object, so we gotta make shure
		//it's not an array.
		return this.isObject(obj) && Object.keys(obj).length === 0;
	}


	/**
	 * checks if the object is an array
	 */
	isArray (obj) {
		return Array.isArray(obj);
	}

	/**
	 * checks if the object is an array and contains more than one item
	 */
	isNonEmptyArray (obj) {
		return this.isArray(obj) && obj.length > 0;
	}

	/**
	 * checks if the object is an array and does not contain any item
	 */
	isEmptyArray (obj) {
		return this.isArray(obj) && obj.length === 0;
	}
}

export default new Utilities();
