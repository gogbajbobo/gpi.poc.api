import db from './'

class Orders {

    static getOrders() {
        return db('orders').select()
    }

}

export default Orders