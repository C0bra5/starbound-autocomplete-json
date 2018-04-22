# Basics
---
## Reference
| Required     | Key      | Datatype | Description |
|:------------:|:--------:|:--------:|:-|
| ***mostly*** | name     | string   | The name of the property, required if the value isn't in an array |
| ***mostly*** | type     | string    | The data type of the property `String`, `Int[eger]`, `Float`, `Object`, `Array`, `Bool[ean]`|
| recommended  | desc     | string   | A description of the reference |
| no           | required | boolean  | Whether or not the property is usually required. defaults to false  |
| no           | base     | string   | The name of the item to use as a base for the current item, basically polymorphism |
| no           | ref      | string   | The name of the item to use |
| no           | fileType | string   | The name of the file extension that uses this object as it's base.
| no           | content     | array    | A list of objects that describes the items contained in an object. |
| no           | enum     | array    | A list of strings that contains some potential values for the property |
| no           | link     | string   | A link that contains more information about the current reference |

## Enumeration
| Required  | Key   | Datatype | Description                                                       |
|:---------:|:-----:|:--------:|:------------------------------------------------------------------|
| ***yes*** | value | string   | the value of the enumeration                                      |
| no        | desc  | string   | A description of the enumeration                                  |
| no        | link  | string   | A link that contains more information about the current reference |

# Development standards
---
| Coding Style                                                       |
|--------------------------------------------------------------------|
| *Use Tabs for indentation only*                                    |
| K&R bracket style only                                             |
| __***ONLY***__ use babel if needed to implement es6 standards      |
| Lower case camel case anything but classes                         |
| Upper case camel case classes only                                 |
| Always use brackets to signify blocks, even when you don't need it |

| References                        |
|-----------------------------------|
| **ALWAYS** apply references first |
| bases always comes second         |

# Notes for the future
---
* **If no type is used, do a check for the values presented and parse depending on the type of value content contains**
* maybe look at a more procedural model, caching all the trees might end up more demanding memory wise that desired.
