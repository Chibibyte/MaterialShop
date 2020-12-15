const state = {
    cart: [],
    materialNames: require("@/assets/materialNames.json")
}
const mutations = {
    clearCart(state) {
        state.cart.splice(0);
    },
    addItem(state, item) {
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id == item.id) {
                state.cart[i].amount += item.amount;
                return;
            }
        }
        state.cart.push(item);
    },
    deleteItem(state, itemId) {
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id == itemId) return state.cart.splice(i, 1);
        }
    },
    updateItem(state, item) {
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id == item.id) {
                state.cart[i].amount = item.amount;
                return;
            }
        }
    }
}
const getters = {
    items(state) {
        return state.materialNames.map((name, index) => {
            return { title: name, price: 2.99, id: index };
        });
    },
    amount(state) {
        let length = 0;
        state.cart.forEach(item => length += item.amount);
        return length;
    },
    price(state, getters) {
        let price = 0;
        state.cart.forEach(item => price += item.amount * getters.items[item.id].price);
        return Math.round(price * 100) / 100;
    }
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}