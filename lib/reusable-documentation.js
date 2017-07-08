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
		"stances" : "stances",
		"damageConfig" : "damageConfig",
		"projectileParameters" : "projectile"
	},
	"damageConfig" : {
		"∏∏suggestions" : {
			      "baseDamage" : { "dataType" : "float",    "description" : "Sets a base amount of damage to deal." },
			   "statusEffects" : { "dataType" : "[string]", "description" : "Sets a list of status effects given to what ever recieves the damage." },
			"damageSourceKind" : { "dataType" : "string",   "description" : "Sets the damage source kind, mainlyused for elemental attacks." },
			       "knockback" : { "dataType" : "float",    "description" : "Sets the amount of knock back given to what ever recieves the damage." },
			   "knockbackMode" : { "dataType" : "string",   "description" : "Sets the type of knockback given to what ever recieves the damage." },
			  "knockbackRange" : { "dataType" : "Vec2f",    "description" : "Sets a range of knockback amount given to what ever recieves the damage." },
			    "timeoutGroup" : { "dataType" : "string",   "description" : "Sets the damage time out group." },
			         "timeout" : { "dataType" : "float",    "description" : "Sets the amount of between damages." }
		},
		"damageSourceKind" : { "∏∏suggestions" : "damageKind" },
		"knockbackMode" : { "∏∏suggestions" : "knockbackMode" },
		"timeoutGroup" : { "∏∏suggestions" : "timeoutGroup" },
		"statusEffects" : { "∏∏suggestions" : "statusEffects" }
	},
	"projectile" : {
		"∏∏suggestions" : {
			   "projectileName" : { "dataType" : "string",   "description" : "Sets the id by which the projectile is uniquely identified." },
			            "power" : { "dataType" : "float",    "description" : "Sets the basic damage of a projectile." },
			        "knockback" : { "dataType" : "float",    "description" : "Sets the amount of knockback given by a projectile." },
			            "image" : { "dataType" : "path",     "description" : "Sets the image used for the projectile." },
			   "animationCycle" : { "dataType" : "float",    "description" : "Sets amount of time it takes for the projectile to go throw through it's frames." },
			      "frameNumber" : { "dataType" : "number",   "description" : "Sets the number of fames the projectile will go through during it's animation." },
			  "damageKindImage" : { "dataType" : "path",     "description" : "Sets the icon for the damage kind." },
			            "speed" : { "dataType" : "float",    "description" : "Sets speed of the projectile in blocks per second." },
			        "flippable" : { "dataType" : "boolean",  "description" : "Wether or not the projectile visual can be flipped if it goes upside down." },
			"orientationLocked" : { "dataType" : "boolean",  "description" : "Sets wether or not mcontroller.setRotation() will do anything." },
			          "physics" : { "dataType" : "string",   "description" : "Sets the physics used for the projectile" },
			       "damagePoly" : { "dataType" : "PolyF",    "description" : "Sets the array of point used to create the polygon used for damage.\n\n[0,0] is in the center of the projectile's image / movement Controller." },
			         "emitters" : { "dataType" : "[string]", "description" : "Sets the particle and sound emmiters the projectile will use.\n\nMainly used for projectile trails." }
		},
		"damageKindImage" : { "∏∏suggestions" : "damageKindImage" },
		"damageKind" : { "∏∏suggestions" : "damageKindImage" },
		"physics" : { "∏∏suggestions" : "projectilePhysics" }
	},
	"stances" : {
		"∏∏any" : {
			"∏∏suggestions" : {
				"duration" : { "dataType" : "float", "description" : "The duration of the stance" },

				       "armRotation" : { "dataType" : "float", "description" : "Sets the base rotation of the arm." },
				"armAngularVelocity" : { "dataType" : "float", "description" : "Sets the angular velocity in degrees per second for the arm." },
				      "backArmFrame" : { "dataType" : "string", "description" : "Sets the frame to use for the back arm." },
				     "frontArmFrame" : { "dataType" : "string", "description" : "Sets the frame to use for thg foreground arm." },
				         "twoHanded" : { "dataType" : "boolean", "description" : "Sets wether or not the weapon is visibly 2 handed, doesn't change the overall handiness." },

				       "weaponRotation" : { "dataType" : "float", "description" : "Sets the base rotation of the arm." },
				 "weaponRotationCenter" : { "dataType" : "float", "description" : "Sets the rotation center of the weapon" },
				"weaponAngularVelocity" : { "dataType" : "float", "description" : "Sets the angular velocity in degrees per second for the weapon." },
				         "weaponOffset" : { "dataType" : "Vec2F", "description" : "Sets the offset to apply on the weapon, used to lineup with hands." },

				"smashTimer" : { "dataType" : "float", "description" : "Sets the amount of time a smash will take, used in smash type abilities" },

				"recoil" : { "dataType" : "float", "description" : "Sets wether or not the weapon has recoil" },

				      "animationStates" : { "dataType" : "float", "description" : "Sets a state for a part"},
				           "playSounds" : { "dataType" : "float", "description" : "Plays a sound during the stand", "link" : "https://www.youtube.com/watch?v=NFjE5A4UAJI" },
				"burstParticleEmitters" : { "dataType" : "float", "description" : "Bursts a particle emmiter from the animation file at the begenning of the stand" },
			}
		},
		"∏∏suggestions" : {
			              "idle" : { "dataType" : "JSON", "description" : "generally used for idle states." },
			              "spin" : { "dataType" : "JSON", "description" : "generally used for spinning states." },
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
