import { DB } from "../db/DB.js";
import { Item } from "../models/item.js";
import { Order } from "../models/order.js";

export class IndexController {
  constructor() {
    this.db = new DB();

    this.setDashboard();
  }

  async setDashboard() {
    const orders = await this.db.getAll(new Order());
    const items = await this.db.getAll(new Item());
    let total = 0;
    orders.forEach((element) => {
      total += parseInt(element._total);
    });

    console.log(orders.at(-1)._order_detail_list);
    document.getElementById("order_count").innerText = orders.length;
    document.getElementById("total_sales").innerText = `$${total}`;
    document.getElementById("total_items").innerText = items.length;
    document.getElementById("last_order").innerText = `Order ID : ${
      orders.at(-1)._order_detail_list[0]._order_id
    } - For Customer ${orders.at(-1)._order_detail_list[0]._cus_id}`;
  }
}

new IndexController();
