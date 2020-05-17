import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';

interface TicketAttrs {
    title: string;
    price: number;
}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

// statics is used to add a new method to a Model
ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

// methods is used to add a new method to a Model
// run query to look at all the orders. find an order where the ticket 
// is the ticket we just found and the order status is not cancelled
// if we find such an order, that means the ticket is reserved
ticketSchema.methods.isReserved = async function () {
    // this -> the ticket doc that called isReserved()
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });
    return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket }