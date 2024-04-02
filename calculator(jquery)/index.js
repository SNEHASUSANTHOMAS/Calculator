$(document).ready(function(){
    
    let calculator = {
        display : $("#display"),
        $numberBtn: null,
        $operatorBtn: null,
        $calculateBtn: null,
        $allClearBtn: null,
        $deleteBtn: null,
        $useLastResultBtn: null,
        history: [],
        lastResult: null,
        init:function(){
            this.$numberBtn = $(".number-btn");
            this.$operatorBtn = $(".operator-btn");
            this.$calculateBtn = $(".calculate-btn");
            this.$allClearBtn = $(".allClear-btn");
            this.$deleteBtn = $(".delete-btn");
            this.$useLastResultBtn = $(".useLastResult-btn");

        },
        eventHandler: function () {
            let that=this;
            console.log(that);
            this.$numberBtn.click(function(){
                let value = $(this).data("value");
                that.add_display(value);
                
            })
            this.$operatorBtn.click(function(){
                let value = $(this).data("operator");
                that.add_display(value);  
            })
            this.$calculateBtn.click(function(){
                that.calculate();
                that.displayHistory();  
            })
            this.$allClearBtn.click(function(){
                that.display.val('');   
            })
            this.$deleteBtn.click(function(){
                that.delete();
            })
            this.$useLastResultBtn.click(function(){
                that.useLastResult();
            })
            $(document).keydown(function(event) {
                if (event.key === "Enter") {
                   that.calculate();
                   that.displayHistory();
                }
            });
        },
        add_display: function(value) {
            let currentValue =this.display.val();
            let lastValue = currentValue[currentValue.length - 1];
            if ((lastValue === '+' || lastValue === '-' || lastValue === '*' || lastValue === '/') && (value === '+' || value === '-' || value === '*' || value === '/')) {
                return; 
            } 
            else {
                this.display.val(currentValue + value); 
            }
        },
        calculate: function() {
            let expression =this.display.val();
            let result;
            let calculateFunction = new Function('return ' + expression);
            result = calculateFunction();
            result = parseFloat(result);
            this.display.val(result);
            this.lastResult = result;
            this.history.push(expression + ' = ' + result);
        },
        allClear: function() {
            this.display.val('');
        },
        delete: function() {
            let currentValue = this.display.val();
            this.display.val(currentValue.slice(0, -1)); 
        },
        displayHistory: function() {
            let historyDisplay = $('#history');
            historyDisplay.html('<h5>History</h5>');
            for (let i = 0; i < this.history.length; i++) {
                historyDisplay.append('<p>' + this.history[i] + '</p>');
            }
        },
        useLastResult: function() {
            if (this.lastResult !== null) {
                this.display.val(this.display.val() + this.lastResult); 
            }
        }
        
    };
    calculator.init();
    calculator.eventHandler();
});

