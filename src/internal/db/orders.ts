import db from './'

const ordersTable = 'orders';

class Orders {

    static getOrders() {
        return db(ordersTable).select()
    }

    static addOrder(ordername: string) {
        return db(ordersTable).insert({ ordername })
    }

}

export default Orders