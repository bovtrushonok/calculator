class Calculator {
	constructor(previosOperand, currentOperand) {
		this.previousOperand = previosOperand;
		this.currentOperand = currentOperand;
		this.operation = undefined;
		this.computation = '';
		this.clear();
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	clear () {
		this.currentOperand = '';
		this.previousOperand = '';
		this.computation = '';
		this.operation = undefined;
	}

	appendNumber(digit) {
		if (this.currentOperand.toString().includes('.') && digit === '.') return;
		else if (this.computation) {
			this.currentOperand = digit;
			this.computation = '';
		}
		else this.currentOperand += digit.toString();
	}

	chooseOperation (op) {
		if (this.currentOperand === '' && op !== "-") return;
		if (this.previousOperand !== "") this.compute();
		if (op == "√") {
			this.operation = op;
			this.previousOperand = this.currentOperand;
			this.currentOperand = '';
			this.compute();
			return;
		};
		if (this.currentOperand === '' && op == '-') {
			this.currentOperand = '-';
			return;
		}
		this.operation = op;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute () {
		let computation;
		let prev = parseFloat(this.previousOperand);
		let current = parseFloat(this.currentOperand);
		if ((isNaN(prev) || isNaN(current)) && this.operation !== "√") return;
		switch(this.operation) {
			case "+":
			computation = prev + current;
			break;
			case "-":
			computation = prev - current; ;
			break;
			case "*":
			computation = prev * current;
			break;
			case "÷":
			computation = prev / current;
			break;
			case "√":
			if (prev < 0) {
				alert('impossible operation, parameter changed automatically');
				computation = Math.pow(Math.abs(prev), 0.5);
			}  else {
				computation = Math.pow(prev, 0.5);
			}
			this.currentOperand = computation;
			this.operation = undefined;
			this.previousOperand = '';
			break;	
			case "^":
			computation = Math.pow(prev, current);
			break;
			default: 
			return;
		}
		if (computation % 1 != 0) {
			let fractionNumberLength = (computation.toString().split('.').pop().length >15) ? 2 : computation.toString().split('.').pop().length;
			this.currentOperand = computation.toFixed(fractionNumberLength);
			this.computation = computation.toFixed(fractionNumberLength);
		} else {
			this.currentOperand = computation;
			this.computation = computation;
		}
			this.operation = undefined;
			this.previousOperand = '';
		
	 }

	updateDisplay() {
	 	currentOperandDisplay.textContent = this.currentOperand;
	 	if (this.operation) {
			  previousResultDisplay.textContent = `${this.previousOperand} ${this.operation}`;

    	} else {
			  previousResultDisplay.textContent = this.previousOperand;
	  	}
   }
	 	
}

const previousResultDisplay = document.querySelector('.previousResultDisplay');
const currentOperandDisplay = document.querySelector('.currentOperandDisplay');
const previousOperand = document.querySelector('.previousResultDisplay').textContent;
const currentOperand = document.querySelector('.currentOperandDisplay').textContent;
const digits = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.ops');
const equal = document.querySelector('.equals');
const del = document.querySelector('.clear');
const clearAll = document.querySelector('.clearAll');

const calculator = new Calculator(previousOperand, currentOperand);
digits.forEach(digit => {
	digit.addEventListener('click', () => {
		calculator.appendNumber(digit.textContent);
		calculator.updateDisplay();
	})
});

del.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});

operations.forEach(op => {
	op.addEventListener('click', () => {
		calculator.chooseOperation(op.textContent);
		calculator.updateDisplay();
	})
});

equal.addEventListener('click', () => {
		calculator.compute();
		calculator.updateDisplay();
});

clearAll.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

