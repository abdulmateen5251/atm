// import inquirer from "inquirer";
// let mybalance = 10000; //dollar
// let mypin = 1234;
// let pinAnswer = await inquirer.prompt([
//   {
//     name: "pin",
//     message: "enter your pin",
//     type: "number"
//   },
// ]);
// if (pinAnswer.pin === mypin) {
//   console.log("correct pin code!!!");
//   let operationans = await inquirer.prompt([
//     {
//       name: "operation",
//       message: "please select option",
//       type: "list",
//       choices: ["withdraw", "check balane"]
//     }
//   ]);
//   console.log(operationans);
//   if (operationans.operation === "withdraw") {
//     let amountAns = await inquirer.prompt([
//       {
//         name: "amount",
//         message: "enter your amount",
//         type: "number"
//       }
//     ]);
//     // =, -= ,+=
//     mybalance -= amountAns.amount;
//     console.log("your remaining balance is: " + mybalance);
//   } else if (operationans.operation === "check balance") {
//     console.groupCollapsed("yourbalance is:" + mybalance);
//   }
// } else {
//   console.log("incorrect pin number");
// }
import inquirer from "inquirer";
let mybalance = 10000; // Dollar
const mypin = 1234;
async function checkBalance(balance) {
    console.log("Your balance is: " + balance);
}
async function withdrawMoney(balance) {
    const withdrawalOptions = [1000, 2000, 5000, 8000, "Enter custom amount"];
    const withdrawalAmountAnswer = await inquirer.prompt([
        {
            name: "amount",
            message: "Select withdrawal amount:",
            type: "list",
            choices: withdrawalOptions
        }
    ]);
    let withdrawalAmount;
    if (withdrawalAmountAnswer.amount === "Enter custom amount") {
        const customAmountAnswer = await inquirer.prompt([
            {
                name: "customAmount",
                message: "Enter custom withdrawal amount:",
                type: "number"
            }
        ]);
        withdrawalAmount = customAmountAnswer.customAmount;
    }
    else {
        withdrawalAmount = parseInt(withdrawalAmountAnswer.amount);
    }
    if (withdrawalAmount > balance) {
        console.log("Insufficient balance. You cannot withdraw more than your available balance.");
        return balance;
    }
    else {
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
        }
        else if (operationans.operation === "Check Balance") {
            await checkBalance(mybalance);
        }
    }
    else {
        console.log("Incorrect pin number");
    }
}
main();
