// Total value of all orders by customer
db.orders.aggregate([
    { $group: { _id: "$customer_id", totalSpent: { $sum: "$total_value" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer_info" } },
    { $unwind: "$customer_info" },
    { $project: { "customer_info.name": 1, totalSpent: 1 } }
]);

// Group orders by status
db.orders.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);

// List customers with their most recent order
db.orders.aggregate([
    { $sort: { order_date: -1 } },
    { $group: { _id: "$customer_id", latestOrder: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer_info" } },
    { $unwind: "$customer_info" },
    { $project: { "customer_info.name": 1, "customer_info.email": 1, "latestOrder.order_id": 1, "latestOrder.total_value": 1 } }
]);

// Find the most expensive order by customer
db.orders.aggregate([
    { $sort: { total_value: -1 } },
    { $group: { _id: "$customer_id", mostExpensiveOrder: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer_info" } },
    { $unwind: "$customer_info" },
    { $project: { "customer_info.name": 1, "mostExpensiveOrder.order_id": 1, "mostExpensiveOrder.total_value": 1 } }
]);
