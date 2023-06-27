const db = new DB();
let customers = [];
const regExCusID = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{3,20}$/;
const regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
const regExSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

const customerValidations = [
  {
    reg: regExCusID,
    field: $("#txtCustomerId"),
    error: "Customer ID Pattern is Wrong : C00-001",
  },
  {
    reg: regExCusName,
    field: $("#txtCustomerName"),
    error: "Customer Name Pattern is Wrong : A-z 3-20",
  },
  {
    reg: regExCusAddress,
    field: $("#txtCustomerAddress"),
    error: "Customer Address Pattern is Wrong : A-z 0-9 ,/",
  },
  {
    reg: regExSalary,
    field: $("#txtCustomerSalary"),
    error: "Customer Salary Pattern is Wrong : 100 or 100.00",
  },
];

const customerValidationsUpdate = [
  {
    reg: regExCusID,
    field: $("#searchCustomerId"),
    error: "Customer ID Pattern is Wrong : C00-001",
  },
  {
    reg: regExCusName,
    field: $("#nameUpdate"),
    error: "Customer Name Pattern is Wrong : A-z 3-20",
  },
  {
    reg: regExCusAddress,
    field: $("#addressUpdate"),
    error: "Customer Address Pattern is Wrong : A-z 0-9 ,/",
  },
  {
    reg: regExSalary,
    field: $("#salaryUpdate"),
    error: "Customer Salary Pattern is Wrong : 100 or 100.00",
  },
];

$(document).ready(() => {
  loadAllCustomers();
});

$("#btnSearchCus").click(() => {
  let result = customers.find(({ id }) => id === $("#searchCusId").val());

  if (result != null) {
    $("#customerTable").empty();
    let row = `<tr><td>${result.id}</td><td>${result.name}</td><td>${result.address}</td><td>${result.salary}</td></tr>`;
    $("#customerTable").append(row);

    $("#searchCustomerId").val(result.id);
    $("#nameUpdate").val(result.name);
    $("#addressUpdate").val(result.address);
    $("#salaryUpdate").val(result.salary);

    $("#searchCIdDelete").val(result.id);
    $("#disabledNameDelete").val(result.name);
    $("#disabledAddressDelete").val(result.address);
    $("#disabledSalaryDelete").val(result.salary);
  } else {
    emptyMassage();
    clearCDTextFields();
  }
});

$("#searchCusId").keypress(function (event) {
  if (event.which === 13) {
    $("#btnSearchCus").focus();
  }
});

$("#btnSearchCus").keypress(function (event) {
  if (event.which === 13) {
    $("#searchCusId").focus();
  }
});

$("#clearSearchCus").click(() => {
  searchCusId.value = "";
  clearCDTextFields();
  clearCUTextFields();
  loadAllCustomers();
});

$("#btnCSave").click(() => {
  db.save(
    new Customer(
      $("#txtCustomerId").val(),
      $("#txtCustomerName").val(),
      $("#txtCustomerAddress").val(),
      $("#txtCustomerSalary").val()
    )
  );
  clearTextFieldsC();

  saveUpdateAlert("Customer", "saved.");

  $("#txtCustomerId").val(generateCustomerID());
  loadAllCustomers();
});

$("#txtCustomerId").focus();

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on(
  "keydown",
  function (event) {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  }
);

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on(
  "keyup",
  function (event) {
    checkValidity(customerValidations);
  }
);

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on(
  "blur",
  function (event) {
    checkValidity(customerValidations);
  }
);

$("#txtCustomerId").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExCusID, $("#txtCustomerId"))) {
    $("#txtCustomerName").focus();
  } else {
    focusText($("#txtCustomerId"));
  }
});

$("#txtCustomerName").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExCusName, $("#txtCustomerName"))) {
    focusText($("#txtCustomerAddress"));
  }
});

$("#txtCustomerAddress").on("keydown", function (event) {
  if (
    event.key === "Enter" &&
    check(regExCusAddress, $("#txtCustomerAddress"))
  ) {
    focusText($("#txtCustomerSalary"));
  }
});

$("#txtCustomerSalary").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExSalary, $("#txtCustomerSalary"))) {
    if (event.which === 13) {
      $("#btnCSave").focus();
    }
  }
});

$("#searchCustomerId,#nameUpdate,#addressUpdate,#salaryUpdate").on(
  "keydown",
  function (event) {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  }
);

$("#searchCustomerId,#nameUpdate,#addressUpdate,#salaryUpdate").on(
  "keyup",
  function (event) {
    checkValidity(customerValidationsUpdate);
  }
);

$("#searchCustomerId,#nameUpdate,#addressUpdate,#salaryUpdate").on(
  "blur",
  function (event) {
    checkValidity(customerValidationsUpdate);
  }
);

$("#searchCustomerId").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExCusID, $("#searchCustomerId"))) {
    $("#nameUpdate").focus();
  } else {
    focusText($("#searchCustomerId"));
  }
});

