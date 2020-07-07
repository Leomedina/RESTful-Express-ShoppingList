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
    }

    getAllItems() {
        if (this.items === undefined || this.items.length == 0) {
            return null;
        }
        return this.items;
    }

    removeItem(name) {
        this.items.forEach((item, index) => {
            if (this.item.name === name) {
                this.items.splice(index, 1);
                return true;
            };
        });
        return false;
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
}

const items = new Items();
items.addItem('Mango', 3.75)
items.addItem('Lango', 4.50)
items.addItem('fango', 50)

module.exports = items;