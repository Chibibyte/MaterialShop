
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutSummary from '@/views/CheckoutViews/CheckoutSummary.vue';
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
                    cart: [
                        {
                            id: 3,
                            amount: 4
                        },
                        {
                            id: 4,
                            amount: 2
                        }
                    ],
                    materialNames: [
                        'alpha',
                        'amount',
                        'anna',
                        'anno',
                        'bread',
                        'tennis',
                        'toast'
                    ]
                }
            },
            mutations: {
                clearCart: jest.fn()
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
                    },
                    shipping: {
                        price: 2.99
                    },
                    order: []
                }
            },
            mutations: {
                clearCheckoutStates: jest.fn(),
                clearCheckoutContent: jest.fn()
            }
        }
    }
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(CheckoutSummary, { stubs, store, localVue });
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

describe('set output props', () => {
    test('all props set', async () => {
        await wrapper.setProps({
            icon: 'test icon', title: 'test title', subtitle: 'test subtitle',
            invisible: true, next_disabled: true, next_target: 'test next_target', next_icon: 'test next_icon', next_name: 'test next_name'
        })
        expect(wrapper.element).toMatchSnapshot();
    })

    test('all props except invisible', async () => {
        await wrapper.setProps({
            icon: 'test icon', title: 'test title', subtitle: 'test subtitle',
            next_disabled: true, next_target: 'test next_target', next_icon: 'test next_icon', next_name: 'test next_name'
        })
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('methods', () => {
    test('completeOrder', () => {
        wrapper.vm.completeOrder();
        expect(modules.checkout.mutations.clearCheckoutStates.mock.calls).toHaveLength(1);
        expect(modules.checkout.mutations.clearCheckoutContent.mock.calls).toHaveLength(1);
        expect(modules.noncheckout.mutations.clearCart.mock.calls).toHaveLength(1);
    })
})