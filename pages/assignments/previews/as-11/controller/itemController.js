let items = [];
$("#txtItemsId").focus();
const regExItemCode = /^(I00-)[0-9]{3,4}$/;
const regExItemName = /^[A-z ]{3,20}$/;
const regExItemPrice = /^[0-9]{1,10}$/;
const regExItemQtyOnHand = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

const itemsValidations = [
  {
    reg: regExItemCode,
    field: $("#txtItemsId"),
    error: "Item ID Pattern is Wrong : I00-001",
  },
  {
    reg: regExItemName,
    field: $("#txtItemName"),
    error: "Item Name Pattern is Wrong : A-z 3-20",
  },
  {
    reg: regExItemPrice,
    field: $("#txtItemQty"),
    error: "Item Qty Pattern is Wrong : 0-9 1-10",
  },
  {
    reg: regExItemQtyOnHand,
    field: $("#txtItemPrice"),
    error: "Item Salary Pattern is Wrong : 100 or 100.00",
  },
];

const itemsValidationsUpdate = [
  {
    reg: regExItemCode,
    field: $("#searchItemId"),
    error: "Item ID Pattern is Wrong : I00-001",
  },
  {
    reg: regExItemName,
    field: $("#updateItemName"),
    error: "Item Name Pattern is Wrong : A-z 3-20",
  },
  {
    reg: regExItemPrice,
    field: $("#updateItemQty"),
    error: "Item Qty Pattern is Wrong : 0-9 1-10",
  },
  {
    reg: regExItemQtyOnHand,
    field: $("#updateItemPrice"),
    error: "Item Salary Pattern is Wrong : 100 or 100.00",
  },
];

$("#btnViewAllItems").click(function () {
  loadAllItems();
});

$(document).ready(() => {
  loadAllItems();
});

$("#btnISave").click(function () {
  db.save(
    new Item(
      $("#txtItemsId").val(),
      $("#txtItemName").val(),
      $("#txtItemQty").val(),
      $("#txtItemPrice").val()
    )
  );
  clearTextFieldsI();
  saveUpdateAlert("Item", "saved.");
  $("#txtItemsId").val(generateItemID());
  loadAllItems();
});

$("#txtItemsId,#txtItemName,#txtItemQty,#txtItemPrice").on(
  "keydown",
  function (event) {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  }
);

$("#txtItemsId,#txtItemName,#txtItemQty,#txtItemPrice").on(
  "keyup",
  function (event) {
    checkValidity(itemsValidations);
  }
);

$("#txtItemsId,#txtItemName,#txtItemQty,#txtItemPrice").on(
  "blur",
  function (event) {
    checkValidity(itemsValidations);
  }
);

$("#txtItemsId").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExItemCode, $("#txtItemsId"))) {
    $("#txtItemName").focus();
  } else {
    focusText($("#txtItemsId"));
  }
});

$("#txtItemName").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExItemName, $("#txtItemName"))) {
    focusText($("#txtItemQty"));
  }
});

$("#txtItemQty").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExItemPrice, $("#txtItemQty"))) {
    focusText($("#txtItemPrice"));
  }
});

$("#txtItemPrice").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExItemQtyOnHand, $("#txtItemPrice"))) {
    if (event.which === 13) {
      $("#btnISave").focus();
    }
  }
});

$("#btnUclearI").click(function () {
  clearUTextFields();
});

$("#searchDItemId").keyup(function (event) {
  if (event.keyCode === 13) {
    let resultI = items.find(({ code }) => code === $("#searchDItemId").val());

    if (resultI != null) {
      $("#searchDItemId").val(resultI.code);
      $("#DItemName").val(resultI.name);
      $("#DItemQty").val(resultI.qty);
      $("#DItemPrice").val(resultI.price);
    } else {
      emptyMassage();
      clearCDTextFields();
    }
  }
});

$("#btnDeleteItems").click(function () {
  let deleteIID = $("#searchDItemId").val();
  yesNoAlertIDelete(deleteIID);
});

$("#btnSearchItem").click(function () {
  let resultI = items.find(({ code }) => code === $("#ItemIdSearch").val());

  if (resultI != null) {
    $("#ItemTable").empty();
    let row = `<tr><td>${resultI.code}</td><td>${resultI.name}</td><td>${resultI.qty}</td><td>${resultI.price}</td></tr>`;
    $("#ItemTable").append(row);

    $("#searchItemId").val(resultI.code);
    $("#updateItemName").val(resultI.name);
    $("#updateItemQty").val(resultI.qty);
    $("#updateItemPrice").val(resultI.price);

    $("#searchDItemId").val(resultI.code);
    $("#DItemName").val(resultI.name);
    $("#DItemQty").val(resultI.qty);
    $("#DItemPrice").val(resultI.price);
  } else {
    emptyMassage();
    clearCDTextFields();
  }
});

$("#ItemIdSearch").keypress(function (event) {
  if (event.which === 13) {
    $("#btnSearchItem").focus();
  }
});

