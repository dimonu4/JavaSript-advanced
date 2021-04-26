'use strict';

class CalculateHamburger{
    constructor(){
        this._Burger=[];
        this._sellBurger=[];
        this._Price=0;
        this._getBurger();
        this._getSellBurger();
        this._outPut();    
    }

    _outPut(){
        let outPut = document.querySelector('.output');
        outPut.innerHTML= '';
        outPut.insertAdjacentHTML('beforeend', this._getSize());
        outPut.insertAdjacentHTML('beforeend', this._calculatePrice());
        outPut.insertAdjacentHTML('beforeend', this._calculateCalories());
    }
    // Получаем массив обьектов и записываем его в массив _Burger
    _getBurger(){
        let burger = document.querySelectorAll('input');  
        burger.forEach((elem)=>{
            const element= new createElement(elem);
            this._Burger.push(element.create());
        })   
    }
    // Получаем массив обьектов которые были отмечены покупателем
    _getSellBurger(){
        this._sellBurger= this._Burger.filter(checked=> checked.checked==="true");
    }

    _calculatePrice(){
        let sum=0;
        for(let elem of this._sellBurger){
          sum += +elem.price;
        }
        return  `Стоимость бургера: ${sum} \u20bd <br>`;
    }

    _calculateCalories(){
        let sum=0;
        for(let elem of this._sellBurger){
          sum += +elem.callory;
        }
        return  `Калорийность бургера: ${sum} Кал. <br>`;
    }

    _getSize(){
        return `Размер бургера: ${this._sellBurger[0].name} <br>`;
    }
}

class createElement{
    constructor(elem){
        this.elem= elem;
    }
    create(){
        return {
        name: `${this.elem.nextElementSibling.outerText}`,
        checked: `${this.elem.checked}`,
        price: `${this.elem.getAttribute('date-cost')}`,
        callory: `${this.elem.getAttribute('date-call')}`,
        price: `${this.elem.getAttribute('date-cost')}`,
        };
    }

}

let button = document.querySelector('button');
button.addEventListener('click', ()=> new CalculateHamburger);
