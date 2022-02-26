let status = "initial";
let itemType = "integer";
let itemValue = 0;
const result = document.getElementById("result");

function setNumber(elem) {
  if ((status === "initial") || ((status === "number") && (itemType === "integer") && (itemValue == 0))) {
    result.value = result.value.slice(0, -1) + elem.value;
    status = "number";
    itemValue = 1;
  }
  else {
    result.value += elem.value;
    status = "number";
    itemValue = 1;
  }
}

function setOperator(elem) {
  if ((status === "initial") && (elem.value == "-")) {
    result.value = elem.value;
    status = "minus";
  }
  else if (status === "minus") {
    result.value = result.value.slice(0, -1) + "0" + elem.value;
    status = "operator";
    itemType = "integer";
    itemValue = 0;
  }
  else if ((status === "number") && (itemType === "decimal") && (itemValue == 0)) {
    const a = result.value;
    result.value = a.substring(0, a.lastIndexOf(".")) + elem.value;
    status = "operator";
    itemType = "integer";
  }
  else if (status === "operator") {
    result.value = result.value.slice(0, -1) + elem.value;
    itemType = "integer";
    itemValue = 0;
  }
  else {
    result.value += elem.value;
    status = "operator";
    itemType = "integer";
    itemValue = 0;
  }
}

function setZero(elem) {
  if ((status === "initial") || ((status === "number") && (itemType === "integer") && (itemValue == 0))) {
    return;
  }
  else if (status === "minus") {
    result.value = "0";
    status = "initial";
  }
  else if ((status === "operator") && (itemType === "integer")) {
    result.value += "0";
    status = "number";
  }
  else {
    result.value += elem.value;
    status = "number";
  }
}

function setDecimal(elem) {
  if (itemType === "decimal") {
    return;
  }
  else if (status === "minus") {
    result.value = "-0.";
    status = "operator";
    itemType = "decimal";
  }
  else if (status === "operator") {
    result.value += "0.";
    itemType = "decimal";
  }
  else {
    result.value += elem.value;
    status = "operator";
    itemType = "decimal";
  }
}

function calculate() {
  let formula;
  if (status === "minus") {
    result.value = "0";
    status = "initial";
  }
  else if (status === "operator") {
    formula = result.value.slice(0, -1);
    result.value = eval(formula);
    status = "number";
    itemValue = result.value;
    if (((result.value) % 1) !== 0) {
      itemType = "decimal";
    }
    else {
      itemType = "integer";
    }
  }
  else {
    formula = result.value;
    result.value = eval(formula);
    status = "number";
    itemValue = result.value;
    if (((result.value) % 1) !== 0) {
      itemType = "decimal";
    }
    else {
      itemType = "integer";
    }
  }
}

function clearScreen() {
  result.value = "0";
  status = "initial";
  itemType = "integer";
  itemValue = 0;
}
