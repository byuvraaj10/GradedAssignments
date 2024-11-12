const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/ecommerce';
const client = new MongoClient(uri);

async function findCustomersWithoutOrders() {
    try {
        await client.connect();
        const db = client.db('ecommerce');
        const customers = db.collection('customers');
        const orders = db.collection('orders');

        const customersWithoutOrders = await customers.find({
            _id: { $nin: await orders.distinct('customer_id') }
        }).toArray();

        console.log(customersWithoutOrders);
    } finally {
        await client.close();
    }
}

async function calculateAverageItemsPerOrder() {
    try {
        await client.connect();
        const db = client.db('ecommerce');
        const orders = db.collection('orders');

        const ordersCount = await orders.countDocuments();
        const itemsCount = await orders.aggregate([
            { $unwind: "$items" },
            { $group: { _id: null, totalItems: { $sum: 1 } } }
        ]).toArray();

        const averageItems = itemsCount[0]?.totalItems / ordersCount;
        console.log('Average items per order:', averageItems);
    } finally {
        await client.close();
    }
}

async function joinCustomerAndOrderData() {
    try {
        await client.connect();
        const db = client.db('ecommerce');
        const customers = db.collection('customers');
        const orders = db.collection('orders');

        const customerOrderData = await customers.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'customer_id',
                    as: 'orders'
                }
            },
            { $project: { name: 1, email: 1, orders: 1 } }
        ]).toArray();

        console.log(customerOrderData);
    } finally {
        await client.close();
    }
}

module.exports = {
    findCustomersWithoutOrders,
    calculateAverageItemsPerOrder,
    joinCustomerAndOrderData
};
