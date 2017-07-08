'use babel'
//base for all the documentation for the autocomplete
//∏∏element is an unnamed element
//∏∏array is an unnamed array
//∏∏any is literally anything, last in importance when it comes to named things
//∏∏suggestions is a list of suggestions
//a named key with a string value is a referance to the reusable-documentation file
//a ∏∏suggestions with a string value is a referance to the reusable-suggestions file
export const documentation = {
	/*==================|
	| active item files |
	|==================*/
	"activeitem" : {
		"∏∏element" : {
			"∏∏suggestions" : {
				          "itemname" : { "ref" : "activeitem id" },
				            "price"  : { "ref" : "price" },
				     "inventoryIcon" : { "ref" : "inventoryIcon" },
				          "maxStack" : { "ref" : "maxStack" },
				            "rarity" : { "ref" : "rarity" },
				       "description" : { "ref" : "description" },
				  "shortdescription" : { "ref" : "shortdescription" },
				             "level" : { "ref" : "level" },
				       "tooltipKind" : { "ref" : "tooltipKind" },
				        "weaponType" : { "ref" : "activeitem weaponType" },
				          "itemTags" : { "ref" : "itemTags" },
				         "twoHanded" : { "ref" : "twoHanded" },
				          "category" : { "ref" : "category" },
				         "animation" : { "ref" : "animation file" },
				    "animationParts" : { "ref" : "animationParts" },
				   "animationCustom" : { "ref" : "animationCustom" },
				        "baseOffset" : { "ref" : "activeitem baseOffset" },
				      "muzzleOffset" : { "ref" : "activeitem muzzleOffset" },
				           "scripts" : { "ref" : "scripts" },
				     "elementalType" : { "ref" : "activeitem elementalType" },
				"primaryAbilityType" : { "ref" : "activeitem primaryAbilityType" },
				    "primaryAbility" : { "ref" : "activeitem primaryAbility" },
				    "altAbilityType" : { "ref" : "activeitem altAbilityType" },
				        "altAbility" : { "ref" : "activeitem altAbility" },
				           "builder" : { "ref" : "activeitem builder" }
			},
			"builder" : { "∏∏suggestions" : "buildscripts" },
			"rarity" : { "∏∏suggestions" : "rarity" },
			"tooltipKind" : { "∏∏suggestions" : "tooltipKind" },
			"category" : { "∏∏suggestions" : "item category" },
			"primaryAbilityType" : { "∏∏suggestions" : "weaponAbilityType" },
			"altAbilityType" : { "∏∏suggestions" : "weaponAbilityType" },
			"primaryAbility" : "ability",
			"altAbility" : "ability"
		}
	},
	/*============|
	| patch files |
	|============*/
	"patch" : {
		"∏∏array" : {
			"∏∏array" : "patch",
			"∏∏element" : {
				"op" : {
					"∏∏suggestions" : "patch op"
				},
				"∏∏suggestions" : "patch"
			}
		}
	}
}
