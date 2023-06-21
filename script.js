// read history value from UI
function getHistoryValue() {
    return document.getElementById("history").innerText;
}

// write stuff to history area on UI
function printHistoryValue(num) {
    document.getElementById("history").innerText = num;
}

// read output value from UI
function getOutputValue() {
    return document.getElementById("output").innerText;
}

// write stuff to output area on UI 
function printOutputValue(num) {
    if (num === "") {
        document.getElementById("output").innerText = num;
    }
    else {
        document.getElementById("output").innerText = getFormattedNumber(num);
    }
}

// nicely formats output string value to a comma separated value 
function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

// remove comma separation format from formatted output
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ""));
}

addEventListener("DOMContentLoaded", function () {

    // listen for operator keys click events
    var operators = document.getElementsByClassName("op_key");
    var len = operators.length;
    for (i = 0; i < len; i++) {
        operators[i].addEventListener("click", function () {
            //AC button clicked
            if (this.id == "clear") {
                printHistoryValue("");
                printOutputValue("");
            }
            //Del button clicked
            else if (this.id == "backspace") {
                var output = reverseNumberFormat(getOutputValue()).toString();
                // check whether output has a value then remove last character and print to UI
                if (output) {
                    output = output.substr(0, output.length - 1);
                    printOutputValue(output);
                }
            }
            else {
                var output = getOutputValue();
                var history = getHistoryValue();
                // truncate non-numeric type last character from history value
                if (output === "" && history !== "") {
                    if (isNaN(history[history.length - 1])) {
                        history = history.substr(0, history.length - 1);
                    }
                }
                if (output !== "" || history !== "") {
                    // tenary operation to set output to empty when it is empty
                    output = output === "" ? output : reverseNumberFormat(output);
                    history += output;
                    if (this.id === "=") {
                        var result = eval(history);
                        printOutputValue(result);
                        printHistoryValue("");
                    }
                    else {
                        history += this.id;
                        printHistoryValue(history);
                        printOutputValue("");
                    }
                }
            }
        })
    }

    // listen for number keys click events
    var numbers = document.getElementsByClassName("num_key");
    var val = numbers.length;
    for (i = 0; i < val; i++) {
        numbers[i].addEventListener("click", function () {
            var output = reverseNumberFormat(getOutputValue());
            if (!isNaN(output)) {
                output += this.id;
                printOutputValue(output);
            }
        })
    }
});

//For Toogle Switch functioning
const toggleSwitch = document.querySelector('.toggle-switch');
const themeStyle = document.getElementById('theme-style');
const themeStyleDark = document.getElementById('theme-style-dark');

toggleSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleSwitch.classList.toggle('dark');
    themeStyle.disabled = !themeStyle.disabled;
    themeStyleDark.disabled = !themeStyleDark.disabled;
});