$("#nameUpdate").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExCusName, $("#nameUpdate"))) {
    focusText($("#addressUpdate"));
  }
});

$("#addressUpdate").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExCusAddress, $("#addressUpdate"))) {
    focusText($("#salaryUpdate"));
  }
});

$("#salaryUpdate").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExSalary, $("#salaryUpdate"))) {
    if (event.which === 13) {
      $("#bntUpdateCustomer").focus();
    }
  }
});

$("#bntUpdateCustomer").click(() => {
  let CustomerId = $("#searchCustomerId").val();
  console.log(CustomerId);
  let response2 = updateCustomers(CustomerId);
  if (response2) {
    saveUpdateAlert(CustomerId, "updated.");
    clearCUTextFields();
    checkValidity(customerValidationsUpdate);
  } else {
    unSucsessUpdateAlert(CustomerId);
  }
});

$("#btnClearC").click(() => {
  clearTextFieldsC();
});

$("#btnDclearC").click(function () {
  clearCDTextFields();
});

$("#btnUclearC").click(() => {
  clearCUTextFields();
});

$("#searchCIdDelete").keyup(function (event) {
  if (event.keyCode === 13) {
    let result = customers.find(({ id }) => id === $("#searchCIdDelete").val());

    if (result != null) {
      $("#searchCIdDelete").val(result.id);
      $("#disabledNameDelete").val(result.name);
      $("#disabledAddressDelete").val(result.address);
      $("#disabledSalaryDelete").val(result.salary);
    } else {
      emptyMassage();
      clearCDTextFields();
    }
  }
});

$("#btnDeleteCustomer").click(() => {
  const deleteID = $("#searchCIdDelete").val();
  yesNoAlertDelete(deleteID);
});

function generateCustomerID() {
  if (customers.length > 0) {
    let lastId = customers[customers.length - 1].id;
    let digit = lastId.substring(6);
    let number = parseInt(digit) + 1;
    return lastId.replace(digit, number);
  } else {
    return "C00-001";
  }
}

function blindClickEvents() {
  $("#customerTable>tr").click(function (e) {
    let id = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let address = $(this).children().eq(2).text();
    let salary = $(this).children().eq(3).text();

    $("#searchCustomerId").val(id);
    $("#nameUpdate").val(name);
    $("#addressUpdate").val(address);
    $("#salaryUpdate").val(salary);

    $("#searchCIdDelete").val(id);
    $("#disabledNameDelete").val(name);
    $("#disabledAddressDelete").val(address);
    $("#disabledSalaryDelete").val(salary);
  });
}

function dblRowClickEventsCus() {
  $("#customerTable>tr").on("dblclick", function () {
    let deleteCusID = $(this).children().eq(0).text();
    yesNoAlertDelete(deleteCusID);
  });
}

function setButtonStateCS(value) {
  if (value > 0) {
    $("#btnCSave").attr("disabled", true);
  } else {
    $("#btnCSave").attr("disabled", false);
  }
}

function clearTextFieldsC() {
  txtCustomerId.value = "";
  txtCustomerName.value = "";
  txtCustomerAddress.value = "";
  txtCustomerSalary.value = "";
  $("#txtCustomerId").focus();
  checkValidity(customerValidations);
}

async function loadAllCustomers() {
  customers = await db.getAll(new Customer());
  $("#customerTable").empty();

  for (let customer of customers) {
    const row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
    $("#customerTable").append(row);
  }
  blindClickEvents();
  dblRowClickEventsCus();
  loadAllCustomersForOption();
}

function setButtonStateCU(value) {
  if (value > 0) {
    $("#bntUpdateCustomer").attr("disabled", true);
  } else {
    $("#bntUpdateCustomer").attr("disabled", false);
  }
}

async function updateCustomers(CustomerId) {
  let customer = searchCustomer(CustomerId);
  console.log("cust up", customer);
  if (customer != null) {
    const id = $("#searchCustomerId").val();
    const name = $("#nameUpdate").val();
    const address = $("#addressUpdate").val();
    const salary = $("#salaryUpdate").val();

    const res = await db.update(new Customer(id, name, address, salary));
    loadAllCustomers();
    return res;
  } else {
    return false;
  }
}

function searchCustomer(cusId) {
  for (let customer of customers) {
    if (customer.id === cusId) {
      return customer;
    }
  }
  return null;
}

function clearCUTextFields() {
  searchCustomerId.value = "";
  nameUpdate.value = "";
  addressUpdate.value = "";
  salaryUpdate.value = "";
}

async function deleteCustomer(customerID) {
  const res = await db.delete(new Customer(customerID));
  loadAllCustomers();
  clearCDTextFields();
  return res;
}

function clearCDTextFields() {
  searchCIdDelete.value = "";
  disabledNameDelete.value = "";
  disabledAddressDelete.value = "";
  disabledSalaryDelete.value = "";
}
