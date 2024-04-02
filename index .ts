
import inquirer from "inquirer";

let mybalance = 10000; // Dollar
const mypin = 1234;

async function checkBalance(balance: number): Promise<void> {
  console.log("Your balance is: " + balance);
}

async function withdrawMoney(balance: number): Promise<number> {
  const withdrawalOptions = [1000, 2000, 5000, 8000, "Enter custom amount"];
  const withdrawalAmountAnswer = await inquirer.prompt([
    {
      name: "amount",
      message: "Select withdrawal amount:",
      type: "list",
      choices: withdrawalOptions
    }
  ]);

  let withdrawalAmount: number;
  if (withdrawalAmountAnswer.amount === "Enter custom amount") {
    const customAmountAnswer = await inquirer.prompt([
      {
        name: "customAmount",
        message: "Enter custom withdrawal amount:",
        type: "number"
      }
    ]);
    withdrawalAmount = customAmountAnswer.customAmount;
  } else {
    withdrawalAmount = parseInt(withdrawalAmountAnswer.amount);
  }

  if (withdrawalAmount > balance) {
    console.log("Insufficient balance. You cannot withdraw more than your available balance.");
    return balance;
  } else {
    console.log("Withdrawn amount: " + withdrawalAmount);
    return balance - withdrawalAmount;
  }
}

async function main() {
  let pinAnswer = await inquirer.prompt([
    {
      name: "pin",
      message: "Enter your pin",
      type: "number"
    },
  ]);

  if (pinAnswer.pin === mypin) {
    console.log("Correct pin code!!!");

    let operationans = await inquirer.prompt([
      {
        name: "operation",
        message: "Please select an option",
        type: "list",
        choices: ["Withdraw", "Check Balance"]
      }
    ]);

    if (operationans.operation === "Withdraw") {
      mybalance = await withdrawMoney(mybalance);
      console.log("Your remaining balance is: " + mybalance);
    } else if (operationans.operation === "Check Balance") {
      await checkBalance(mybalance);
    }
  } else {
    console.log("Incorrect pin number");
  }
}

main();
