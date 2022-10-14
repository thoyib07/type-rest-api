import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const createPlain = (order: BasicOrder, callback: Function) => {
    const queryString = "INSERT INTO ProductOrder (product_id, customer_id, product_quantity) value (?,?,?)";

    db.query(
        queryString,
        [order.product.id,order.customer.id,order.productQuantity],
        (err, res) => {
            if (err) {
                callback(err)
            }

            const insertId = (<OkPacket> res).insertId;
            callback(null,insertId);
        });
};

export const findOnePlain = (orderId: number, callback: Function) => {
    const queryString = `
        SELECT
            o.*,
            p.*,
            c.name as customer_name,
            c.email
        FROM ProductOrder as o
        INNER JOIN Product as p on o.product_id = p.id
        INNER JOIN Customer as c on o.customer_id = c.id
        WHERE o.order_id = ?
    `;

    db.query(
        queryString,
        orderId,
        (err, res) => {
            if (err) {callback(err)}

            const row = (<RowDataPacket> res)[0];
            const order: OrderWithDetails = {
                orderId: row.order_id,
                customer: {
                    id: row.customer_id,
                    name: row.customer_name,
                    email: row.email
                },
                product: {
                    id: row.product_id,
                    description: row.description,
                    name: row.name,
                    instockQuantity: row.instock_quantity,
                    price: row.price
                },
                productQuantity: row.product_quantity
            }
            callback(null,order);
        });
};

export const findAllPlain = (callback: Function) => {
    const queryString = `
        SELECT
            o.*,
            p.*,
            c.name as customer_name,
            c.email
        FROM ProductOrder as o
        INNER JOIN Product as p on o.product_id = p.id
        INNER JOIN Customer as c on o.customer_id = c.id
    `;

    db.query(queryString, (err, res) => {
        if(err) {callback(err)}

        const rows = <RowDataPacket[]> res;
        const orders: Order[] = [];

        rows.forEach(row => {
            const order: OrderWithDetails = {
                orderId: row.order_id,
                customer: {
                    id: row.customer_id,
                    name: row.customer_name,
                    email: row.email
                },
                product: {
                    id: row.product_id,
                    name: row.name,
                    description: row.description,
                    instockQuantity: row.instock_quantity,
                    price: row.price
                },
                productQuantity: row.product_quantity
            }
            orders.push(order);
        });

        callback(null,orders);
    });
};

export const updatePlain = (order: Order, callback: Function) => {
    const queryString = `
        UPDATE ProductOrder 
        SET product_id=?, customer_id=?, product_quantity=? 
        WHERE order_id=?`;
    
    db.query(
        queryString,
        [order.product.id, order.customer.id, order.productQuantity],
        (err, res) => {
            if(err){callback(err)}

            callback(null);
        }
    );
};