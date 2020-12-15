function createAddress(street, house, zipcode, city) {
    return {
        street,
        house,
        zipcode,
        city
    };
}
function createBankaccount(bank, accountNr) {
    return {
        bank,
        accountNr
    };
}
function createDeliveryServices(name, price) {
    return {
        name,
        price
    };
}
function createPaymentServices(name) {
    return {
        name,
    };
}
function containsSameContent(contentArr, content) {
    for (let i = 0; i < contentArr.length; i++) {
        if (sameObjectContent(contentArr[i], content)) return i;
    }
    return -1;
}
function sameObjectContent(addr1, addr2) {
    let isEqual = true;
    Object.keys(addr1).forEach(key => isEqual = isEqual && (addr1[key] === addr2[key]));
    return isEqual;
}

const state = {
    leaving: false,
    addresses: [
        createAddress("Havanna Drive", "73", "27406", "Redsboro"),
        createAddress("Hillhaven Road", "84", "92705", "Santa Spandau"),
        createAddress("Clousson Street", "12", "77063", "Nightmute")
    ],
    bankaccounts: [
        createBankaccount('Penny Bank', '1234'),
        createBankaccount('Dollar Bank', '5678'),
        createBankaccount('Piggy Bank', '1357'),
        createBankaccount('Warthog Bank', '2468')
    ],
    deliveryServices: [
        createDeliveryServices('SlothLogistics', '0.00'),
        createDeliveryServices('QuickDelivery', '2.99'),
        createDeliveryServices('SonicLogistics', '3.99'),
        createDeliveryServices('SpaceMail', '4.99')
    ],
    paymentServices: [
        createPaymentServices('PayDay'),
        createPaymentServices('BigTransferFeeService'),
        createPaymentServices('PocketMoney'),
        createPaymentServices('SendMoneyOnline')
    ],
    checkoutStates: {
        authentication: false,
        deliveryAddress: false,
        bankaccount: false,
        shipping: false,
        payment: false,
        summary: false,
    },
    order: null,
    deliveryAddress: null,
    bankaccount: null,
    shipping: null,
    payment: null
}
const mutations = {
    setOrder(state, order) {
        state.order = order;
    },
    setLeaving(state, value) {
        state.leaving = value;
    },

    clearCheckoutStates(state) {
        for (const chState in state.checkoutStates)
            state.checkoutStates[chState] = false;
    },
    clearCheckoutContent(state) {
        state.order = false;
        state.deliveryAddress = false;
        state.bankaccount = false;
        state.shipping = false;
        state.payment = false;
    },

    setCheckoutState(state, stateChange) {
        let { chState, value } = stateChange;
        state.checkoutStates[chState] = value;
    },

    selectContent(state, params) {
        let { content, contentName } = params;
        state[contentName] = { ...content };
    },


    // CRUD content
    addContent(state, params) {
        let { content, contentArrName } = params;
        if (sameObjectContent)
            state[contentArrName].push({ ...content });
    },

    removeContent(state, params) {
        let { content, contentArrName } = params;
        let i = containsSameContent(state[contentArrName], content);
        if (i >= 0) state[contentArrName].splice(i, 1);
    },

    updateContent(state, params) {
        let { content, contentArrName } = params;
        let oldData = content[0];
        let data = content[1];
        let i = containsSameContent(state[contentArrName], oldData);
        if (i >= 0) state[contentArrName].splice(i, 1, { ...data });
    }
}
const actions = {
}
const getters = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}