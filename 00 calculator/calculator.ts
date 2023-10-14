#!/usr/bin/env node
import inquirer from "inquirer";
import { Add } from "./Add.js";
import { Sub } from "./Sub.js";
import { Mul } from "./Multiply.js";
import { Div } from "./Divide.js";

async function Cal() {
  const num1 = await inquirer.prompt({
    type: "input",
    name: "v1",
    message: "Enter first number",
  });
  const num2 = await inquirer.prompt({
    type: "input",
    name: "v2",
    message: "Enter Second number",
  });
  const operator = await inquirer.prompt({
    type: "list",
    name: "op",
    message: "Enter the Operation '+', '-', '*' , '/'",
    choices: ["+", "-", "*", "/"],
  });
  const number1 = parseFloat(num1.v1);
  const number2 = parseFloat(num2.v2);
  const operation = operator.op;
  let result;
  switch (operation) {
    case "+":
      result = Add(number1, number2);
      break;
    case "-":
      result = Sub(number1, number2);
      break;
    case "*":
      result = Mul(number1, number2);
      break;
    case "/":
      result = Div(number1, number2);
      break;

    default:
      console.log("Invalid Operator");
      return;
  }

  console.log(`The Result of ${number1} ${operation} ${number2} is ${result}`);
}

Cal();
