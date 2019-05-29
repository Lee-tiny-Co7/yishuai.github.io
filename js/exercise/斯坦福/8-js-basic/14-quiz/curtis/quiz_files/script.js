/* The clickDiv() function will fire once the clicks on a div containing
a picture pertinent to the quiz. The function will check to ensure that a sibling
div(another div of same parent) is not already checked. If a sibling div is
checked, then the function will uncheck the sibling div and check the desired div.
If not, the desired div will be checked. Once the user has selected 3 questions,
the listeners will be removed from the divs, keeping the user from selecting anything else.
The quiz will then be graded
 */
function clickDiv(event){
  const chosenDiv = event.currentTarget;
  let checkbox = chosenDiv.lastElementChild;
  let alreadyChecked = checkIfAnElementIsChecked(chosenDiv);
  if(alreadyChecked !== undefined){ // if a sibling div is checked
    alreadyChecked.lastElementChild.src = "images/unchecked.png";
    alreadyChecked.classList.add("unchosen");
    counter --;
  }
  checkImage(checkbox, chosenDiv); //check the div
  counter ++; // number of questions selcted
  if(counter === 3){ // done selecting divs
    removeListeners();
    gradeQuiz()
  }
}

/* The removeResults() will remove the result html from the document by setting the
display to none and remove the children as well. */
function removeResults() {
  const resultContainer = document.querySelector("#results");
  resultContainer.style.display = "none";
  while(resultContainer.firstChild){
     resultContainer.removeChild(resultContainer.firstChild);
   }
}

/* The resetDataStructures() resets the arrayOfDivs and mapOfData to their
original states */
function resetDataStructures(){
  arrayOfDivs = [];
  mapOfData = {};
}

/* The divs will be reset by using a for loop that goes through all of the
divs. The opacity, background color, and checkmark will be reset for these
divs
*/
function resetDivs(){
  for(let div of allDivs){
    //div.style.opacity = "1.0";
    //div.style.backgroundColor = "#f4f4f4";
    div.lastElementChild.src = "images/unchecked.png";
    div.classList.remove("chosen");
    div.classList.remove("unchosen");
    div.classList.add("div-selector");
    div.addEventListener('click', clickDiv);
  }
}

/* If the restartQuiz() function is called, the counter will be reset to
0 and the divs and data structures will be reset. Also, the results will be
removed and the page will scroll to the first Question*/
function restartQuiz(){
  counter = 0;
  resetDivs();
  resetDataStructures();
  removeResults();
  const firstQuestion = document.querySelector(".question-name");
  firstQuestion.scrollIntoView();
}

/* The displayResults() function will display content to the screen associated
with the variables passed in. The button will then have an event listener added,
which will allow the quiz to be restarted */
function displayResults(resultContainer, header, description, button,
                        title, content){
  header.textContent = title;
  description.textContent = content;
  button.textContent = "Restart quiz";
  resultContainer.appendChild(header);
  resultContainer.appendChild(description);
  resultContainer.appendChild(button);
  resultContainer.style.display = "block";
  resultContainer.scrollIntoView();
  button.addEventListener("click", restartQuiz);
}

/* The getResult() function will display results based on the dogType coming
in from the gradeQuiz() function. Header, description, and button elements
will be created and the result container will be found. The displayResults()
function will then be called and the resultContainer, header, description,
button, title, and content will be passed as parameters*/
function getResult(dogType){
  const resultContainer = document.querySelector("#results");
  const header = document.createElement("h2");
  const description = document.createElement("p");
  const button = document.createElement("button");
  const title = "You got: " + RESULTS_MAP[dogType].title;
  const content = RESULTS_MAP[dogType].contents;
  displayResults(resultContainer, header, description, button, title, content);
}

/* The function will look at the map assoicated with the data and will grade based
on the following: If an answer to one of the questions is the same as any of the
other questions, then it has the majority and the results will be generated for
that choice. In the event there is a tie, the answer from number one will be
selected  */
function gradeQuiz(){
  const answerOne = mapOfData["one"];
  const answerTwo = mapOfData["two"];
  const answerThree = mapOfData["three"];
  if(answerTwo === answerOne || answerTwo === answerThree){ // two has majority
    getResult(answerTwo);
  } else if(answerThree === answerOne || answerThree === answerTwo){ // three has majority
    getResult(answerThree);
  } else{ // one has majority or tie
    getResult(answerOne);
  }
}

/* This function will remove the listeners from the divs following the end
of the user selections */
function removeListeners(){
  for(let div of allDivs){
    div.removeEventListener('click', clickDiv);
  }
}

/* The checkImage() function will change the background of the chosen div, its
opacity and add it to the arrayOfDivs. The other sibling divs will be changed as
well to weaken the opacity. Following this, the data associated with the question
and answer choice will be added to the map
*/
function checkImage(checkbox, chosenDiv){
  checkbox.src = "images/checked.png";
  chosenDiv.classList.add("chosen");
  chosenDiv.classList.remove("div-selector");
  chosenDiv.classList.remove("unchosen"); // in the case another div in the class was chosen before
  arrayOfDivs.push(chosenDiv);
  changeOtherDivs(chosenDiv);
  mapOfData[chosenDiv.dataset.questionId] =  chosenDiv.dataset.choiceId; // question mapped to choice
}

/* The changeOtherDivs() function will change all sibling divs of the chosen
and change the opacity */
function changeOtherDivs(chosenDiv){
  const parentClass = chosenDiv.parentElement;
  let childrenOfParentClass = parentClass.children;
  for(let div of childrenOfParentClass){
    if(div !== chosenDiv){
      div.classList.remove("div-selector");
      div.classList.remove("chosen");
      div.classList.add("unchosen");
    }
  }
}

/* The checkIfAnElementIsChecked() function will get the children div of the
chosenDiv. The function will then use a for loop to see if any of the children
divs are already in the chosenDivs array. If so, the div that has already been
taken out of the array of divs and will be returned. If not, undefined will
be returned. */
function checkIfAnElementIsChecked(chosenDiv){
  let result = undefined;
  const children = chosenDiv.parentElement.children;
  for(let div of children){
    let index = arrayOfDivs.indexOf(div);
    if(index !== -1){
      arrayOfDivs.splice(index, 1);
      delete mapOfData[div.dataset.questionId];
      return div;
    }
  }
  return result;
}

//                  [****** MAIN ******]                              //
let arrayOfDivs = []; // created to ensure that users can change their answer choice-grid
let mapOfData = {}; // map for answer choices associated with question numbers
let counter = 0; // tracker to keep count of number of answers user has chosen (MAX: of 3)
let allDivs = document.querySelectorAll(".div-selector");
for(let div of allDivs){
  div.addEventListener('click', clickDiv);
}
