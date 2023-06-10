import { Customer } from "../models/customer.js";
import { Item } from "../models/item.js";

export class DB {
  constructor() {
    this.item = "ITEM";
    this.customer = "CUSTOMER";
    this.order = "ORDER";
  }

  async save(obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : this.order;
    const data = localStorage.getItem(key);
    const arr = JSON.parse(data) || [];
    arr.push(obj);
    localStorage.setItem(key, JSON.stringify(arr));
    return true;
  }

  async update(obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : this.order;
    const data = localStorage.getItem(key);
    const arr = JSON.parse(data) || [];
    const item = arr.find((i) => i.i_id === obj.i_id || i.c_id === obj.c_id);
    if (item) {
      Object.assign(item, obj);
      localStorage.setItem(key, JSON.stringify(arr));
      return item;
    }
  }

  async delete(obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : this.order;
    const data = localStorage.getItem(key);
    const arr = JSON.parse(data) || [];
    const index = arr.findIndex((v) => {
      console.log(v, obj.i_id);
      return obj instanceof Customer
        ? v._c_id === obj._c_id
        : v._i_id === obj.i_id;
    });
    if (index !== -1) {
      arr.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(arr));
      return true;
    }
    return false;
  }

  async getAll(obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : this.order;
    const data = localStorage.getItem(key);
    return JSON.parse(data) || [];
  }

  async getObj(id, obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : this.order;
    const data = localStorage.getItem(key);
    const arr = JSON.parse(data) || [];
    return arr.find((item) => item.i_id === id || item.c_id === id);
  }
}
