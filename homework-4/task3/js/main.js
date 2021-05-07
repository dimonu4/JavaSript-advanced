'use strict';

class validator{
    constructor(){
        this.initWarningBlocks();
        this.addBtn();
        this.regName=/[\d\._!@#$%^&\*()_+=\\\?'"<>]+/i;
        this.regTel= /^(\+\d{1}\(\d{3}\)\d{3}-\d{4})$/;
        this.regEmail=/^(\w{2}(\-?|\.?)\w{4}@\w{4}\.\w{2})$/;
    }
    // /^(\w{2}(\-|\.)?\w{4}\@'w{4}\.\w{2})$/;
    // -mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
    initWarningBlocks(){
        this.nameWarn= document.querySelector('.nameWarning');
        this.telWarn= document.querySelector('.telWarning');
        this.emailWarn= document.querySelector('.emailWarning');
    }

    addBtn(){
        document.querySelector('.sub-btn').addEventListener('click', ()=>{
            this.getData();
            this.validate(this.name.value,this.tel.value,this.email.value,this.text.value);
        });
        document.querySelector('#reset').addEventListener('click',()=>this.resetWarn());
    }

    resetWarn(){
        this.nameWarn.innerText= '';
        this.telWarn.innerText='';
        this.emailWarn.innerText='';
        this.name.classList.remove('invalid', 'valid');
        this.tel.classList.remove('invalid', 'valid');
        this.email.classList.remove('invalid', 'valid');
    }

    getData(){
        this.name= document.querySelector('.name');
        this.tel= document.querySelector('.tel');
        this.email= document.querySelector('.email');
        this.text= document.querySelector('#textarea');
    }
    validate(name,tel,email,text){
        if(!this.regName.test(name)){
            this.name.classList.add('valid');
            this.nameWarn.innerText='';
        }else{
            this.name.classList.remove('valid');
            this.name.classList.add('invalid');
            this.nameWarn.innerText='Имя должно содержать только буквы';
        }
        if(tel.match(this.regTel)!=null){
            this.tel.classList.add('valid');
            this.telWarn.innerText='';
        }else{
            this.tel.classList.remove('valid');
            this.tel.classList.add('invalid');
            this.telWarn.innerText='Телефон должен быть в формате +7(000)000-0000'
        }
        if(email.match(this.regEmail)!=null){
            this.email.classList.add('valid');
            this.emailWarn.innerText= '';
        }else{
            this.email.classList.remove('valid');
            this.email.classList.add('invalid');
            this.emailWarn.innerText='E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        }
    }
}

    new validator();