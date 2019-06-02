/* The ForwardBackButton() class controls the forward and back buttons for the
diary screen.
*/

class ForwardBackButton{
  constructor(forwardContainer, backContainer, homeContainer, forwardCallback,
              backCallback){
    this._goForward = this._goForward.bind(this);
    this._goBack= this._goBack.bind(this);

    this._forwardCallback = forwardCallback;
    this._backCallback = backCallback;
    this.forwardArrow = forwardContainer;
    this.backArrow = backContainer;
    this.homeContainer = homeContainer;

    this.forwardArrow.addEventListener('click', this._goForward);
    this.backArrow.addEventListener('click', this._goBack);
  }

/* When FORWARD BUTTON is clicked, perform this callback */
  _goForward(){
    this._forwardCallback();
}

/* When BACK BUTTON is clicked, perform this callback*/
  _goBack(){
    this._backCallback();
  }

}
