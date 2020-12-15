
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let store;
let state;
let modules;
let mutations;
let mocks;
let stubs = [
    'v-container',
    'v-app-bar',
    'v-icon',
    'v-btn',
    'v-dialog',
    'v-card',
    'v-card-title',
    'v-card-text',
    'v-card-actions',
    'v-spacer',
]
let wrapper;

beforeEach(() => {
    mutations = {}
    state = {}
    modules = {
        checkout: {
            namespaced: true,
            state() { },
            mutations: {
                setOrder: jest.fn()
            }
        },
        noncheckout: {
            namespaced: true,
            state() {
                return {
                    cart: []
                }
            },
            getters: {
                amount: jest.fn()
            }
        }
    }

    mocks = {
        $router: { push: jest.fn() }
    };
    store = new Vuex.Store({
        mutations,
        state,
        modules
    })
    wrapper = shallowMount(Navbar, { mocks, stubs, store, localVue });
})

// initial
describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })

    test('state.dialog: default', () => {
        expect(wrapper.vm.dialog).toBeFalsy();
    });
});

// computed
describe('computed: amount', () => {
    test('default', () => {
        expect(modules.noncheckout.getters.amount.mock.calls).toHaveLength(1);
    })
})

// method
describe('method: infoPopup', () => {
    test('default', () => {
        wrapper.vm.infoPopup();
        expect(wrapper.vm.dialog).toBeTruthy();
    })
})