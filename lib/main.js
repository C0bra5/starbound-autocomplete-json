'use babel'

import {documentation} from './documentation'
import {typedefs} from './typedefs'
import {reusableSuggestions} from './reusable-suggestions'
import {reusableDocumentation} from './reusable-documentation'

//console.log(documentation)
//console.log(typedefs)
//console.log(reusableSuggestions)
//console.log(reusableDocumentation)

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
			const lastScope = scopeDescriptor.scopes[scopeDescriptor.scopes.length - 1];
			const cursorPosition = buffer.characterIndexForPosition(bufferPosition);

			//check if autocomplete shold run
			switch (lastScope) {
				case "invalid.illegal.expected-dictionary-separator.json":
					return [];
				case "punctuation.definition.string.end.json":
					if (options.prefix === "" && buffer.getTextInRange([[bufferPosition.row,bufferPosition.column-1],[bufferPosition.row,bufferPosition.column+1]] !== "\"\""))
							return [];
					break;
				case "string.quoted.double.json":
					break;
				default:
					return [];
			}


			const prefix = getPrefix(bufferPosition, buffer).toLowerCase();


			//find file extention
			let fileExt = require('path').extname(editor.buffer.file.path);
			fileExt = fileExt.startsWith(".") ? fileExt.substring(1) : fileExt;

			//get suggestions
			var loc = getLocation(buffer,bufferPosition);
			let suggestions = startSearch(fileExt,loc);

			//console.log(suggestions)
			//console.log(scopeDescriptor.scopes)
			//console.log(getLocation(buffer,bufferPosition))

			//get formatted suggestions
			let formatted = [];
			try {
				Object.keys(suggestions).forEach(function(elem,index){
					if (elem.toLowerCase().includes(prefix)) {
						let item = {};
						item.text = elem;
						try {
							if (typeof(suggestions[elem]) === "object") {
								let typedef = suggestions[elem];
								if (suggestions[elem].ref) {
									typedef = typedefs[suggestions[elem].ref]
								}
								item.description = typedef.description || 'unknown';
								item.descriptionMarkdown = typedef.description || 'unknown';
								item.type = typedef.isValue ? 'value' : 'keyword';
								item.leftLabel = typedef.dataType;
								item.descriptionMoreURL = typedef.link;
							} else if (typeof(suggestions[elem]) === "string") {
								item.description = suggestions[elem];
								item.descriptionMarkdown = suggestions[elem];
								item.type = 'value';
								item.leftLabel = 'string'
							}
							formatted.push(item);
						} catch (e) {
							console.error(e.message)
						}
					}
				});
			} catch (e) {
				console.error(e.message)
			}
			return formatted;
		}
	}
	return ret
}

function getPrefix(bufferPosition, buffer){

	let text = buffer.getTextInRange([[0,0],bufferPosition]);

	let testPos = text.lastIndexOf("\"")
	while (text.charAt(testPos-1) === "\\"){
			testPos = text.lastIndexOf("\"",testPos-1)
	}

	text = text.substring(testPos+1);
	//console.log(text);
	return text;
}



function startSearch(ext, path){
	try{
		//get the data for the file type
		let newData = documentation[ext];
		return searchDeeper(newData, path)
	} catch (e) {
		//no autocomplete is available for this file type
		return [];
	}
}

function searchDeeper(data, path){
	try{
		//find next data in path
		let newData = data[path[0]] || data["∏∏any"];
		//get rid of the read element in the path
		path.shift();
		//if it's a referance get the data
		if(typeof(newData) === "string"){
			newData = reusableDocumentation[newData];
		}
		//if the path is empty it's suggestion time
		if (path.length === 0) {
			//get suggestions
			let ret = newData["∏∏suggestions"];
			if (typeof(ret) === "object") {
				//suggestions is a list of subjections
				return ret || [];
			} else if (typeof(ret) === "string") {
				//suggestions is a referance to a list of reusable suggestions, go get it
				return reusableSuggestions[ret];
			} else {
				//shit whent wrong
				return [];
			}
		} else {
			//if were not at the end of the path, go deeper
			return searchDeeper(newData,path);
		}
	} catch (e) {
		//no auto complete is available for that path
		return [];
	}
}

