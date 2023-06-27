async function loadAllOrders() {
  $("#tblOrder").empty();

  orders = await db.getAll(new Order());
  for (let order of orders) {
    console.log(order);
    let row = `<tr><td>${order.oId}</td><td>${order.cId}</td><td>${order.oDate}</td><td>${order.subTotal}</td><td>${order.discount}</td></tr>`;
    $("#tblOrder").append(row);
  }
}

async function loadAllOrderDetails() {
  $("#tblOrderDetails").empty();

  const orderDetails = await db.getAll(new OrderDetail());
  console.log(orderDetails);
  for (let orderDetail of orderDetails) {
    console.log(orderDetail);

    let row = `<tr><td>${orderDetail.orderId}</td><td>${orderDetail.cusId}</td><td>${orderDetail.itemId}</td><td>${orderDetail.qty}</td><td>${orderDetail.total}</td></tr>`;
    $("#tblOrderDetails").append(row);
  }
}
