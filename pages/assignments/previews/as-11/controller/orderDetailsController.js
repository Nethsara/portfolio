import { DB } from "../db/DB.js";
import { Order } from "../models/order.js";

export class OrderClassDetails {
  constructor() {
    this.odb = new DB();
    $("#order_table_body").click(this.handleTbl.bind(this));

    this.loadOrderList();
  }

  async loadOrderList() {
    let orders = await this.odb.getAll(new Order());
    orders.forEach((order) => {
      $("#order_table_body").append(
        `<tr>
                    <td>${order._order_detail_list[0]._order_id}</td>
                    <td>${order._order_detail_list[0]._cus_id}</td>
                    <td>${order._total}</td>
                </tr>`
      );
    });
  }

  async handleTbl(e) {
    let orderId = $(e.target).closest("tr").find("td").eq(0).text();
    $("#selected_order_body").empty();
    let orders = await this.odb.getAll(new Order());
    let findOrder = orders.find(
      (order) => order._order_detail_list[0]._order_id === orderId
    );

    if (findOrder) {
      let orderDetailList = findOrder._order_detail_list;

      orderDetailList.forEach((order) => {
        $("#selected_order_body").append(
          `<tr>
                      <td>${order._item_id}</td>
                      <td>${order._quantity}</td>
                      <td>${order._price}</td>
                      <td>${order._total}</td>
                    </tr>`
        );
      });
    }
  }
}

new OrderClassDetails();