$("#btnSearchItem").keypress(function (event) {
  if (event.which === 13) {
    $("#ItemIdSearch").focus();
  }
});

$("#clearSearchItem").click(function () {
  ItemIdSearch.value = "";
  clearUTextFields();
  clearDTextFields();
  loadAllItems();
});

$("#btnUpdateItem").click(function () {
  let ItemId = $("#searchItemId").val();
  let response = updateItem(ItemId);
  if (response) {
    saveUpdateAlert(ItemId, "updated.");
    checkValidity(itemsValidationsUpdate);
  } else {
    unSucsessUpdateAlert(ItemId);
  }
});

$("#btnClearI").click(function () {
  clearTextFieldsI();
});

$("#searchItemId,#updateItemName,#updateItemQty,#updateItemPrice").on(
  "keydown",
  function (event) {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  }
);

$("#searchItemId,#updateItemName,#updateItemQty,#updateItemPrice").on(
  "keyup",
  function (event) {
    checkValidity(itemsValidationsUpdate);
  }
);

$("#searchItemId,#updateItemName,#updateItemQty,#updateItemPrice").on(
  "blur",
  function (event) {
    checkValidity(itemsValidationsUpdate);
  }
);

$("#searchItemId").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExItemCode, $("#searchItemId"))) {
    $("#updateItemName").focus();
  } else {
    focusText($("#searchItemId"));
  }
});

$("#updateItemName").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExItemName, $("#updateItemName"))) {
    focusText($("#updateItemQty"));
  }
});

$("#updateItemQty").on("keydown", function (event) {
  if (event.key === "Enter" && check(regExItemPrice, $("#updateItemQty"))) {
    focusText($("#updateItemPrice"));
  }
});

$("#updateItemPrice").on("keydown", function (event) {
  if (
    event.key === "Enter" &&
    check(regExItemQtyOnHand, $("#updateItemPrice"))
  ) {
    if (event.which === 13) {
      $("#btnUpdateItem").focus();
    }
  }
});

$("#btnDclearI").click(function () {
  clearDTextFields();
});

function setButtonStateIS(value) {
  if (value > 0) {
    $("#btnISave").attr("disabled", true);
  } else {
    $("#btnISave").attr("disabled", false);
  }
}

function clearTextFieldsI() {
  txtItemsId.value = "";
  txtItemName.value = "";
  txtItemQty.value = "";
  txtItemPrice.value = "";
  $("#txtItemsId").focus();
  checkValidity(itemsValidations);
}

async function loadAllItems() {
  $("#ItemTable").empty();
  items = await db.getAll(new Item());

  for (let item of items) {
    let row = `<tr><td>${item.code}</td><td>${item.desc}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
    $("#ItemTable").append(row);
  }
  tblClickEventsI();
  dblRowClickEventsItem();
  loadAllItemsForOption();
}

function updateItem(itemId) {
  let item = searchItem(itemId);
  if (item != null) {
    const code = item.code;
    const name = $("#updateItemName").val();
    const qty = $("#updateItemQty").val();
    const price = $("#updateItemPrice").val();
    const res = db.update(new Item(code, name, qty, price));
    loadAllItems();
    return res;
  } else {
    return false;
  }
}

function searchItem(itemID) {
  for (let item of items) {
    if (item.code === itemID) {
      return item;
    }
  }
  return null;
}

function setButtonStateIU(value) {
  if (value > 0) {
    $("#btnUpdateItem").attr("disabled", true);
  } else {
    $("#btnUpdateItem").attr("disabled", false);
  }
}

function clearUTextFields() {
  searchItemId.value = "";
  updateItemName.value = "";
  updateItemQty.value = "";
  updateItemPrice.value = "";
  checkValidity(itemsValidationsUpdate);
}

async function deleteItems(itemID) {
  const res = await db.delete(new Item(itemID));
  loadAllItems();
  clearDTextFields();
  return res;
}

function clearDTextFields() {
  searchDItemId.value = "";
  DItemName.value = "";
  DItemQty.value = "";
  DItemPrice.value = "";
}

function tblClickEventsI() {
  $("#ItemTable>tr").click(function () {
    let code = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let qty = $(this).children().eq(2).text();
    let price = $(this).children().eq(3).text();

    $("#searchItemId").val(code);
    $("#updateItemName").val(name);
    $("#updateItemQty").val(qty);
    $("#updateItemPrice").val(price);

    $("#searchDItemId").val(code);
    $("#DItemName").val(name);
    $("#DItemQty").val(qty);
    $("#DItemPrice").val(price);
  });
}

function dblRowClickEventsItem() {
  $("#ItemTable>tr").on("dblclick", function () {
    let deleteItemID = $(this).children().eq(0).text();
    yesNoAlertIDelete(deleteItemID);
  });
}

function generateItemID() {
  if (items.length > 0) {
    let lastId = items[items.length - 1].code;
    let digit = lastId.substring(6);
    let number = parseInt(digit) + 1;
    return lastId.replace(digit, number);
  } else {
    return "I00-001";
  }
}
