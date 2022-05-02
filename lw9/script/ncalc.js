function calc(expr) {
	if (typeof expr !== 'string') {
		console.error(`Argument error: ${expr} is not a string`);
		return;
	}
	if (expr.length === 0) {
		console.error('Argument error: empty expression');
		return;
	}

	let count = 0;
	for (let i = 0; i < expr.length; i++) {
		if (expr[i] == '(')
			count++;	
		if (expr[i] == ')')
			count--;	
	}
	if (count != 0) {
		console.error(`Argument error: '(' or ')'`);
		return;
	}
	expr = expr.replace(/[(,)]/g, ' ');
	console.log(expr);
	for (let i = 1; i < expr.length; i++) {
		if (isOperation(expr[i])) {
			expr = expr.slice(0, i-1) + ' ' + expr[i] + ' ' + expr.slice(i+1 - expr.length);
		}
	}
	console.log(expr);
	expr = expr.replace(/ +/g, ' ').trim().split(' ').reverse();
	console.log(expr);
	let stack = [];
	let flag = false;

	for (let i = 0; i < expr.length; i++) {
		if (isNaN(expr[i]) == false && isFinite(expr[i])) {
			stack.push(parseFloat(expr[i]));
		} else if (!(isOperation(expr[i]))) {
			console.error(`Met not a number (${expr[i]})`);
			flag = true;
			break;
		}

		if (isOperation(expr[i])) {
			switch (expr[i]) {
				case '+':
					op1 = stack.pop();
					op2 = stack.pop();
					if (isNaN(op2)) {
						console.error('Malo arg');
						flag = true;
						break;
					}
					stack.push(op1 + op2);
					break;
				case '-':
					op1 = stack.pop();
					op2 = stack.pop();
					if (isNaN(op2)) {
						console.error('Malo arg');
						flag = true;
						break;
					}
					stack.push(op1 - op2);
					break;
				case '*':
					op1 = stack.pop();
					op2 = stack.pop();
					if (isNaN(op2)) {
						console.error('Malo arg');
						flag = true;
						break;
					}
					stack.push(op1 * op2);
					break;
				case '/':
					op1 = stack.pop();
					op2 = stack.pop();
					if (isNaN(op2)) {
						console.error('Malo arg');
						flag = true;
						break;
					}
					stack.push(op1 / op2);
					break;
			}
		}	
		if (flag)
			break;
	}

	if (flag) {
		console.error('Something wrong');
		return;
	}
	
	if (stack.length != 1) {
		console.error('Too much arg');
		return;
	}
	return stack.pop();

	function isOperation(c) {
		return ['+', '-', '*', '/'].includes(c);
	}

}

// calc('+ 3 4') = 7;
// calc('+ 2 * 2 2') = 6
// calc('* 2 + 2 2') = 8
// calc('+ 2 / 8 * 2 2') = 4

// More-than-one-digit numbers
// calc('* 1234 56') = 69104

// Floating point numbers
// calc('+ 12.1 7.9') = 20

// Negative numbers
// calc('+ -12 3') = -9

// Parentheses
// calc('* (- 5 6) 7') = -7
// calc('(+ (* 3 (+ (* 2 4) (+ 3 5))) (+ (- 10 7) 6))') = 57

// Random whitespaces amount
// calc('/   ( * 12   3   )  6  ') = 6

// Too few arguments
// calc('* 2 + 2')

// Invalid symbols
// calc('+ 2 d')
// calc('* 12 + 123hello12 7')
// calc('+ 1..2 3')
// calc('+ 1.2.3 3')

// Invalid parentheses
// calc('+ 2 (- 3) 2)')
// calc('+ 2 (- 3( 2)')

// Invalid type
// calc(1337)