const display = document.getElementById("display");

document.querySelectorAll("input[type='button']").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if(value){
            append(value);
        } else if(action){
            handleAction(action);
        }
    });
});

document.addEventListener("keydown", (e) => {
    if(!isNaN(e.key) || "+-*/.".includes(e.key)){
        e.preventDefault();
        append(e.key);
    }
    if(e.key === "Enter"){
        e.preventDefault();
        evaluateExpression();
    }
    if(e.key === "Backspace"){
        e.preventDefault();
        display.value = display.value.slice(0,-1);
    }
    if(e.key === "Escape"){
        e.preventDefault();
        display.value = "";
    }
});

function append(val){
    display.value +=val;
}

function handleAction(action){
    switch (action){
        case "clear":
            display.value = "";
            break;

        case "delete":
            display.value = display.value.slice(0,-1);
            break;

        case "calculate":
            evaluateExpression();
            break;

        case "sin":
        case "cos":
        case "tan":
            trig(action);
            break;

        case "square":
            square();
            break;
    }
}

function trig(type){
    let angle = parseFloat(display.value);

    if(isNaN(angle)) {
        display.value = "Error";
        return;
    }

    let radians = angle * (Math.PI / 180);
    let result;

    if(type === "sin") result = Math.sin(radians);
    if(type === "cos") result = Math.cos(radians);
    if(type === "tan") {
        if (Math.abs(angle % 180) === 90){
            display.value = "Undefined";
            return;
        }
        result = Math.tan(radians);
    }

    display.value = result.toFixed(8);
}

function square(){
    let value = parseFloat(display.value);

    if(isNaN(value)){
        display.value = "Error";
        return;
    }
    display.value = value * value;
}

function evaluateExpression(){
    try {
        if (!display.value) return;
        display.value = Function('"use strict"; return (' + display.value + ')')();
    } catch{
        display.value = "Error";
    }
}
