function Div(num1, num2) {
    if (num2 == 0) {
        console.log(`${num2} is not divisible by 0 In valid Operation`);
        return (0);
    }
    else {
        return num1 / num2;
    }
}
export { Div };
