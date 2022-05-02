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
		if (expr[i] === ' ') 
			continue;

		if (isDigit(expr[i])) {
			// Input the number
			let number, numberEnd;
			try {
				[number, numberEnd] = getNumber(expr, i);
			} catch (e) {
				console.error(e.message);
				isFine = false;
				break;
			}
			i = numberEnd + 1; // Suppress the i-- in the for loop
			stack.push(number);

		} else if (expr[i] == ')') {
			// Recursively calculate the parenthesized expression
			const parenStart = i;
			try {
				i = getParenthesizedExprEnd(expr, i);
			} catch (e) {
				console.error(e.message);
				isFine = false;
				break;
			}
			stack.push(calc(expr.slice(i + 1, parenStart)));

		} else if (isOperation(expr[i])) {
			// Perform operations
			if (stack.length < 2) {
				console.error(`Parsing error: too few arguments for '${expr[i]}' at ${i}`);
				isFine = false;
				break;
			}
			let res, op1, op2;
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
 * Tests
 */
// Soft stuff
assertEquals(calc('+ 3 4'), 7);
assertEquals(calc('+ 2 * 2 2'), 6);
assertEquals(calc('* 2 + 2 2'), 8);
assertEquals(calc('+ 2 / 8 * 2 2'), 4);

// More-than-one-digit numbers
assertEquals(calc('* 1234 56'), 69104);

// Multiple operands
assertEquals(calc('- (+ 2 2 2 2) 1'), 7);

// Floating point numbers
assertEquals(calc('+ 12.1 7.9'), 20);

// Negative numbers
assertEquals(calc('+ -12 3'), -9);

// Parentheses
assertEquals(calc('* (- 5 6) 7'), -7);
assertEquals(calc('(+ (* 3 (+ (* 2 4) (+ 3 5))) (+ (- 10 7) 6))'), 57);

// Random whitespaces amount
assertEquals(calc('+(*2 2)2 4'), 10);
assertEquals(calc('/   ( * 12   3   )  6  '), 6);

// Too few arguments
assertNaN(calc('* 2 + 2'));

// Invalid symbols
assertNaN(calc('+ 2 d'));
assertNaN(calc('* 12 + 123hello12 7'));
assertNaN(calc('+ 12. 3'))
assertNaN(calc('+ 1..2 3'))
assertNaN(calc('+ 1.2.3 3'))

// Invalid parentheses
assertNaN(calc('+ 2 (- 3) 2)'));
assertNaN(calc('+ 2 (- 3( 2)'));

// Invalid type
assertNaN(calc(1337));


/**
 * Testing utils
 */
function assertEquals(actual, expected) {
  if (actual !== expected) throw new Error(`expected: ${expected} but was: ${actual}`);
}

function assertNaN(value) {
  if (!isNaN(value)) throw new Error(`expected: NaN but was: ${value}`);
}