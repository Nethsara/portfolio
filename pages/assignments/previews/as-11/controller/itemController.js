import { Item } from "../models/item.js";
import { DB } from "../db/DB.js";

export class ItemController {
  constructor() {
    this.itemDB = new DB();
    $("#deleteBtn").click(this.handleDeleteItem.bind(this));
    $("#updateBtn").click(this.handleUpdateItem.bind(this));
    $("#addBtn").click(this.handleSaveItem.bind(this));
    $("#clearBtn").click(this.clearItem.bind(this));
    $("#table_body").click(this.handleTblItem.bind(this));

    this.namePattern = /^[a-zA-Z]+$/;
    this.qtyPattern = /^(?!0\d+)\d+[A-Za-z]+/;
    this.pricePattern = /^\d+(\.\d{1,2})?$/;
    this.itemIdPattern = /i\d/;

    this.loop_data();
  }

  clearItem() {
    $("#itemID").val("");
    $("#name").val("");
    $("#qty").val("");
    $("#price").val("");
    $("#addBtn").prop("disabled", false);
    $("#itemID").prop("disabled", false);
  }

  handleDeleteItem(e) {
    e.preventDefault();

    if (confirm(`Are you sure you want to delete ${$("#itemID").val()}?`)) {
      this.itemDB.delete(new Item($("#itemID").val()));
    }
    this.loop_data();
    this.clearItem();
  }

  async handleSaveItem(e) {
    e.preventDefault();

    const itemId = $("#itemID").val();
    const name = $("#name").val();
    const qty = $("#qty").val();
    const price = $("#price").val();

    let items = await this.itemDB.getAll(new Item());
    if (items.some((item) => item._i_id === itemId)) {
      $("#duplicateError").text("Item ID is duplicated.");
      return;
    }
    $("#duplicateError").text("");

    if (!this.itemIdPattern.test(itemId)) {
      $("#duplicateError").text("Use i001 format");
      return;
    }
    $("#duplicateError").text("");

    if (!this.namePattern.test(name)) {
      $("#nameError").text("This field is required");
      return;
    }
    $("#nameError").text("");

    if (qty === null || qty.trim() === "") {
      return;
    }

    if (!this.qtyPattern.test(qty)) {
      $("#qtyError").text("This field is required");
      return;
    }
    $("#qtyError").text("");

    if (!this.pricePattern.test(price)) {
      $("#priceError").text("");
      return;
    }
    $("#priceError").text("");

    this.itemDB.save(new Item(itemId, name, qty, price))
      ? alert("Item saved Successfully")
      : alert("Error when saving");
    this.loop_data();
    this.clearItem();
  }

  handleUpdateItem(e) {
    e.preventDefault();

    const name = $("#name").val();
    const qty = $("#qty").val();
    const price = $("#price").val();

    if (!this.namePattern.test(name)) {
      $("#nameError").text("This field is required");
      return;
    }
    $("#nameError").text("");

    if (qty === null || qty.trim() === "") {
      return;
    }

    if (!this.qtyPattern.test(qty)) {
      $("#qtyError").text("This field is required");
      return;
    }
    $("#qtyError").text("");

    if (!this.pricePattern.test(price)) {
      $("#priceError").text("");
      return;
    }
    $("#priceError").text("");

    this.itemDB.update(new Item($("#itemID").val(), name, qty, price))
      ? alert("Item updated Successfully")
      : alert("Error when updating");
    this.loop_data();
    this.clearItem();
  }

  handleTblItem(e) {
    $("#itemID").val($(e.target).closest("tr").find("td").eq(0).text());
    $("#name").val($(e.target).closest("tr").find("td").eq(1).text());
    $("#qty").val($(e.target).closest("tr").find("td").eq(2).text());
    $("#price").val($(e.target).closest("tr").find("td").eq(3).text());

    $("#itemID").prop("disabled", true);
    $("#addBtn").prop("disabled", true);
  }

  async loop_data() {
    let items = await this.itemDB.getAll(new Item());
    $("#table_body").empty();

    items.forEach((item) => {
      $("#table_body").append(`
        <tr>
          <td>${item._i_id}</td>
          <td>${item._i_name}</td>
          <td>${item._qty}</td>
          <td>${item._price}</td>
        </tr>
      `);
    });
  }
}

new ItemController();
