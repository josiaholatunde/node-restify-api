const Customer = require('../models/Customer');
const errors = require('restify-errors');

module.exports = server => {
    server.get('/api/customers', async (req, res, next) => {
        try {
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (error) {
            return next(new errors.InvalidContentError(error));
        }
    });

    server.get('/api/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id ${req.params.id}`));
        }
    });

    server.post('/api/customers', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError(`Expects 'application/json' Content type`));
        }
        const {name, email, balance } = req.body;
        const customer = new Customer({
            name,
            email,
            balance
        });
        try {
            const savedCustomer = await customer.save();
            res.send(savedCustomer);
            next();
        } catch (error) {
            return next(new errors.InvalidContentError(error.message));
        }
    });

    server.put('/api/customers/:id', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError(`Expects 'application/json' Content type`));
        }
        try {
            const savedCustomer = await Customer.findOneAndUpdate({_id: req.params.id}, req.body);
            res.send(200);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id ${req.params.id}`));
        }
    });

    server.del('/api/customers/:id', async (req, res, next) => {
      
        try {
            const savedCustomer = await Customer.findOneAndRemove({_id: req.params.id});
            res.send(204);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id ${req.params.id}`));
        }
    });
}