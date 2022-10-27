import express, { Request, Response } from "express";
import * as customerModel from "../models/customer";
import { Customer } from "../types/customer";
const customerRouter = express.Router();

customerRouter.get('/',async (req: Request, res: Response) => {
    customerModel.findAllPlain((err: Error, customer: Customer[]) => {
        if (err) {
            return res.status(500).json({"errorMessage": err.message});
        }
        // console.log('callback : '+customer);
        res.status(200).json({"data": customer});
    });
});

customerRouter.post('/',async (req: Request, res: Response) => {
    const newCustomer: Customer = req.body;
    customerModel.createPlain(newCustomer, (err: Error, customerId: number) => {
        if (err) {
            return res.status(500).json({"errorMessage": err.message});
        }
        res.status(200).json({"customerId": customerId});
    });
})

customerRouter.get('/:id',async (req: Request, res: Response) => {
    const customerId: number = Number(req.params.id);
    customerModel.findOnePlain(customerId,(err: Error, customer: Customer) => {
        if (err) {
            return res.status(500).json({"errorMessage":err.message});
        }
        // console.log('callback : '+customer);
        res.status(200).json({"data":customer});
    });
});

customerRouter.put('/:id',async (req: Request, res: Response) => {
    const customer: Customer = req.body;
    customerModel.updatePlain(customer,async (err: Error) => {
        if (err) {
            return res.status(500).json({"errorMessage":err.message});
        }

        res.status(200).json({"message":"Data berhasil diubah."});
    });
});

export {customerRouter};