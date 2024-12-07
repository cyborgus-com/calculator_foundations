screen = document.querySelector("#screen");

reset = document.querySelector("#reset");
posneg = document.querySelector("#posneg");
percentage = document.querySelector("#percentage");
comma = document.querySelector("#comma");
equals = document.querySelector("#equals");

one = document.querySelector("#one");
two = document.querySelector("#two");
three = document.querySelector("#three");
four = document.querySelector("#four");
five = document.querySelector("#five");
six = document.querySelector("#six");
seven = document.querySelector("#seven");
eight = document.querySelector("#eight");
nine = document.querySelector("#nine");
zero = document.querySelector("#zero");

multiply = document.querySelector("#multiply");
divide = document.querySelector("#divide");
minus = document.querySelector("#minus");
plus = document.querySelector("#plus");

// create dummy variables for two numbers and the operator
let numFirst;
let numSecond;
let operator;
let result;

function resetEnv() {
    // reset all variables
    numFirst = undefined;
    numSecond = undefined;
    operator = undefined;
    result = undefined;
    screen.textContent = '';
}

function appendNum(num) {
    if (screen.textContent === '0' || screen.textContent == String(numFirst)) {
        screen.textContent = '';
    }
    if (screen.textContent.includes(`.`) && num == '.') {
        return;
    }
    screen.textContent += num;
}

function operate(action, finalize=false) {
    // FIRST VAR EMPTY - if the first variable is empty, this means it's been cleared:
    //  - either 1/ with resetEnv() function call or 
    // 2/ after `equals` button press,
    // then fill the numFirst with what's on the screen
    // FIRST VAR NON-EMPTY - if it's not empty, then we do these steps:
    // step 1 - move the screen items into the second variable
    // step 2 - run the operator on the two variables and store them into result
    // step 2 options:
    //  2.A. If the operator is `equals`, store result into screen, and store it as numFirst, clear second variable, 
    //          clear operator variable.
    //  2.B If the operator is other, store result into screen, store result as numFirst, clear second variable,
    //          adjust operator to the new one provided as an input into the function
    if (numFirst==undefined) {
        numFirst = parseFloat(screen.textContent);
        operator = action;
    }
    else {
        numSecond = parseFloat(screen.textContent);
        switch(operator) {
            case `plus`:
                result = numFirst + numSecond;
                break;
            case `minus`:
                result = numFirst - numSecond;
                break;
            case `divide`:
                if (numSecond==0) {
                    screen.textContent = `Divide by zero makes me dizzy!`
                    // resetEnv();
                    return;
                }
                result = numFirst / numSecond;
                break;
            case `multiply`:
                result = numFirst * numSecond;
                break;
        }
        screen.textContent = result;
        numFirst = result;
        numSecond = undefined;
        if (finalize) {
            operator = undefined;
        } else {
            operator = action;
        }
    }
}

reset.addEventListener("click", () => resetEnv());
// posneg.addEventListener("click", );
percentage.addEventListener("click", () => {
    screen.textContent = screen.textContent * (-1)});
comma.addEventListener("click", () => appendNum('.'));
equals.addEventListener("click", () => operate(`equals`, true));

const numbers = [zero, one, two, three, four, five, six, seven, eight, nine];
numbers.forEach((button, index) => {
    button.addEventListener("click", () => appendNum(index));
});

multiply.addEventListener("click", () => operate(`multiply`));
divide.addEventListener("click", () => operate(`divide`));
minus.addEventListener("click", () => operate(`minus`));
plus.addEventListener("click", () => operate(`plus`));