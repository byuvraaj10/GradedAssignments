// Customers who placed orders in the last month
const lastMonth = new Date();
lastMonth.setDate(lastMonth.getDate() - 30);

db.orders.aggregate([
    { $match: { order_date: { $gte: lastMonth } } },
    { $lookup: { from: "customers", localField: "customer_id", foreignField: "_id", as: "customer_info" } },
    { $unwind: "$customer_info" },
    { $group: { _id: "$customer_id", name: { $first: "$customer_info.name" }, email: { $first: "$customer_info.email" }, mostRecentOrderDate: { $max: "$order_date" } } }
]);

// Products ordered by John Doe
const johnId = db.customers.findOne({ name: "John Doe" })._id;
db.orders.aggregate([
    { $match: { customer_id: johnId } },
    { $unwind: "$items" },
    { $group: { _id: "$items.product_name", totalQuantity: { $sum: "$items.quantity" } } }
]);

// Top 3 customers with the highest total orders
db.orders.aggregate([
    { $group: { _id: "$customer_id", totalSpent: { $sum: "$total_value" } } },
    { $sort: { totalSpent: -1 } },
    { $limit: 3 },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer_info" } },
    { $unwind: "$customer_info" },
    { $project: { "customer_info.name": 1, totalSpent: 1 } }
]);

// Add a new order for Jane Smith
const janeId = db.customers.findOne({ name: "Jane Smith" })._id;
db.orders.insertOne({
    order_id: "ORD123789",
    customer_id: janeId,
    order_date: new Date(),
    status: "processing",
    items: [{ product_name: "Smartphone", quantity: 1, price: 800 }, { product_name: "Headphones", quantity: 1, price: 150 }],
    total_value: 950
});
