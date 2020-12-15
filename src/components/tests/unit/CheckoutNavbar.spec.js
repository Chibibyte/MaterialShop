
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutNavbar from '@/components/CheckoutNavbar.vue';
import constants from '@/constants.js';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let store;
let state;
let modules;
let stubs = [
    'v-container',
    'v-app-bar'
]
let wrapper;
let checkoutStates;

beforeEach(() => {
    checkoutStates = {
        authentication: false,
        deliveryAddress: false,
        bankaccount: false,
        shipping: false,
        payment: false,
        summary: false
    }
    state = {}
    modules = {
        checkout: {
            namespaced: true,
            state() { return { checkoutStates } }
        }
    }
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(CheckoutNavbar, { localVue, stubs, store });
})

// initial
describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })

    test('checkoutStates', () => {
        let navbuttons = wrapper.findAllComponents({ name: 'NavButton' });
        expect(navbuttons.wrappers).toHaveLength(6);
    })

    test('checkoutStates', () => {
        let navbuttons = wrapper.findAllComponents({ name: 'NavButton' });
        expect(navbuttons.wrappers[0].vm.name).toBe('Cancel');
        expect(navbuttons.wrappers[1].vm.name).toBe('Delivery address');
        expect(navbuttons.wrappers[2].vm.name).toBe('Bank Account');
        expect(navbuttons.wrappers[3].vm.name).toBe('Shipping');
        expect(navbuttons.wrappers[4].vm.name).toBe('Payment');
        expect(navbuttons.wrappers[5].vm.name).toBe('Summary');
    })
});