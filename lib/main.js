'use babel';

import CONSTS from './constants.js';
import Documentation from './documentation.js';
import utils from './utilities.js';


let doc = new Documentation(require("./beta.json"));

if (CONSTS.DEBUG) {
	console.log(doc);
}

export function activate() {
	//PROVIDERS = []
}

export function provideAutocomplete() {
	let ret = {
		selector : '.source.json',
		inclusionPriority : 0,
		getSuggestions : function(options) {
			if(!options.editor.getBuffer().file){
				return [];
			}
			const editor = options.editor;
			const activatedManually = options.activatedManually;
			const buffer = editor.getBuffer();
			const bufferPosition = options.bufferPosition;
			const scopeDescriptor = options.scopeDescriptor;
			let lastScope = scopeDescriptor.scopes[scopeDescriptor.scopes.length - 1];
			const cursorPosition = buffer.characterIndexForPosition(bufferPosition);
			//check if autocomplete shold run
			switch (lastScope) {
				case "string.quoted.double.json":
					break;
				case "punctuation.definition.string.end.json":
					if (options.prefix === "" && buffer.getTextInRange([[bufferPosition.row,bufferPosition.column-1],[bufferPosition.row,bufferPosition.column+1]] !== "\"\""))
							return [];
					break;
				default:
					if(scopeDescriptor.scopes[scopeDescriptor.scopes.length - 2] === "meta.structure.dictionary.value.json"){
						lastScope = "meta.structure.dictionary.value.json"
					}
					else{
						return [];
					}
			}

			//find file extention
			let fileExt = require('path').extname(editor.buffer.file.path);
			fileExt = fileExt.startsWith(".") ? fileExt.substring(1) : fileExt;


			let loc
			let prefix = getPrefix(bufferPosition, buffer).toLowerCase();
			if (lastScope == "meta.structure.dictionary.value.json") {
				loc = getLocation(buffer,bufferPosition,true,prefix);
				try{
					prefix = prefix.match(/\b([^\s]*$)/,"$1")[0];
				}
				catch(e){
					return [];
				}
			}
			else {
				loc = getLocation(buffer,bufferPosition);
			}

			//get suggestions
			if (CONSTS.DEBUG) {
				console.log(loc);
			}



			//get the suggestions
			if (utils.isArray(loc)) {
				return new Promise( (resolve) =>{

					let suggestions = doc.getSuggestionsForFileType(fileExt,loc,prefix)
					if (CONSTS.DEBUG) {
						console.log(suggestions);
					}
					resolve(suggestions);
				} );
			}
			else {
				return null;
			}


		}
	};
	return ret;
}

function getPrefix(bufferPosition, buffer){

	let text = buffer.getTextInRange([[0,0],bufferPosition]);

	let testPos = text.lastIndexOf("\"");
	while (text.charAt(testPos-1) === "\\"){
			testPos = text.lastIndexOf("\"",testPos-1);
	}

	text = text.substring(testPos+1);
	//console.log(text);
	return text;
}





let createPath = function(path, out = []) {
	//get first character
	let next = path.substr(0,1);
	//clear it from the string
	path = path.substring(1);
	//find layers
	switch (next){
		case "["://finds array layers
			out.push(CONSTS.PATH_ARRAY);
			return createPath(path,out);

		case "{"://find element layers
			out.push(CONSTS.PATH_OBJECT);
			return createPath(path,out);

		case "\""://append useless "" at the end and find keys/strings
			let end = path.indexOf("\"");
			out.push(path.substring(0,end));
			path = path.substring(end+2);
			if (path.startsWith("{") || path.startsWith("["))
				path = path.substring(1);
			return createPath(path,out);

		default://clean up time
			//pop the last element it's a "" we don't need it
			if (out[out.length-1] == "") {
				out.pop();
			}

			//fix the escaped escaped doubles quotes, no it's not a typo
			out.forEach(function(elem,index) {
				out[index] = elem.replace(/∏∏∏∏∏∏/g,"\"");
			});
			//console.log(out);
			return out;
	}
}
function getLocation(buffer, bufferPosition, removePrefix, prefix) {

	//get the text before the cursor
	let text = buffer.getTextInRange([[0,0],bufferPosition]);

	//escape escapers    \" { } [ ]
	text = text.replace(/(∏|Γ|γ|Φ|φ)/g,"\\$1");
	//escaping escaped quotes
	text = text.replace(/\\\"/g,"∏∏∏∏∏∏");

	//it's string sanitisation time baby
	//this is totally a hack, i need to figure out a better sanitisation method for  that
	text = text.replace(/"([^"]*?)("|$)/g, (all,content,endquote) => {
		content = content.replace(/\{/g, 'ΓΓΓΓΓΓ');
		content = content.replace(/\}/g, 'γγγγγγ');
		content = content.replace(/\[/g, 'ΦΦΦΦΦΦ');
		content = content.replace(/\]/g, 'φφφφφφ');
		return `"${content}${endquote}`;
	});

	//newline fixes
	text = text.replace(/\r|\n|\r\n|\n\r/g,"");
	text = text.replace(/[\t\v\f ]+/g,' ');

	//getting rid of unneded object and arrays
	text = text.replace(/\{[^\{\}]+?\}|\[[^\[\]]+?\]/g, "null");
	while (text.match(/\{[^\{\}]+?\}|\[[^\[\]]+?\]/)) {
		text = text.replace(/\{[^\{\}]+?\}|\[[^\[\]]+?\]/g, "null");
	}
	//getting rid of unused values
	//                   key               bool,bool ,null,string    ,digits
	text = text.replace(/"[^"]*?"\s*?:\s*?(true|false|null|("[^"]*?")|(-?[0-9]*?(\.[0-9]*)?([E|e][+-]?[0-9]*)?))?\s*?,\s*/g,"");

	//getting rid of stuff in netween start of arry and item to lookup
	text = text.replace(/\[([^\[\{]+)/g,(all, content) => {
		content = content.replace(/(true|false|null|("[^"]*")|(-?[0-9]+(\.[0-9]*)?([E|e][+-]?[0-9]*)?)),?/g,"");
		return `[${content}`
	});

	//order 66 the whitespace
	text = text.replace(/\s+/g,"");

	if (removePrefix) {
		//also order 66 the prefix
		prefix = prefix.replace(/\s+/g,"");
		if (text.endsWith(prefix)){
			text = text.substring(0,text.length - prefix.length)
		}
		return createPath(text)
	}


	if (text.replace(/[^"]/g,'').length % 2 === 0){
		return null;
	}

	let path = createPath(text);
	if(utils.isArray(path)){
		for(let index in path){
			path[index] = path[index].replace(/(\\Γ)?Γ{6}/g,"$1{");
		}
	}

	return path;
}
