$(document).ready(function () {
  // Cache the frequently accessed elements for better performance
  const calcOperation = $("#calc-operation");
  const calcTyped = $("#calc-typed");
  const historyContainer = $(".history-container");

  // Declare variables using "let" instead of "var" for better scoping
  let history = [];
  let topText = "";
  let typed = "";

  // Use "const" instead of "let" for elements that don't change
  const numButtons = $(".num");
  const optButtons = $(".opt");

  numButtons.click((e) => {
    typed += e.target.innerText;
    calcTyped.text(typed);
  });

  optButtons.click((e) => {
    const id = e.target.id;
    switch (id) {
      case "/":
      case "*":
      case "+":
      case "-":
        typed += ` ${id} `;
        calcTyped.text(typed);
        break;
      case "=":
        topText = typed;
        calcOperation.text(topText);
        typed = eval(calcTyped.text());
        calcTyped.text(typed);
        break;
      case "%":
        topText = `${typed} %`;
        calcOperation.text(topText);
        break;
      case "ac":
        calcTyped.text(0);
        typed = "";
        calcOperation.text(0);
        history.push(topText);
        topText = "";
        historyContainer.append(
          ` <input type="text" class="textfield" value='${
            history[history.length - 1]
          }' />`
        );
        history.shift();
        break;
      case "back":
        typed = typed.slice(0, -1);
        calcTyped.text(typed);
        break;
      case "negative":
        typed = eval(typed) * -1;
        calcTyped.text(typed);
        break;
    }
  });
});
