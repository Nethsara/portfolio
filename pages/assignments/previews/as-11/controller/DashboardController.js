$(document).ready(function () {
  loadAllOrders();
  loadAllOrderDetails();
  loadAllCustomers();
  loadAllItems();
  loadDashboard();
  $("#HomeSection").css("display", "block");
  $("#CustomerSection").css("display", "none");
  $("#ItemSection").css("display", "none");
  $("#OrderSection").css("display", "none");
  $("#OrderDetails").css("display", "none");
});

$("#homeBtn").click(function () {
  $("#HomeSection").css("display", "block");
  $("#CustomerSection").css("display", "none");
  $("#ItemSection").css("display", "none");
  $("#OrderSection").css("display", "none");
  $("#OrderDetails").css("display", "none");
});

$("#customerBtn").click(function () {
  $("#HomeSection").css("display", "none");
  $("#CustomerSection").css("display", "block");
  $("#ItemSection").css("display", "none");
  $("#OrderSection").css("display", "none");
  $("#OrderDetails").css("display", "none");

  $("#txtCustomerId").val(generateCustomerID());
});

$("#itemBtn").click(function () {
  $("#HomeSection").css("display", "none");
  $("#CustomerSection").css("display", "none");
  $("#ItemSection").css("display", "block");
  $("#OrderSection").css("display", "none");
  $("#OrderDetails").css("display", "none");

  $("#txtItemsId").val(generateItemID());
});

$("#orderBtn").click(function () {
  $("#HomeSection").css("display", "none");
  $("#CustomerSection").css("display", "none");
  $("#ItemSection").css("display", "none");
  $("#OrderSection").css("display", "block");
  $("#OrderDetails").css("display", "none");

  $("#orderId").val(generateOrderID());
  setCurrentDate();
});

$("#orderDetailsBtn").click(function () {
  $("#HomeSection").css("display", "none");
  $("#CustomerSection").css("display", "none");
  $("#ItemSection").css("display", "none");
  $("#OrderSection").css("display", "none");
  $("#OrderDetails").css("display", "block");

  loadAllOrders();
  loadAllOrderDetails();
});

async function loadDashboard() {
  const allOrders = await db.getAll(new Order());
  const allCustomers = await db.getAll(new Customer());
  const allItems = await db.getAll(new Item());
  let revenue = 0;
  allOrders.forEach((order) => {
    revenue += Number(order.subTotal);
  });
  console.log(allOrders);

  $("#totalOrders").text(allOrders.length);
  $("#totalCustomers").text(allCustomers.length);
  $("#totalItems").text(allItems.length);
  $("#totalRevenue").text(`LKR ${revenue}`);

  loadChart(allOrders.length, revenue);
}

async function loadChart(orderCount, revenue) {
  var ctx = document.getElementById("revenueChart").getContext("2d");
  var performanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jun"],
      datasets: [
        {
          label: "Sales",
          data: [revenue],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  var ctx = document.getElementById("performanceChart").getContext("2d");
  var performanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [orderCount],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