function getLocation(buffer, bufferPosition) {
	//get the text before the cursor
	let text = buffer.getTextInRange([[0,0],bufferPosition]);
	//escape escaped double quotes, no that's not a typo
	text = text.replace(/\\\"/g,"∏∏∏∏∏∏");
	//fixing the text for single line comments
	text = text.replace(/\r|\n|\r\n|\n\r/g,"\n");
	while (text.indexOf("//") != -1) {
		let gak = text.indexOf("//")
		let quotecnt = 0;
		let preText =  text.substring(0,gak);
		let lastIndex = preText.indexOf("\"");
		while (lastIndex != -1){
			++quotecnt;
			preText = preText.substring(lastIndex+1);
			lastIndex = preText.indexOf("\"");
		}
		if(quotecnt % 2 != 0)
			text = text.substring(0,gak) + "ΓΓΓΓΓΓ" + text.substring(gak+2);
		else
			text = text.substring(0,gak) + text.substring(text.indexOf("\n",gak));
	}
	//put the // back in the strings
	text = text.replace(/ΓΓΓΓΓΓ/,"//")
	//getRid of Multi-line Comments
	while (text.indexOf("/*") != -1) {
		let gak = text.indexOf("/*")
		let quotecnt = 0;
		let preText =  text.substring(0,gak);
		let lastIndex = preText.indexOf("\"");
		while (lastIndex != -1){
			++quotecnt;
			preText = preText.substring(lastIndex+1);
			lastIndex = preText.indexOf("\"");
		}
		if(quotecnt % 2 != 0)
			text = text.substring(0,gak) + "ΓΓΓΓΓΓ" + text.substring(gak+2);
		else
			text = text.substring(0,gak) + text.substring(text.indexOf("*/",gak)+2);
	}
	//put the /* back in the strings
	text = text.replace(/ΓΓΓΓΓΓ/,"/*")
	//remove white space
	text = text.replace(/\s/g,"");
	//remove other elements and arrays
	text = text.replace(/\{[^\{^\}]*\}|\[[^\[^\]]*\]/g,"");
	while (text.match(/\{[^\{^\}]*\}|\[[^\[^\]]*\]/g)){
		text = text.replace(/\{[^\{^\}]*\}|\[[^\[^\]]*\]/g,function(a){
			return "";
		});
	}
	//remove non important data
	text = text.replace(/([\[\{])[^\{\{]+?(?="[^"]*":\{)(\"[^"]*":[\{\[])/g,"$1$2")
	while (text.match(/([\[\{])[^\{\{]+?(?="[^"]*":\{)(\"[^"]*":[\{\[])/g))
		text = text.replace(/([\[\{])[^\{\{]+?(?="[^"]*":\{)(\"[^"]*":[\{\[])/g,"$1$2")
	//clean up nested arrays
	text = text.replace(/\[[^\{\[]+?\[/g,"[[");
	//fix the code because we don't honestly care
	text = text.replace(/[^\\]\"\"/g,"\",\"");
	//get rid of useless elements
	text = text.replace(/\"[^\"]*\"\:([0-9]+\.[0-9]+|[0-9]+|true|false|\"[^\"]*\"|,)\,?/g,"");
	//get rid of useless array strings
	text = text.replace(/\"[^\"]*\"\,/g,"");
	//get rid of useless array non strings
	text = text.replace(/\[[^\"\{\[]*\"/g,"[\"");
	//gets rid of useless commas
	text = text.replace(/\[[,]+\{/g,"[{");

	//console.log(text)


	let createPath = function(path, out = []){
		//get first character
		let next = path.substr(0,1);
		//clear it from the string
		path = path.substring(1);
		//find layers
		switch (next){
			case "["://finds array layers
				out.push("∏∏array");
				return createPath(path,out);

			case "{"://find element layers
				out.push("∏∏element");
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
				out.pop();

				//fix the escaped escaped doubles quotes, no it's not a typo
				out.forEach(function(elem,index) {
					out[index] = elem.replace(/∏∏∏∏∏∏/g,"\"");
				});
				//console.log(out);
				return out;
		}
	}
	return createPath(text);
}
