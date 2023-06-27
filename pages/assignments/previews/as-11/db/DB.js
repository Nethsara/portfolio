class DB {
  constructor() {
    this.item = "ITEM";
    this.customer = "CUSTOMER";
    this.order = "ORDER";
    this.orderDetails = "ORDER_DETAILS";
  }

  async save(obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : obj instanceof Order
        ? this.order
        : this.orderDetails;
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
        : obj instanceof Order
        ? this.order
        : this.orderDetails;
    const data = localStorage.getItem(key);
    const arr = JSON.parse(data) || [];
    const index = arr.findIndex((v) => {
      return obj instanceof Customer ? v.id === obj.id : v.code === obj.code;
    });
    if (index !== -1) {
      arr[index] = obj;
      localStorage.setItem(key, JSON.stringify(arr));
      return index;
    }
  }

  async delete(obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : obj instanceof Order
        ? this.order
        : this.orderDetails;

    const data = localStorage.getItem(key);
    const arr = JSON.parse(data) || [];

    const index = arr.findIndex((v) => {
      return obj instanceof Customer ? v.id === obj.id : v.code === obj.code;
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
        : obj instanceof Order
        ? this.order
        : this.orderDetails;
    const data = localStorage.getItem(key);
    return JSON.parse(data) || [];
  }

  async getObj(id, obj) {
    const key =
      obj instanceof Customer
        ? this.customer
        : obj instanceof Item
        ? this.item
        : obj instanceof Order
        ? this.order
        : this.orderDetails;
    const data = localStorage.getItem(key);
    const arr = JSON.parse(data) || [];
    return arr.find((item) => item.code === id || item.id === id);
  }
}
