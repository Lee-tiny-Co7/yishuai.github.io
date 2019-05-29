const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
  var words = [];
  var count = 0;
  var newString = "";
  
  // Checks to see if it is the node has children
  var children = node.childNodes;

  // If the node has no children
  if (children[0] === undefined || children.length == 0) {

    // ChecksIf node is a text node
    if (node.nodeType == Node.TEXT_NODE) {
      
      // Gets text content after removing whitespace at ends
      var text = node.textContent.trim();

      // Splits words by spaces
      var words = text.split(" ");
      for (var i = 0; i < words.length; i ++) {
        // Trims resultant word
        words[i] = words[i].trim();
        // If blank, removes element
        if (words[i] == "" || words[i] === undefined) {
          words.splice(i,1);
          // Detracts from counter
          i--;
        }
      }
      
      for (var i = 0; i < words.length; i ++) {
        // If the word exists in MATCH_LIST, changes the word.
        if (words[i] in MATCH_LIST){
          newString += MATCH_LIST[words[i]] + " ";
        // Other wise keeps in string
        } else {
          newString += words[i] + " ";
        }
      }
      node.textContent = newString;
     
    }
  // If the node has children  
  } else {
    // Calls transformTextNodes recursively
    for (var i = 0; i < children.length; i ++) {
      transformTextNodes(children[i]);
    }
  }
 
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');

console.log('Extension Updated!');
