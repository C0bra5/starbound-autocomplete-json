'use babel';
import CONSTS from './constants.js'
import utils from './utilities.js'
import Reference from './reference.js'

export default class Documentation{

	constructor (input) {
		//create
		this.fileStarters = {};
		this.refs = {};

		for(let node of input){
			try{
				if (utils.isString(node[CONSTS.NODE_NAME_KEY])) {
					node = this.addRef(node);

					if (node.isFileStarter()) {
						this.addFileStarter(node);
					}

				}
			}
			catch (error) {
				if (CONSTS.DEBUG) {
					console.error(error);
				}
			}
		}
	}

	/**
	 * registers a node as a file root node
	 */
	addFileStarter(node){
		this.fileStarters[node.name.toLowerCase()] = node;
	}

	/**
	 * adds a reference to the list of re-usable references
	 */
	addRef(node){
		let ref = new Reference(node);
		this.refs[ref.name] = ref;
		return ref;
	}

	/**
	 * gets the list of suggestions for a specific file type, using a specific path
	 */
	getSuggestionsForFileType(extention, path, prefix){
		//check if the extention is null
		if (!utils.isString(extention)) {
			throw new Error("The passed extention is not a string.\r\nThe extention parameter is required");
		}
		//check if the path is null
		if (!utils.isArray(path)) {
			throw new Error("The passed path is not an array.\r\nThere is no reason to get a suggestion list for a file type if there is no content path.")
		}
		try{
			//get rid of the first element in line, it's useless
			path.shift();
			//get the suggestion list
			return this.getSuggestions(path, this.fileStarters[extention], prefix);
		} catch (error) {
			if (CONSTS.DEBUG) {
				console.error(error);
			}
			//default to nothing found
			return [];
		}
		//safe unreachable code
		return [];
	}


	/**
	 * gets the suggestion for a specific node tree using a prefix and tree path
	 */
	getSuggestions(path, node, prefix) {
		//do null check on node to see if the doc contains anything
		if (utils.isNull(node)) {
			if (CONSTS.DEBUG) {
				console.warn('did not find anything');
			}
			return [];
		}

		//make sure the node has been initialised
		node.initialize(this.refs);

		//return content if we reach the end of path
		if (path.length === 0) {
			if (node.hasEnumeration()) {
				return this.getValues(node.enumeration, prefix, true);
			}
			else if (node.hasContent()) {
				return this.getValues(node.content, prefix, false)
			}
			else if (node.type == CONSTS.DATATYPE_BOOLEAN || node.type == CONSTS.DATATYPE_BOOLEAN2) {
				let ret =[]
				if ("true".includes(prefix)) {
					ret.push({
						text : "true",
						description : "true",
						descriptionMarkdown : 'true',
						type : 'value',
						leftLabel : 'boolean'
					})
				}
				if ("false".includes(prefix)) {
					ret.push({
						text : "false",
						description : "false",
						descriptionMarkdown : 'false',
						type : 'value',
						leftLabel : 'boolean'
					})
				}
				return ret;
			}
			else {
				if (CONSTS.DEBUG) {
					console.warn(`Node ${node.name} has no content.`);
				}
				return [];
			}
		}

		let current = path.shift();

		if (utils.isNull(node.content)) {
			if (CONSTS.DEBUG) {
				console.warn(`did not find anything in node "${node.name}", content is empty.`);
			}
			return [];
		}
		else if (node.isType(CONSTS.DATATYPE_OBJECT)) {
			//else look for next path section in current
			return this.getSuggestions(path,node.content[current],prefix);
		}
		else if (node.isType(CONSTS.DATATYPE_ARRAY)) {
			//initialize the content
			node.content.initialize(this.refs)
			//check that it's looking for either an array or object and
			//that the content of the array is either an obejct or an
			//array
			if (
				(
					current === CONSTS.PATH_ARRAY &&
					node.content.isType(CONSTS.DATATYPE_ARRAY)
				) ||
				(
					current === CONSTS.PATH_OBJECT &&
					node.content.isType(CONSTS.DATATYPE_OBJECT)
				)
			) {
				return this.getSuggestions(path,node.content,prefix);
			}
			else {
				if (CONSTS.DEBUG) {
					console.warn(
						`was looking for "${current}", did not find the ` +
						`right content type, found ${node.content.type}.`
					);
				}
			}
		}
	}


	/**
	 * gets the formatted values for a list of nodes or enumerations
	 */
	getValues(values,prefix,isEnum) {
		let output = [];
		for (let key in values) {
			if (values[key].match(prefix)){
				if (!isEnum) {
					//also applies bases
					if (values[key].isRef()) {
						values[key].applyReference(this.refs);
					}
					if (values[key].hasBase()) {
						values[key].applyBase(this.refs);
					}
				}
				output.push(values[key].format())
			}
		}
		return output;
	}

}
