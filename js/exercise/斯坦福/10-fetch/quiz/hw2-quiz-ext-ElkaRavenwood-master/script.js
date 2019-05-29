// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

// Variables
var count = 0; // So if all three options are selected, cannot 
var results = ["","",""]; // For storing answers
var scores = { // For counting score
	'blep' : 0,
	'burger' : 0,
	'cart' : 0,
	'dopey' : 0,
	'happy': 0,
	'nerd' : 0,
	'shy' : 0,
	'sleeping' : 0,
	'sleepy' : 0,
};

// Figure out how to not need divid - bc it should be unique with data-question and data-choice
function select (divid) {
	
	if (count != 21) {
		var x = document.getElementById(divid);
		// Collects all items in question and makes it opaque (0.6), checks/unchecks the item
		var insideDiv = document.querySelectorAll("[data-question-id='"+ x.dataset.questionId + "']");
		for (var i = insideDiv.length - 1; i >= 0; i--) {
			// Changes/reverts non-chosen ones
			if (insideDiv[i].dataset.choiceId != x.dataset.choiceId) {
				if (insideDiv[i].style.opacity != 0.6) {
					insideDiv[i].style.opacity = 0.6;
					insideDiv[i].style.backgroundColor = "#f4f4f4";
					insideDiv[i].innerHTML = insideDiv[i].innerHTML.substring(0,insideDiv[i].innerHTML.indexOf("checkbox")) + 'checkbox" src="images/unchecked.png"/>';
					
					// Changes counter
					count ++;
					
				}
			// Changes selected one
			} else {
				insideDiv[i].style.opacity = 1.0;
				insideDiv[i].style.backgroundColor = "#cfe3ff";
				insideDiv[i].innerHTML = insideDiv[i].innerHTML.substring(0,insideDiv[i].innerHTML.indexOf("checkbox")) + 'checkbox" src="images/checked.png"/>';
				// Changes counter
				count --;
				// Adds choice to results
				if (x.dataset.questionId == 'one') {
					results[0] = x.dataset.choiceId;
				} else if (x.dataset.questionId == 'two') {
					results[1] = x.dataset.choiceId;
				} else {
					results[2] = x.dataset.choiceId;
				}

				// Finds the question num
				var questionNum;
				if (x.dataset.questionId.localeCompare('one') == 0) {
					questionNum = 1;
				} else if (x.dataset.questionId.localeCompare('two') == 0) {
					questionNum = 2;
				} else {
					questionNum = 3;
				}
					
				// Adds/replaces choice from results
				results[questionNum-1] = x.dataset.choiceId;
			}
			
		}

	// Runs when quiz is complete
	} else {

		var chosen = ["","",""];
		var highscore = 0;
		var highMap;
		
		// Adds the results into the counter in the map, finds the vounter
		for (var i = 0; i < results.length ; i ++) {
			scores[results[i]] ++;
			chosen[i] = results[i];
		}

		// Finds the highscore
		for (var i = 0; i < chosen.length ; i ++) {
			if (highscore < scores[chosen[i]]) {
				highscore = scores[chosen[i]];
				highMap = RESULTS_MAP[chosen[i]];
			}
		}

		// Outputs results
		document.getElementById("resultIntro").innerHTML = "You got: " + highMap.title;
		document.getElementById("resultDetails").innerHTML = highMap.contents;
	}
}

// For restarting quiz 
function restart(){
  // Resets counter
  count = 0;
  // Finds all the checkboxes
  let checks = document.querySelectorAll(".checkbox");
  for (let i = checks.length - 1; i >= 0; i--){
  	checks[i].src = "images/unchecked.png";
  }
  // Finds divs
  let divs = document.querySelectorAll("section.choice-grid > div");
  for(let i = divs.length -1 ; i >= 0; i--){
  	// Sets opacity
    divs[i].style.opacity = 1;
    // Sets background colour
    divs[i].style.backgroundColor = "#f4f4f4";
  }
  // Sets display
  document.getElementById("resultIntro").style.display = "none";
  document.getElementById("resultDetails").style.display = "none";
}
