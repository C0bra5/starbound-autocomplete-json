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
			"rarity" : {
				"∏∏suggestions" : "item rarity"
			},
			"builder" : {
				"∏∏suggestions" : {
					         "/items/buildscripts/buildbow.lua" : { "ref" : "buildscripts buildbow"},
					  "/items/buildscripts/buildfishingrod.lua" : { "ref" : "buildscripts buildfishingrod"},
					        "/items/buildscripts/buildfist.lua" : { "ref" : "buildscripts buildfist"},
					        "/items/buildscripts/buildfood.lua" : { "ref" : "buildscripts buildfood"},
					    "/items/buildscripts/buildmechpart.lua" : { "ref" : "buildscripts buildmechpart"},
					     "/items/buildscripts/buildsapling.lua" : { "ref" : "buildscripts buildsapling"},
					      "/items/buildscripts/buildshield.lua" : { "ref" : "buildscripts buildshield"},
					"/items/buildscripts/buildunrandshield.lua" : { "ref" : "buildscripts buildunrandshield"},
					"/items/buildscripts/buildunrandweapon.lua" : { "ref" : "buildscripts buildunrandweapon"},
					      "/items/buildscripts/buildweapon.lua" : { "ref" : "buildscripts buildweapon"},
					        "/items/buildscripts/buildwhip.lua" : { "ref" : "buildscripts buildwhip"}
				}
			},
			"tooltipKind" : "tooltipKind",
			"category" : "item category",
			"primaryAbility" : "ability",
			"altAbility" : "ability",
			"primaryAbilityType" : "weaponAbilityType",
			"altAbilityType" : "weaponAbilityType",
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
			}
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
