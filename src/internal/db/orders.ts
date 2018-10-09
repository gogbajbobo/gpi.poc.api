import db from './'

const ordersTable = 'orders';

class Orders {

    static getOrders() {
        return db(ordersTable).select()
    }

    static addOrder(user_id: number, ordername: string) {
        return db(ordersTable).insert({ user_id, ordername })
    }

    static updateOrder(id: number, ordername: string, approved:boolean, user_id: number ) {
        return db(ordersTable).update({ ordername, approved }).where({ id, user_id })
    }

    static deleteOrder(id: number) {
        return db(ordersTable).delete().where({ id })
    }

}

export default Orders