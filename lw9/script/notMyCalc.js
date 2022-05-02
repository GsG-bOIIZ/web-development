function calc(expr) {
	if (typeof expr !== 'string') {
		console.error(`Argument error: ${expr} is not a string`);
		return NaN;
	}
	if (expr.length === 0) {
		console.error('Argument error: empty expression');
		return NaN;
	}
	
	let stack = [];
	let isFine = true;

	for (let i = expr.length - 1; i >= 0; i--) {
		// if (expr[i] === ' ') 
		// 	continue;

		if (isDigit(expr[i])) {
			

		} else if (expr[i] == ')') {
			

		} else if (isOperation(expr[i])) {
			// Perform operations
			// if (stack.length < 2) {
			// 	console.error(`Parsing error: too few arguments for '${expr[i]}' at ${i}`);
			// 	isFine = false;
			// 	break;
			// }
			//let res, op1, op2;
			switch (expr[i]) {
				case '+':
					// Sum all the previous values
					res = stack.reduce((acc, value) => acc + value, 0);
					stack = [res];
					break;
				case '-':
					op1 = stack.pop();
					op2 = stack.pop();
					stack.push(op1 - op2);
					break;
				case '*':
					// Multiply all the previous values
					res = stack.reduce((acc, value) => acc * value, 1);
					stack = [res];
					break;
				case '/':
					op1 = stack.pop();
					op2 = stack.pop();
					stack.push(op1 / op2);
					break;
			}
		} else {
			if (expr[i] === '(') console.error('Parsing error: parentheses do not match');
			else console.error(`Parsing error: unexpected token '${expr[i]}' at ${i}`);
			isFine = false;
			break;
		}
  	}

  	if (!isFine) return NaN;
  		return stack.pop();


	// Utility functions
	function isDigit(c) {
		return c >= '0' && c <= '9';
	}

	function isOperation(c) {
		return ['+', '-', '*', '/'].includes(c);
	}

	function getNumber(expr, start) {
		let numberStr = '';
		let i;
		for (i = start; i >= 0 && (isDigit(expr[i]) || expr[i] === '.'); i--) {
			numberStr = expr[i] + numberStr;
		}
		// Handle the optional minus for negative numbers
		if (expr[i] === '-') {
			numberStr = '-' + numberStr;
			i--;
		}
		let number = Number(numberStr);
		if (isNaN(number)) throw new Error('Parsing error: invalid number occured');
			return [Number(numberStr), i];
	}

	function getParenthesizedExprEnd(expr, start) {
		let depth = 0;
		let i;
		for (i = start; i >= 0; i--) {
			if (expr[i] === ')') depth++;
			if (expr[i] === '(') depth--;
			if (depth === 0) break;
		}
		if (depth !== 0) throw new Error('Parsing error: parentheses do not match');
			return i;
	}
}

/**
 * Testing utils
 */
// function assertEquals(actual, expected) {
//   if (actual !== expected) throw new Error(`expected: ${expected} but was: ${actual}`);
// }

// function assertNaN(value) {
//   if (!isNaN(value)) throw new Error(`expected: NaN but was: ${value}`);
// }