const Controller = function() {

    this.down  = new Controller.ButtonInput();
    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
  
    this.keyDownUp = function(event) {
        var isPressed = (event.type == "keydown") ? true : false;

        switch(event.keyCode) {
            case 37: this.left.getInput(isPressed);  break;
            case 38: this.up.getInput(isPressed);    break;
            case 39: this.right.getInput(isPressed); break;
            case 40: this.down.getInput(isPressed);
        }
    };
    this.handleKeyDownUp = (event) => { this.keyDownUp(event); };
};

Controller.prototype = {
    constructor : Controller
};

Controller.ButtonInput = function() {
    this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
    constructor : Controller.ButtonInput,
    getInput : function(isPressed) {
        if (this.down != isPressed) this.active = isPressed;
        this.down = isPressed;
    }
};