import db from './'

const ordersTable = 'orders';

class Orders {

    static getOrders() {
        return db(ordersTable).select()
    }

    static addOrder(ordername: string) {
        return db(ordersTable).insert({ ordername })
    }

    static updateOrder(id: number, ordername: string, approved:boolean ) {
        return db(ordersTable).update({ ordername, approved }).where({ id })
    }

    static deleteOrder(id: number) {
        return db(ordersTable).delete().where({ id })
    }

}

export default Orders