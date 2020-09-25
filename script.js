class Calculator {
	constructor(previosOperand, currentOperand) {
		this.previosOperand = previosOperand;
		this.currentOperand = currentOperand;
	}

	 compute () {

	 }

	 reset () {

	 }

	 updateDisplay() {

	 }
}

const calculator = new Calculator();

const display = document.querySelector('.viewer');
const digits = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.ops');
const equal = document.querySelector('.equals');

digits.forEach(digit => {
	digit.addEventListener('onclick', () => {
		calculator.updateDisplay();
	})
})