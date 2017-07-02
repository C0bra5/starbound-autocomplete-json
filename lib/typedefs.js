'use babel'
//a lists and documents every keys or values from the auto complete
//each key in the object represents the potential value of a type element in any
//∏∏suggestions value
export const typedefs = {
	"patch op" : {
		"dataType" : "string",
		"description" : "The type of operation to come."
	},
	"patch path" : {
		"dataType" : "string",
		"description" : "The location of the data"
	},
	"patch value" : {
		"dataType" : "JSON",
		"description" : "The new added data"
	},
	"patch inverse" : {
		"dataType" : "boolean",
		"description" : "Makes test operators check for missing values"
	},
	"patch from" : {
		"dataType" : "string" ,
		"description" : "Used in move and copy to indicate the origin path"
	},



	"patch op add" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Add the value to an array or element  \n`{\"op\" : \"add\", \"path\" : \"/myPath\", \"value\" : [\"patching\", \"is\", \"life\"] }`"
	},
	"patch op remove" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Remove the element at the specified path  \n`{ \"op\": \"remove\", \"path\": \"/a/b/c\" }`"
	},
	"patch op replace" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Replace the element at the specified path by the given value  \n`{\"op\" : \"add\", \"path\" : \"/myPath\", \"value\" : [\"patching\", \"is\", \"love\"] }`"
	},
	"patch op move" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Move the specified element from a path to a new one  \n`{ \"op\": \"move\", \"from\": \"/a/b/c\", \"path\": \"/a/b/d\" }`"
	},
	"patch op copy" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Copy a value from one path to an other  \n`{ \"op\": \"copy\", \"from\": \"/a/b/d\", \"path\": \"/a/b/e\" }`"
	},
	"patch op test" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Check to see if an element exists or not  \n`{\"op\" : \"test\", \"path\" : \"/myPath\"}`  \n`{\"op\" : \"test\", \"path\" : \"/myPath/2\", \"inverse\" : true }`"
	},



	"activeitem id" : {
		"dataType" : "string",
		"description" : "Sets the id that uniquely identifies the item."
	},
	"activeitem weaponType" : {
		"dataType" : "string",
		"description" : "Sets the type of weapon the active item will be if it is one."
	},
	"activeitem baseOffset" : {
		"dataType" : "Vec2F",
		"description" : "Sets be base offset for the ingame visual of the item, starts in the center of the image.\n\nAn array of 2 offsets [x,y], each increments of 0.125 is the equivalent of one pixel in the image."
	},
	"activeitem muzzleOffset" : {
		"dataType" : "Vec2F",
		"description" : "Sets the offset, starting from the center, for where a gun would shoot it's projectiles.\n\nAn array of 2 offsets [x,y], each increments of 0.125 is the equivalent of one pixel in the image."
	},
	"activeitem elementalType" : {
		"dataType" : "string",
		"description" : "Sets the elemental type of the item, be carefull your item will break if your animation data doesn't support the elemental type."
	},
	"activeitem primaryAbilityType" : {
		"dataType" : "string",
		"description" : "Sets the primary ability of the activeitem."
	},
	"activeitem altAbilityType" : {
		"dataType" : "string",
		"description" : "Sets the alt ability of the activeitem."
	},
	"activeitem primaryAbility" : {
		"dataType" : "JSON",
		"description" : "Sets the parameters for the primary ability."
	},
	"activeitem altAbility" : {
		"dataType" : "JSON",
		"description" : "Sets the parameters for the alt ability."
	},
	"activeitem builder" : {
		"dataType" : "string",
		"description" : "Sets the builder script for the item, most build scripts are located in /items/buildscripts."
	},
	"activeitem stance" : {
		"dataType" : "string",
		"description" : "a list of stands that the player will go through wile using an item or ability.",
		"link" : "http://jojo.wikia.com/wiki/Stand"
	},



	"rarity" : {
		"dataType" : "string",
		"description" : "Sets the rarity of the item."
	},
	"price" : {
		"dataType" : "number",
		"description" : "Sets the value of the item."
	},
	"inventoryIcon" : {
		"dataType" : "string",
		"description" : "Sets the icon used for the item."
	},
	"maxStack" : {
		"dataType" : "number",
		"description" : "sets the value of the item."
	},
	"description" : {
		"dataType" : "string",
		"description" : "Sets the description of the item."
	},
	"shortdescription" : {
		"dataType" : "string",
		"description" : "Sets the name of the item."
	},
	"level" : {
		"dataType" : "float",
		"description" : "Sets the level of the item."
	},
	"tooltipKind" : {
		"dataType" : "string",
		"description" : "Sets the tooltip kind used of the item."
	},
	"itemTags" : {
		"dataType" : "[string]",
		"description" : "Sets the tags that your item will represent  \nTags are used to group certain item types for quests or lua calls."
	},
	"twoHanded" : {
		"dataType" : "boolean",
		"description" : "Sets wether or not the item can be held in a single hand."
	},
	"category" : {
		"dataType" : "boolean",
		"description" : "Sets the item category and the sub-title in the tooltip.\n\nCategories are set in the categories.config file in the items folder."
	},
	"animation file" : {
		"dataType" : "string",
		"description" : "Sets the path to the `.animation` file used to animate the item or object."
	},
	"animationParts" : {
		"dataType" : "JSON",
		"description" : "Sets the values for the `<partImage>` in the part propreties of the animation file.\n\nexample  \n```\n\"animationParts\" : {\n    \"handle\": \"handle.png\",\n    \"handleFullbright\" : \"handlefullbright.png\",\n    \"blade\" : \"blade.png\"\n}\n```"
	},
	"animationCustom" : {
		"dataType" : "JSON",
		"description" : "Sets overrides for the animation file, uses the same format as an animation file."
	},
	"scripts" : {
		"dataType" : "[string]",
		"description" : "Sets the lua scripts that will be used to controll whatever you are working on, uses an array."
	},
	"damageConfig" : {
		"dataType" : "JSON",
		"description" : "An element used to configure the damage of something."
	},
	"projectileParameters" : {
		"dataType" : "JSON",
		"description" : "Sets the parameters for the projectile."
	},



	"projectile id" : {
		"dataType" : "string",
		"description" : "A string that uniquely identifies a projectile type."
	},
	"projectile id ref" : {
		"dataType" : "string",
		"description" : "Sets the projectile type using it's id."
	},



	"rarity common" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Sets the item rarity to common, white overlay."
	},
	"rarity uncommon" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Sets the item rarity to uncommon, green overlay."
	},
	"rarity rare" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Sets the item rarity to rare, blue overlay."
	},
	"rarity legendary" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Sets the item rarity to legendary, purple overlay."
	},
	"rarity essential" : {
		"isValue" : true,
		"dataType" : "string",
		"description" : "Sets the item rarity to essential, yellow overlay."
	},



	"buildscripts buildbow" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build bow items."
	},
	"buildscripts buildfishingrod" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build fishing rod items."
	},
	"buildscripts buildfist" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build fist weapons."
	},
	"buildscripts buildfood" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build food items."
	},
	"buildscripts buildmechpart" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build mech parts."
	},
	"buildscripts buildsapling" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build saplings."
	},
	"buildscripts buildshield" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build random shields."
	},
	"buildscripts buildunrandshield" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build non random shields."
	},
	"buildscripts buildunrandweapon" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build non random weapons."
	},
	"buildscripts buildweapon" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build random weapons."
	},
	"buildscripts buildwhip" : {
		"isValue" : true,
		"dataType" : "path",
		"description" : "Used to build whip weapons."
	}
}
