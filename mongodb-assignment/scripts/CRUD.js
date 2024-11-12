// Insert customers
db.customers.insertMany([
    { name: "John Doe", email: "johndoe@example.com", address: { street: "123 Main St", city: "Springfield", zipcode: "12345" }, phone: "555-1234", registration_date: new Date("2023-01-01T12:00:00Z") },
    { name: "Jane Smith", email: "janesmith@example.com", address: { street: "456 Park Ave", city: "Greenfield", zipcode: "67890" }, phone: "555-5678", registration_date: new Date("2023-02-15T10:00:00Z") },
    { name: "Alice Brown", email: "alicebrown@example.com", address: { street: "789 Elm St", city: "Lakeview", zipcode: "13579" }, phone: "555-9012", registration_date: new Date("2023-03-10T09:00:00Z") },
    { name: "Bob White", email: "bobwhite@example.com", address: { street: "321 Oak St", city: "Riverwood", zipcode: "24680" }, phone: "555-3456", registration_date: new Date("2023-04-20T11:30:00Z") },
    { name: "Charlie Green", email: "charliegreen@example.com", address: { street: "654 Maple St", city: "Hilltop", zipcode: "97531" }, phone: "555-7890", registration_date: new Date("2023-05-01T08:45:00Z") }
]);

// Insert orders
db.orders.insertMany([
    { order_id: "ORD123456", customer_id: db.customers.findOne({ name: "John Doe" })._id, order_date: new Date("2023-05-15T14:00:00Z"), status: "shipped", items: [{ product_name: "Laptop", quantity: 1, price: 1500 }, { product_name: "Mouse", quantity: 2, price: 25 }], total_value: 1550 },
    { order_id: "ORD234567", customer_id: db.customers.findOne({ name: "Jane Smith" })._id, order_date: new Date("2023-06-10T09:00:00Z"), status: "processing", items: [{ product_name: "Tablet", quantity: 1, price: 300 }, { product_name: "Charger", quantity: 1, price: 25 }], total_value: 325 },
    { order_id: "ORD345678", customer_id: db.customers.findOne({ name: "Alice Brown" })._id, order_date: new Date("2023-07-20T16:00:00Z"), status: "delivered", items: [{ product_name: "Phone", quantity: 1, price: 700 }, { product_name: "Screen Protector", quantity: 3, price: 10 }], total_value: 730 },
    { order_id: "ORD456789", customer_id: db.customers.findOne({ name: "Bob White" })._id, order_date: new Date("2023-08-05T12:00:00Z"), status: "shipped", items: [{ product_name: "Camera", quantity: 1, price: 600 }], total_value: 600 },
    { order_id: "ORD567890", customer_id: db.customers.findOne({ name: "Charlie Green" })._id, order_date: new Date("2023-09-15T18:30:00Z"), status: "processing", items: [{ product_name: "Headphones", quantity: 2, price: 100 }], total_value: 200 }
]);

// Find orders for John Doe
const johnId = db.customers.findOne({ name: "John Doe" })._id;
db.orders.find({ customer_id: johnId });

// Find customer info for a specific order
const order = db.orders.findOne({ order_id: "ORD123456" });
db.customers.findOne({ _id: order.customer_id });

// Update order status
db.orders.updateOne({ order_id: "ORD123456" }, { $set: { status: "delivered" } });

// Delete an order
db.orders.deleteOne({ order_id: "ORD123456" });
