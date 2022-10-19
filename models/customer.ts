import { db } from "../db";
import bcrypt from "bcrypt";
import { OkPacket, RowDataPacket } from "mysql2";
import { Customer, BasicCustomer } from "../types/customer";

export const findAllPlain = (callback: Function) => {
    const queryString = `SELECT * FROM Customer`;

    db.query(queryString,(err,res) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket []> res;
        const customers = [];

        rows.forEach(row => {
            const customer: Customer = {
                id: row.id,
                name: row.name,
                email: row.email
            };
            customers.push(customer);
        });
    })
};

export const findOnePlain = (customerId: number, callback: Function) => {
    const queryString = `SELECT * FROM Customer WHERE id = ?`;

    db.query(queryString,customerId,(err, res) => {
        if (err) {
            return callback(err);
        }

        const row = (<RowDataPacket>res)[0];
        const customer: Customer = {
            id: row.id,
            name: row.name,
            email: row.email
        };

        callback(null,customer);
    });
};

export const createPlain = (customer: Customer, callback: Function) => {
    const queryString = `INSERT INTO Customer (name,email,password) value (?,?,?)`;
    const passHash = bcrypt.hash(customer.password!, 10);
    db.query(
        queryString,
        [customer.name, customer.email, passHash],
        (err, res) => {
            if (err) {
                callback(err);
            }

            const insertId = (<OkPacket> res).insertId;
            callback(null,insertId);
        }
    )
};

export const updatePlain = (customer: Customer, callback: Function) => {
    const queryString = `
        UPDATE Customer
        SET name = ?, password = ?, email = ?
        WHERE id = ?
    `;
    const passHash = bcrypt.hash(customer.password!, 10);
    db.query(
        queryString,
        [customer.name, passHash, customer.email, customer.id],
        (err, res) => {
            if (err) {
                callback(err);
            }

            callback(null);
        }
    );
}