'use babel';

import CONSTS from './constants.js';
import utils from './utilities.js';
import Enumeration from './enumeration.js'

export default class Reference{

	constructor(node){
		this.initialized = false;

		if (utils.isObject(node)) {
			//check if node is a reference
			this.ref = node[CONSTS.NODE_REF_KEY];
			if (this.isRef()) {
				this.name = this.ref;
			} else {

				this.name = node[CONSTS.NODE_NAME_KEY];
				this.type = node[CONSTS.NODE_TYPE_KEY] || CONSTS.DATATYPE_OBJECT;
				this.description = node[CONSTS.NODE_DESCRIPTION_KEY];
				this.required = node[CONSTS.NODE_REQUIRED_KEY];
				this.base = node[CONSTS.NODE_BASE_KEY];
				this.fileType = node[CONSTS.NODE_FILE_TYPE_KEY];
				this.link = node[CONSTS.NODE_LINK_KEY];



				this.enumeration = [];
				let enumerationToParse = node[CONSTS.NODE_ENUMERATION_KEY];
				if (this.type === CONSTS.DATATYPE_ARRAY || this.type === CONSTS.DATATYPE_STRING) {
					if (utils.isArray(enumerationToParse)) {
						for (let toParse of enumerationToParse) {
							this.enumeration.push(new Enumeration(toParse,this));
						}
					}
				}
				else if (!utils.isNull(enumerationToParse)) {
					console.warn(`Only arrays and strings can have enumerations, node "${this.name}" should not have one as it is an "${this.type}"`)
				}



				let contentToParse = node[CONSTS.NODE_CONTENT_KEY];
				if (this.type === CONSTS.DATATYPE_ARRAY) {
					//if no content, content is null
					if (utils.isNonEmptyObject(contentToParse) || utils.isString(contentToParse)) {
						this.content = new Reference(contentToParse,this);
					}
					else if (!utils.isNull(contentToParse)) {
						throw new Error('Attempting to create an array node with non-standard content, there should only be one content element');
					}
				}
				else if (this.type === CONSTS.DATATYPE_OBJECT) {
					if (utils.isArray(contentToParse)) {
						if(contentToParse.length > 0) {
							this.content = {};
							for (let toParse of contentToParse){
								if (utils.isObject(toParse) || utils.isString(toParse)) {
									let parsed = new Reference(toParse,this);
									this.content[parsed.name || parsed.ref] = parsed;
								}
								else {
									throw new Error('Attempting to create an object node with non-standard content, the contents of the content object should be a string or an object.');
								}
							}
						}
						if (utils.isEmptyObject(this.content)) {
							this.content = null;
						}
					}
					else if(!utils.isNull(contentToParse)) {
						throw new Error('Attempting to create an object node with non-standard content, the content proprety should be an array.');
					}
				}
				else if(!utils.isNull(contentToParse)) {
					console.warn(`Types other than array and content cannot have content. node "${this.name}" should not have one.`);
				}
			}
		}
		else if (utils.isString(node)) {
			this.name = node;
			this.ref = node;
		}
	}

	/**
	 * creates a copy of the current object
	 */
	clone() {
		let clone = new Reference();
		for (let key in this) {
			clone[key] = this[key];
		}
		return clone;
	}


	//has checks

	/**
	 * checks if the current object is a child of an other ty
	 */
	hasBase() {
		return utils.isString(this.base) && this.name != this.base;
	}

	/**
	 * checks if the current node has a name
	 */
	hasName(){
		return utils.isString(this.name);
	}

	/**
	 * checks if the current node has a data type
	 */
	hasType(){
		return utils.isString(this.type);
	}

	/**
	 * checks if the current object has a content list
	 */
	hasContent() {
		switch (this.type) {
			case CONSTS.DATATYPE_ARRAY:
			case CONSTS.DATATYPE_OBJECT:
				return utils.isNonEmptyObject(this.content);
			default:
				return false;
		}
	}

	/**
	 * checks if the current node has an enumeration
	 */
	hasEnumeration(){
		return utils.isNonEmptyArray(this.enumeration) &&
		       this.enumeration.length > 0;
	}


