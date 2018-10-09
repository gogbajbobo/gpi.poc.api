import db from './'

class Orders {

    static getOrders() {
        return db('orders').select()
    }

    static addOrder(ordername: string) {
        return db('orders').insert({ ordername })
    }

}

export default Orders