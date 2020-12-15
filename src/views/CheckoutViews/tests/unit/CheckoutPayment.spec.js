
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutPayment from '@/views/CheckoutViews/CheckoutPayment.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let store;
let state;
let modules;
let stubs = [
    'v-container',
    'v-row',
    'v-col'
]
let wrapper;

beforeEach(() => {
    state = {}
    modules = {
        noncheckout: {
            namespaced: true,
            state() {
                return {
                }
            }
        },
        checkout: {
            namespaced: true,
            state() {
                return {
                    checkoutStates: {
                        authentication: false,
                        deliveryAddress: false,
                        bankaccount: false,
                        shipping: false,
                        payment: false,
                        summary: false,
                    }
                }
            }
        }
    }
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(CheckoutPayment, { stubs, store, localVue });
})

// initial
describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
});



