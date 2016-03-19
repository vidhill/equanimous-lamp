module.exports = function(plugins){

  // names for levels
  var warn = 1;
  var error = 2;

  // best practice rules category (according to eslint)
  var rules = {
    "no-implicit-globals": [
        error // don't assume that any globals are defined, globals should be explicit
    ],
    "curly": [
        error,
        "all" // always require curly braces
    ],
    "eqeqeq": [
        error,
        "smart"
    ]
  };

  // matters of style and subjective
  var styleRules = {
    "semi": [
        error,
        "always" // always require semicolon at the end of line;
    ],
    "camelcase": [ // camelCase variables and property names always
        error,
    ],
    "linebreak-style": [
        error,
        "unix"
    ],
    "comma-spacing": [
        warn,
        {
          "before": false, // no space before and one space after commas e.g. [g, f, h]
          "after": true
        }
    ],
    "quotes": [
        error,
        "single" // single style 'quotes'
    ],
    "space-before-function-paren": [
        error,
        "always" // space before function parenthesis ()
    ],
    "indent": [
        error,
        4
    ]
  };

  return plugins.extend(rules, styleRules); // combine all the rules into one object

}
