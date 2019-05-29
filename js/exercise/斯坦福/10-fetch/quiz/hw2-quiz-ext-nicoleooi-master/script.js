// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

//MAIN//

let count = 0; //how many are chosen
let questionResults = ["", "", ""];
let result =   {
    'blep' : 0,
    'burger' : 0,
    'cart' : 0,
    'dopey' : 0,
    'nerd' : 0,
    'shy' : 0,
    'sleeping' : 0,
    'sleepy' : 0,
  }; //stores answer

function choose(question, choice){ //takes in choice ID and the number

    if (count != 21){
          let x = document.querySelector(" [data-choice-id ='"+choice+"'][data-question-id ='"+question+ "'] "); //take in what i clicked
          let inQuestion = document.querySelectorAll(" [data-question-id ='"+ question+ "']"); //take everything in the question

          for (let i = inQuestion.length - 1; i >= 0; i--){

            if(inQuestion[i].dataset.choiceId != x.dataset.choiceId){ //i havent clicked it
              if(inQuestion[i].style.opacity != 0.6){
                inQuestion[i].style.opacity = 0.6;
                inQuestion[i].style.backgroundColor = "#f4f4f4";
                let allDiv1 = document.querySelector("[data-question-id ='"+question+ "']"); //pull the question
                let image1 = allDiv1.querySelector(".checkbox");
                image1.src = "images/unchecked.png";
                      count++; //+ when clicked
                  }
                }

            else{ //i clicked it
              inQuestion[i].style.backgroundColor = "#cfe3ff";
              inQuestion[i].style.opacity = 1;
              let image2 = x.querySelector(".checkbox");//pull the checkbox
              image2.src = "images/checked.png";
              count--; //- when clicked

                  //adds choice to results
                  if(x.dataset.questionId == 'one'){
                    questionResults[0] = x.dataset.choiceId;
                  }
                  else if(x.dataset.questionId == 'two'){
                    questionResults[1] = x.dataset.choiceId;
                  }
                  else {
                    questionResults[2] = x.dataset.choiceId;
                  }
            }
          }
        }

    else{
      displayResults();
    }
}

function displayResults(){

  let chosen = ["", "", ""];
  let highscore = 0;

      for(let k = questionResults.length - 1; k >= 0; k--){
      result[questionResults[k]]++;
      chosen[k] = questionResults[k];
      }

      for (let i = 0; i < chosen.length; i++){
        if(highscore < result[chosen[i]]) {
          highscore = result[chosen[i]];
          highKey = chosen[i];
        }
      }

      //results output
      let newMap = RESULTS_MAP[highKey];
      document.getElementById("resultTitle").innerHTML = "<strong>You got: " + newMap.title + "<strong>";
      document.getElementById("resultDetails").innerHTML = newMap.contents;

}

function restart(){
  //all checkboxes
  let checks = document.querySelectorAll(".checkbox");
  for (let x = checks.length - 1; x >= 0; x--){
  checks[x].src = "images/unchecked.png";
  }
  let divs = document.querySelectorAll("section.choice-grid > div");
  for(let i = divs.length -1 ; i >= 0; i--){
    divs[i].style.opacity = 1;
    divs[i].style.backgroundColor = "#f4f4f4";
  }
  console.log('colours');

  document.getElementById("resultTitle").style.display = "none";
  document.getElementById("resultDetails").style.display = "none";

  console.log('gone');
}
