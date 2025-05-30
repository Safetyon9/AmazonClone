import { formatCurrency } from "../scripts/utils/money.js";

console.log('Test suite: formatCurrency');

console.log('converts cents into dollars test 1.');

if(formatCurrency(2095) == '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('converts cents into dollars test 2.');

if(formatCurrency(99999) == '999.99') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with 0 test.');

if(formatCurrency(0) == '0.00') {
    console.log('passed');
} else {
    console.log('failed');

}

console.log('rounds up to the nearest cent test.');

if(formatCurrency(2000.5) == '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds down to the nearest cent test.');

if(formatCurrency(2000.4) == '20.00') {
    console.log('passed');
} else {
    console.log('failed');
}