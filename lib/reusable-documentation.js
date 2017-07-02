'use babel'
//reusable documentations data
//∏∏element is an unnamed element
//∏∏array is an unnamed array
//∏∏any is literally anything, last in importance when it comes to named things
//∏∏suggestions is a list of suggestions
//a named key with a string value is a referance to the reusable-documentation file
//a ∏∏suggestions with a string value is a referance to the reusable-suggestions file
export const reusableDocumentation = {
	"ability" : {
		"∏∏suggestions" : {
			            "fireTime" : { "dataType" : "float or Vec2f", "description" : "#### Non random values:  \nA number that represents the amount of time a weapon will take to fire.\n\n---  \n#### Random values:  \nAn array containing 2 numbers, the **minimum** and the **maximum** a weapon will take to fire.  \nExample: `[ 0.2, 0.5 ]`" },
			             "baseDps" : { "dataType" : "float or Vec2f", "description" : "#### Non random values:  \nA number that represents the amount of damage the weapon will deal per second.\n\n---  \n#### Random values:  \nAn array containing 2 numbers, the **minimum** and the **maximum** of damage a weapon will deal per second.  \nExample: `[ 10.5, 12.3 ]`" },
			          "inaccuracy" : { "dataType" : "float", "description" : "Sets the innacuracy of the weapon. The value repressents how many degrees, in radiant, can be added or removed from the initial angle of a projectile." },
			         "energyUsage" : { "dataType" : "float or Vec2f", "description" : "#### Non random values:  \nA number that represents the amount of energy a weapon will use.\n\n---  \n#### Random values:  \nAn array containing 2 numbers, the **minimum** and the **maximum** amount of energy used by a weapon.  \nExample: `[ 0.25, 0.75 ]`" },
			             "scripts" : { "ref" : "scripts" },
			               "class" : { "dataType" : "string", "description" : "the name of the element the weapon.config will use in the ability's script" },
			           "burstTime" : { "dataType" : "float or Vec2f", "description" : "#### Non random values:  \nA number that represents the amount of time a burst will last.\n\n---  \n#### Random values:  \nAn array containing 2 numbers, the **minimum** and the **maximum** of time a burst will last.  \nExample: `[ 0.25, 0.75 ]`" },
			          "burstCount" : { "dataType" : "number or Vec2I", "description" : "#### Non random values:  \nA number that represents the number of shots fired during a burst.\n\n---  \n#### Random values:  \nAn array containing 2 numbers, the **minimum** and the **maximum** number of times the weapon will shoot during a burst.  \nExample: `[ 2, 5 ]`" },
			            "fireType" : { "dataType" : "string or [string]", "description" : "#### Non random values  \nSets the fireType of the weapon.\n\n---  \n#### Random values  \nAn array containing the name of the fire modes.  \nexample: `[\"auto\",\"burst\"]`" },
			     "projectileCount" : { "dataType" : "number or Vec2I", "description" : "#### Non random values:  \nA number that represents the number of shots fired every time a weapon is fired.\n\n---  \n#### Random values:  \nAn array containing 2 numbers, the **minimum** and the **maximum** number of projectiles to shoot per shot.  \nExample: `[ 2, 5 ]`" },
			        "damageConfig" : { "ref" : "damageConfig" },
			      "projectileType" : { "ref" : "projectile id ref" },
			"projectileParameters" : { "ref" : "projectileParameters" },
			               "chain" : { "dataType" : "JSON", "description" : "A set of parameters for beam weapons such as the aegisalt pistol." },
			             "stances" : { "ref" : "activeitem stance"}
		},
		"stances" : "stances"
	},
	"tooltipKind" : {
		"∏∏suggestions" : {
			           "armor" : "Used with wearables",
			            "back" : "Used with back items",
			            "base" : "Used with anything generic",
			     "baseaugment" : "Used with basic augments",
			             "bow" : "Used with bows",
			           "codex" : "Used with codexs",
			       "container" : "Used with containers",
			            "door" : "Used with doors",
			      "eppaugment" : "Used with epp augments",
			"filledcapturepod" : "Used with filled capture pods",
			      "fishingrod" : "Used with fishing rods",
			  "fishingupgrade" : "Used with fishing upgrades",
			      "fistweapon" : "Used with fist weapons",
			            "food" : "Used with food items",
			          "fossil" : "Used with fossils",
			             "gun" : "Used with ranged weapons",
			         "mecharm" : "Used with mech arms",
			        "mechbody" : "Used with mech bodies",
			     "mechbooster" : "Used with mech boosters",
			        "mechlegs" : "Used with mech legs",
			              "mm" : "Used with matter manipulators",
			          "object" : "Used with object",
			       "petcollar" : "Used with pet collars",
			            "seed" : "Used with seed",
			          "shield" : "Used with shield",
			   "simpletooltip" : "Used with simple things",
			         "species" : "Used with species",
			           "staff" : "Used with staves",
			           "sword" : "Used with mele weapons",
			            "tool" : "Used with tools",
			         "vehicle" : "Used with vehicles"
		}
	},
	"stances" : {
		"∏∏any" : {
			"∏∏suggestions" : {
				"duration" : { "dataType" : "float", "description" : "The duration of the stance" }
			}
		},
		"∏∏suggestions" : {
			              "idle" : { "dataType" : "JSON", "description" : "generally used for idle states." },
			            "windup" : { "dataType" : "JSON", "description" : "generally used in staves and weapons for windup states." },
			              "cast" : { "dataType" : "JSON", "description" : "generally used in fishing rods for casting the line." },
			              "reel" : { "dataType" : "JSON", "description" : "generally used in fishing rods for reeling the line or a fish the line." },
			             "catch" : { "dataType" : "JSON", "description" : "generally used in fishing rods, capture pods and boomerang to catch things." },
			              "fire" : { "dataType" : "JSON", "description" : "generally used in weapons for fireing states(ranged weapons), or slasing states(mele weapons)" },
			          "preslash" : { "dataType" : "JSON", "description" : "generally used in mele weapons for pre fireing states." },
			          "cooldown" : { "dataType" : "JSON", "description" : "generally used to indicate a cooldown state" },
			            "extend" : { "dataType" : "JSON", "description" : "generally used to indicate an extended state of someting." },
			            "charge" : { "dataType" : "JSON", "description" : "generally used to indicate the chaging of something" },
			           "charged" : { "dataType" : "JSON", "description" : "generally used to indicate that something is fully charged" },
			         "discharge" : { "dataType" : "JSON", "description" : "generally used to indicate a discharging state" },
			            "raised" : { "dataType" : "JSON", "description" : "generally used to indicate the raised state of something like a staff getting raised into the air before charging." },
			              "dead" : { "dataType" : "JSON", "description" : "generally used to indicate that something is dead" },
			             "throw" : { "dataType" : "JSON", "description" : "generally used to indicate a throwing state, used in capture pods" },
			             "catch" : { "dataType" : "JSON", "description" : "generally used to indicate a thing has been caught or when a capture pod catches something" },
			"monsterEnergyCatch" : { "dataType" : "JSON", "description" : "generally used to indicate that a capurepod is charged" },
			  "podTeleportCatch" : { "dataType" : "JSON", "description" : "generally used to indicate the teleporting state of a capture pod" },
			            "absorb" : { "dataType" : "JSON", "description" : "generally used to indicate the absorbsion of something" }
		}
	},
	"item category" : {
		"∏∏suggestions" : "item category"
	},
	"weaponAbilityType" : {
		"∏∏suggestions" : "weaponAbilityType"
	},
	"patch" : {
		"∏∏array" : "patch",
		"∏∏element" : {
			"op" : {
				"∏∏suggestions" : "patch op"
			},
			"∏∏suggestions" : "patch"
		}
	}
}
