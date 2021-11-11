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
//what happens when you press the = key

//take 2+ inputs, and what operations to perform on them
const numberButtons = document.querySelectorAll('.number-button');
const outputLine = document.querySelector('#output-screen')
const runningEquation = document.querySelector('#running-equation');
let waitingForInput = true;
let num = '';
let outputGiven = false
let cleared=true;
let memory=0;
let darkMode = false;
numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        if(button.getAttribute('number')=='.' && num.includes('.')){
            return;
            }
        if(outputGiven==true && waitingForInput==false){
            console.log('here');
            num='';
            inputArray = [];
        }
        waitingForInput = false;
        if(outputGiven==true){
            console.log(inputArray);
            num=inputArray[0];
            outputLine.textContent = '';
            runningEquation.textContent=inputArray[0];
            outputGiven=false;
            num='';
        }
        cleared=false;
        num = +`${num}${button.getAttribute('number')}`;
        outputLine.textContent = num;
        runningEquation.textContent = `${inputArray.join(' ')} ${num}`;
        })
})

//seperate "set inputs" function?
//designate operator and get new number
const operatorButtons = document.querySelector('#operator-buttons').querySelectorAll('button');
console.log(operatorButtons);
let operator;
operatorButtons.forEach(button =>{
    button.addEventListener('click', function(){
        operation = button.getAttribute('operation');
        if(operation=='='){
            operate();
        }else if(operation == 'plusminus'){
            num=-num;
            outputLine.textContent = num;
        }else if(waitingForInput == false){
                //console.log(operation);
                designateOperator();
            
        }
    })
})
let inputArray = [];
function designateOperator(){
    if(outputGiven==false){
    inputArray.push(num);}
    inputArray.push(operation);
    //console.log(inputArray);
    //console.log(inputArray.indexOf('+'))
    num = '';
    waitingForInput = true;
    runningEquation.textContent=inputArray.join(' ');
}

function operate(){
    inputArray.push(+num);
    runningEquation.textContent=inputArray.join(' ');
    console.log(inputArray);

    let multIndex = inputArray.indexOf('×');
    while(multIndex>0){
        console.log(multIndex);
        a=inputArray[multIndex-1];
        b=inputArray[multIndex+1];
        product = multiply(a,b);
        inputArray.splice((multIndex-1), 3, product)
        console.log(inputArray);
        multIndex = inputArray.indexOf('×');
    }

    let divIndex = inputArray.indexOf('÷');
    while(divIndex>0){
        console.log(divIndex);
        a=inputArray[divIndex-1];
        b=inputArray[divIndex+1];
        product = divide(a,b);
        inputArray.splice((divIndex-1), 3, product)
        console.log(inputArray);
        divIndex = inputArray.indexOf('÷');
    }

    let addIndex = inputArray.indexOf('+');
    while(addIndex>0){
        console.log(addIndex);
        a=inputArray[addIndex-1];
        b=inputArray[addIndex+1];
        product = add(a,b);
        inputArray.splice((addIndex-1), 3, product)
        console.log(inputArray);
        addIndex = inputArray.indexOf('+');
    }

    let subtIndex = inputArray.indexOf('-');
    while(subtIndex>0){
        console.log(subtIndex);
        a=inputArray[subtIndex-1];
        b=inputArray[subtIndex+1];
        product = subtract(a,b);
        inputArray.splice((subtIndex-1), 3, product)
        console.log(inputArray);
        subtIndex = inputArray.indexOf('-');
    }
    outputGiven=true;
    outputLine.textContent = inputArray[0];
}
document.querySelector('#clear').addEventListener('click', function(){
    num = '';
    outputLine.textContent = num;
    runningEquation.textContent = `${inputArray.join(' ')} ${num}`;
    waitingForInput = true;
    if(cleared==true){
        inputArray=[];
        runningEquation.textContent = `${inputArray.join(' ')} ${num}`;
    }
    cleared=true;
    if(outputGiven==true){
    waitingForInput=false;
    }
});
document.querySelector('#memset').addEventListener('click', function(){
    memory=num;
    console.log(memory);
});
document.querySelector('#memrecall').addEventListener('click', function(){
    num=memory;
    runningEquation.textContent = `${inputArray.join(' ')} ${num}`;
    outputLine.textContent = num;
});
document.querySelector('#onoff').addEventListener('click', function(){
    if(darkMode==false){
        document.querySelector('body').classList.add('class', 'dark')
        document.querySelector('#output-screen').classList.add('class', 'dark')
        document.querySelector('#running-equation').classList.add('class', 'dark')
        document.querySelector('#calc-body').classList.add('class', 'dark')
        document.querySelectorAll('button').forEach(button => {
        button.classList.add('class', 'dark')
    });}
    if(darkMode==true){
        document.querySelector('body').classList.remove('class', 'dark')
        document.querySelector('#output-screen').classList.remove('class', 'dark')
        document.querySelector('#running-equation').classList.remove('class', 'dark')
        document.querySelector('#calc-body').classList.remove('class', 'dark')
        document.querySelectorAll('button').forEach(button => {
        button.classList.remove('class', 'dark')
    });
    }
    darkMode=!darkMode;
})

    //bug: pressing equal button adds to array
    //set it so if you press another operator while there is no input, it switches operator
    //if pressing number after output given, clear
    //add cutting off numbers and high number functionality