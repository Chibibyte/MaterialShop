
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CartView from '@/views/NonCheckoutViews/CartView.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let state;
let modules;
let stubs = [
    'v-container',
    'v-row',
    'v-col',
    'v-card',
    'v-card-title',
    'v-card-actions'
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
                    ]
                }
            },
            getters: {
                amount: jest.fn(),
                price: jest.fn(),
                items: jest.fn((id) => { return { title: 'a', price: 2.99, id, amount: 3 } })
            }
        }
    }
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(CartView, { stubs, store, localVue });
})

// initial
describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });
    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});

// computed
describe('computed', () => {
    test('items', () => {
        expect(modules.noncheckout.getters.amount.mock.calls).toHaveLength(1);
    })

    test('cart', () => {
        expect(wrapper.vm.cart).toEqual(wrapper.vm.$store.state.noncheckout.cart);
    })
})