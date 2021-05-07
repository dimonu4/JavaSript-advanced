'use strict';

class invertQuotes{
    constructor(button){
        let newText;
        this.button= button;
        // this.regval= regval;
        this.addButton();
        this.textBlock = document.querySelector('#text');
        this.text = this.getText();
        
    }

    addButton(){
        document.querySelector(`${this.button}`).addEventListener('click',(event)=>{
            this.invert();
            this.returnText();
        })
    }

    getText(){
        return this.textBlock.innerHTML;
    }

    invert(){
        this.newText= this.text.replace(this.regexp, '"');
    }

    returnText(){
        this.textBlock.innerHTML= this.newText;
        console.log(this.button);
    }
}

class task1 extends invertQuotes{
    constructor(button,regval){
        super(button,regval)
        this.regexp = /'/g;
    }
}

class task2 extends invertQuotes{
    constructor(button,regval){
        super(button,regval)
        this.regexp = /(\B'|\b'\B)/gi;
    }
}

new task1('.task1');
new task2('.task2');
