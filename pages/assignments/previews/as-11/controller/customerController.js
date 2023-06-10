import { Customer } from "../models/customer.js";
import { DB } from "../db/DB.js";

export class CustomerController {
  constructor() {
    this.$deleteBtn = $("#deleteBtn");
    this.$updateBtn = $("#updateBtn");
    this.$addBtn = $("#addBtn");
    this.$tableBody = $("#table_body");
    this.$clearBtn = $("#clearBtn");
    this.$custID = $("#custID");
    this.$fName = $("#fName");
    this.$lName = $("#lName");
    this.$address = $("#address");

    this.custIdPattern = /c\d/;
    this.namePattern = /^[a-zA-Z]+$/;
    this.addressPattern = /^[a-zA-Z0-9\s\.,#-]+$/;

    this.custDB = new DB();

    this.bindEventHandlers();
    this.loopData();
  }

  bindEventHandlers() {
    this.$deleteBtn.click(this.handleDeleteCustomer.bind(this));
    this.$updateBtn.click(this.handleUpdateCustomer.bind(this));
    this.$addBtn.click(this.handleSaveCustomer.bind(this));
    this.$tableBody.click(this.handleTblCustomer.bind(this));
    this.$clearBtn.click(this.clearCustomer.bind(this));
  }

  clearCustomer() {
    this.$custID.val("");
    this.$fName.val("");
    this.$lName.val("");
    this.$address.val("");

    this.$addBtn.prop("disabled", false);
  }

  validateInput() {
    const { $lName, $fName, $address } = this;

    const validateName = ($input, $errorElement) => {
      const name = $input.val().trim();
      if (!this.namePattern.test(name)) {
        $errorElement.text(`${$input.attr("name")} is required`);
        return false;
      }
      $errorElement.text("");
      return true;
    };

    if (
      !validateName($lName, $("#lNameError")) ||
      !validateName($fName, $("#fNameError"))
    ) {
      return false;
    }

    const address = $address.val().trim();
    if (!this.addressPattern.test(address) || !address) {
      $("#addressError").text("Input a valid address");
      return false;
    }

    $("#addressError").text("");
    return true;
  }

  handleDeleteCustomer(e) {
    e.preventDefault();

    const custID = this.$custID.val();

    if (confirm(`Are you sure you want to delete ${this.$custID.val()}?`)) {
      this.custDB.delete(new Customer(custID));
    }

    this.clearCustomer();
    this.loopData();
  }

  async handleSaveCustomer(e) {
    this.$custID.prop("disabled", false);
    e.preventDefault();

    const custID = this.$custID.val();
    const fName = this.$fName.val();
    const lName = this.$lName.val();
    const address = this.$address.val();

    let customers = await this.custDB.getAll(new Customer());
    if (customers.some((c) => c._c_id === custID)) {
      $("#duplicateError").text("Customer ID is duplicated.");
      return;
    }

    if (!this.custIdPattern.test(custID)) {
      $("#duplicateError").text("Use c001 format");
      return;
    }
    $("#duplicateError").text("");

    if (!this.validateInput()) {
      return;
    }

    this.custDB.save(new Customer(custID, fName, lName, address))
      ? alert("Customer saved Successfully")
      : alert("Error when saving");

    this.loopData();
    this.clearCustomer();
  }

  handleUpdateCustomer(e) {
    e.preventDefault();

    const custID = this.$custID.val();
    const fName = this.$fName.val();
    const lName = this.$lName.val();
    const address = this.$address.val();

    if (!this.validateInput()) {
      return;
    }

    this.custDB.update(new Customer(custID, fName, lName, address))
      ? alert("Customer updated Successfully")
      : alert("Error when updating");

    this.loopData();
    this.clearCustomer();
  }

  handleTblCustomer(e) {
    this.$custID.val($(e.target).closest("tr").find("td").eq(0).text());
    this.$fName.val($(e.target).closest("tr").find("td").eq(1).text());
    this.$lName.val($(e.target).closest("tr").find("td").eq(2).text());
    this.$address.val($(e.target).closest("tr").find("td").eq(3).text());

    this.$custID.prop("disabled", true);
    this.$addBtn.prop("disabled", true);
  }

  async loopData() {
    const customers = await this.custDB.getAll(new Customer());
    this.$tableBody.empty();

    customers.forEach((customer) => {
      this.$tableBody.append(`
        <tr>
          <td>${customer._c_id}</td>
          <td>${customer._fname}</td>
          <td>${customer._lname}</td>
          <td>${customer._address}</td>
        </tr>
      `);
    });
  }
}

new CustomerController();
