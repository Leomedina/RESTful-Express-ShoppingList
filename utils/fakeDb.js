/**
 * 
 * Fake Database with utilities.
 */

class Items {
    constructor() {
        this.items = [];
    }

    addItem(name, price) {
        let newItem = {
            'name': name,
            'price': price,
        };
        this.items.push(newItem);
        return newItem;
    }

    getAllItems() {
        if (this.items === undefined || this.items.length == 0) {
            return null;
        }
        return this.items;
    }

    removeItem(name) {
        let response = false;
        this.items.forEach((item, index) => {
            if (item.name === name) {
                this.items.splice(index, 1);
                response = true;
            };
        });
        return response;
    };

    getItem(name) {
        let foundItem = null;
        this.items.forEach((item) => {
            if (item.name === name) {
                foundItem = item;
            };
        });
        return foundItem
    }

    convertStringToNumber(string) {
        let valToNum = Number(string);

        if (Number.isNaN(valToNum)) {
            return null;
        } else {
            return valToNum;
        }
    }

    updateItem(name, newName, newPrice) {
        let updatedItem = null;

        this.items.forEach(item => {
            if (item.name === name) {
                item.name = newName || item.name;
                item.price = newPrice || item.price;
                updatedItem = item;
            };
        });

        return updatedItem;
    }

    reset() {
        //mutates rather than redefine
        this.items.length = 0;
    }
}

const items = new Items();
const testItems = new Items()
items.addItem('Mango', 3.75)
items.addItem('Lango', 4.50)
items.addItem('fango', 50)
items.addItem('lagno', 40)

module.exports = items, testItems;