	//checks if the node is of a specific datatype
	isType(type, checkContent = false) {
		switch (type){
			case CONSTS.DATATYPE_INTEGER:
			case CONSTS.DATATYPE_INTEGER2:
				return this.type === CONSTS.DATATYPE_INTEGER ||
				       this.type === CONSTS.DATATYPE_INTEGER2;
			case CONSTS.DATATYPE_BOOLEAN:
			case CONSTS.DATATYPE_BOOLEAN2:
				return this.type === CONSTS.DATATYPE_BOOLEAN ||
				       this.type === CONSTS.DATATYPE_BOOLEAN2;
			default:
				return this.type === type;
		}
	}

	//is Checks
	/**
	 * checks if the current node is a file root
	 */
	isFileStarter(){
		return utils.isString(this.fileType);
	}

	/**
	 * checks if the current node is a reference
	 */
	isRef(){
		return utils.isString(this.ref);
	}

	initialize(refs) {
		if(!this.initialized) {
			this.initialized = true;
			//then apply base
			if (this.hasBase()) {
				this.applyBase(refs);
			}
			if(this.hasContent()) {
				if(this.isType(CONSTS.DATATYPE_ARRAY)) {
					if (this.content.isRef()) {
						let ref = refs[this.content.ref];
						if (utils.isNull(ref)) {
							console.warn(`warning: reference "${key}" does not exists, it cannot be applied`);
							this.content = null;
						}
						else {
							ref.initialize(refs);
							this.content = ref;
						}
					}
				}
				else if (this.isType(CONSTS.DATATYPE_OBJECT)) {
					for (let key in this.content) {
						if (this.content[key].isRef()) {
							let ref = refs[key];
							if (utils.isNull(ref)) {
								console.warn(`warning: reference "${key}" does not exists, it cannot be applied`);
								this.content[key] = null;
							}
							else {
								ref.initialize(refs);
								this.content[key] = ref;
							}
						}
					}
				}
			}
		}
	}

	/**
	 * applies the base on the current object
	 */
	applyBase(refs) {
		//fist check if the reference has a base
		if (!this.hasBase()){
			throw new Error(`Attempting to apply base on reference "${this.name}", it has no base type declared.`);
		}

		//check that the ref list passed is not null
		if (!utils.isObject(refs)){
			throw new Error("The passed list of references isn't an array.");
		}

		let base = refs[this.base];
		if (utils.isNull(base)) {
			throw new Error(`The reference ${this.base} cannot be applied as a base for reference ${this.name} as it does not exists.`)
		}

		base.initialize(refs);

		this.name =        utils.isString(this.name)       ? this.name        : base.name;
		this.type =        utils.isString(this.type)       ? this.type        : base.type;
		this.description = utils.isNull(this.description)  ? this.description : base.description;
		this.required =    utils.isBoolean(this.required)  ? this.required    : base.required;
		this.base = null;
		this.ref = null;
		this.fileType =    utils.isString(this.fileType)   ? this.fileType    : base.fileType;
		this.content =     utils.isObject(this.content)    ? this.content     : {};
		this.enumeration = utils.isArray(this.enumeration) ? this.enumeration : [];
		this.link =        utils.isString(this.link)       ? this.link        : base.link;

		//merge trees
		if(this.isType(CONSTS.DATATYPE_OBJECT)) {
			if (base.hasContent()) {
				for (let key in base.content) {
					this.content[key] = base.content[key];
				}
			}
			if (!this.hasContent()) {
				this.content = null;
			}
		}
		else {
			this.content = false;
		}

		//merge enumerations
		if (base.hasEnumeration()) {
			for (let key in base.enumeration) {
				this.enumeration[key] = base.enumeration[key];
			}
		}

		//returns the merged object
		return this;
	}


	/**
	 * formats the object for atom's auto-complete api
	 */
	format(){
		return {
			text : this.name,
			description : this.description || 'unknown',
			descriptionMarkdown : this.description || 'unknown',
			type : 'attribute',
			leftLabel : this.type,
			descriptionMoreURL : this.link
		}
	}


	/**
	 * checks whether or not the reference includes a prefix for searching
	 */
	match(prefix) {
		return utils.isString(prefix) && this.hasName() && `${this.name}`.toLowerCase().includes(prefix);
	}



}
