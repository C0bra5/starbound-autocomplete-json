'use babel';

import CONSTS from './constants.js';
import utils from './utilities.js';

export default class Enumeration{

	constructor(node){

		if (utils.isObject(node)) {
			this.value = node[CONSTS.NODE_VALUE_KEY];
			this.description = node[CONSTS.NODE_DESCRIPTION_KEY];
			this.link = node[CONSTS.NODE_LINK_KEY];
		}
		else if(utils.isString(node)) {
			this.value = node;
			this.description = node
		}
	}

	/**
	 * duplicates the current object
	 */
	clone() {
		let clone = new Enumeration();
		for (let key in this) {
			clone[key] = this[key];
		}
		return clone;
	}

	/**
	 * checks if the enumeration has a value
	 */
	hasValue() {
		return utils.isString(this.value);
	}

	/**
	 * formats the object for atom's auto-complete api
	 */
	format(){
		return {
			text : this.value,
			description : this.description || 'unknown',
			descriptionMarkdown : this.description || 'unknown',
			type : 'value',
			leftLabel : 'string',
			descriptionMoreURL : this.link,
			isProp : true
		}
	}

	/**
	 * checks whether or not the enumeration includes a prefix for searching
	 */
	match(prefix) {
		return utils.isString(prefix) && this.hasValue() && `${this.value}`.toLowerCase().includes(prefix);
	}

}
