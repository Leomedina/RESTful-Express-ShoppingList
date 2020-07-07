const express = require('express');
const router = new express.Router();
const items = require('../utils/fakeDb');
const ExpressError = require('../utils/expressErrors');


/**GET /items: get all items */
router.get('/', (req, res, next) => {
    try {
        const allItems = items.getAllItems();
        if (!allItems) {
            throw new ExpressError('No Items in database', 204);
        } else {
            return res.status(200).json({
                'status': 200,
                'items': allItems,
            });
        }
    } catch (error) {
        return next(error);
    }
});

/**DELETE '/items/item request to remove a specific item */
router.delete('/:item', (req, res, next) => {
    const item = req.params.item;
    try {
        if (!items.removeItem(item)) {
            throw new ExpressError('Item not in shopping list', 204);
        } else {
            return res.status(200).json({
                'status': 200,
                'Message': `${item} successfully removed`
            })
        }
    } catch (error) {
        return next(error);
    }
});

/**GET /items/:item request to get a specific item */
router.get('/:item', (req, res, next) => {
    const item = req.params.item;
    try {
        const getItem = items.getItem(item);
        if (!getItem) {
            throw new ExpressError('Item not in shopping list', 204);
        } else {
            return res.status(200).json({
                'status': 200,
                'item': getItem,
            })
        }
    } catch (error) {
        return next(error);
    }
});

/**PATH /items/:item request to update a specific item */
router.patch('/:item', (req, res, next) => {
    const item = req.params.item;
    const newName = req.body.name;
    const newPrice = req.body.price || null;
    try {
        const convertedPrice = items.convertStringToNumber(newPrice);
        if (convertedPrice) {
            const newItem = items.updateItem(item, newName, convertedPrice);
            return res.status(200).json({
                'status': 200,
                'updated': newItem,
            })
        } else if (!newPrice) {
            const newItem = items.updateItem(item, newName);
            return res.status(200).json({
                'status': 200,
                'updated': newItem,
            })
        } else if (!convertedPrice) {
            throw new ExpressError(`Price ${newPrice} must be a number`, 400)
        }
    } catch (error) {
        return next(error);
    }
});

module.exports = router;