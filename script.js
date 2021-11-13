function add(a,b){
    return a+b;
}
function multiply(a,b){
    return (a*b);
}
function divide(a,b){
    return (a/b);
}
function subtract(a,b){
    return (a-b);
}

const numberButtons = document.querySelectorAll('.number-button');
const outputLine = document.querySelector('#output-screen')
const runningEquation = document.querySelector('#running-equation');
let onOperator = true;
let num = '';
let onOutput = false
let cleared=true;
let memory=0;
let darkMode = false;
console.log(numberButtons);
numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        if(button.getAttribute('number')=='.' && num.includes('.')){
            return;
            }
        if(onOutput==true && onOperator==false){
            num='';
            inputArray = [];
        }
        if(onOutput==true){
            num='';
        }
        onOperator = false;
        onOutput=false;
        cleared=false;
        num = (`${num}${button.getAttribute('number')}`);
        console.log(button.getAttribute('number'))

        pushDisplay();
        })
})
function pushDisplay(){
    outputLine.textContent = num;
    runningEquation.textContent = `${inputArray.join(' ')} ${num}`;
}

const operatorButtons = document.querySelector('#operator-buttons').querySelectorAll('button');
let operation;
operatorButtons.forEach(button =>{
    button.addEventListener('click', function(){
        operation = button.getAttribute('operation');
        if(operation=='plusminus'){
            if(onOutput||onOperator){
                return;
            }
            num=-num
            pushDisplay();
            return;
            }
        if((!onOperator)&&(!onOutput)){
            inputArray.push(parseFloat(num));
            }
        if(operation=='='){
            if(!onOperator){
            operate();
            }
        }else{
            designateOperator();  
            }          
        pushDisplay();
    })
})
let inputArray = [];
function designateOperator(){
    if(onOperator==true){
        inputArray.pop();
    }
    inputArray.push(operation); 
    num = '';
    onOperator = true;
}

function operate(){
    while(inputArray.length>1){
        inputArray.forEach(function(item){
            let index = inputArray.indexOf(`${item}`);
            if(item == '+'){
                feedback = add(inputArray[index-1], inputArray[index+1]);
            }else if(item == '-'){
                feedback = subtract(inputArray[index-1], inputArray[index+1]);
            }else if(item == '×'){
                feedback = multiply(inputArray[index-1], inputArray[index+1]);
            }else if (item == '÷'){
                feedback = divide(inputArray[index-1], inputArray[index+1]);
            }else{
                return;
            }
            inputArray.splice((index-1), 3, feedback);
        });
    }
    onOutput=true;
    num='';
    pushDisplay();
}
document.querySelector('#clear').addEventListener('click', function(){
    num = '';
    onOperator = true;
    if(cleared==true){
        inputArray=[];
    }
    cleared=true;
    if(onOutput==true){
        inputArray=[];
        onOutput=false;
    }
    pushDisplay();
});
document.querySelector('#memset').addEventListener('click', function(){
    memory=num;
});
document.querySelector('#memrecall').addEventListener('click', function(){
    num=memory;
    pushDisplay();
});
document.querySelector('#onoff').addEventListener('click', function(){
    let coloredNodes = document.querySelectorAll('.body, #output-screen, #running-equation, #calc-body, button');
    if(darkMode==false){
        coloredNodes.forEach(button => {
        button.classList.add('class', 'dark')
        })
    }
    if(darkMode==true){
        coloredNodes.forEach(button => {
        button.classList.remove('class', 'dark')
        })
    }
    darkMode=!darkMode;
})