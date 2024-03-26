let display = document.getElementById("display");

let calculator = {
    history: [],
lastResult:null,
    add_display: function(value) {
        let currentValue = display.value;
        let lastValue = currentValue[currentValue.length - 1];

        if ((lastValue === '+' || lastValue === '-' || lastValue === '*' || lastValue === '/') && (value === '+' || value === '-' || value === '*' || value === '/')) {
            return; 
        } 
        else {
            display.value += value; 
        }
    },

    calculate: function() {
        let expression = display.value;
        let result;
        let calculateFunction = new Function('return ' + expression);
        result = calculateFunction();
        display.value = result;
        this.lastResult=result;
        this.history.push(expression + ' = ' + result);
    },

    clearDisplay: function() {
        display.value = '';
    },
delete:function(){
    currentValue=display.value;
    display.value = currentValue.slice(0, -1); 
},
    displayHistory: function() {
        let historyDisplay = document.getElementById('history');
        historyDisplay.innerHTML = '<h5>History</h5>';
        for (let i = 0; i < this.history.length; i++) {
            historyDisplay.innerHTML += '<p>' + this.history[i] + '</p>';
        }
    },
    useLastResult: function() {
        if (this.lastResult !== null) {
            display.value += this.lastResult; 
           
        }
    },
    keyDown: function (event) {
        if (event.key === "Enter") {
          this.calculate();
          this.displayHistory();
        }
      }
};
