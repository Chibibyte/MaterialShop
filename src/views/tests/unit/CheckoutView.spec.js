import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutView from '@/views/CheckoutView.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let state;
let modules;
let mutations;
let mocks;
let stubs = [
    'router-view',
    'v-main',
    'v-dialog',
    'v-card',
    'v-card-title',
    'v-card-text',
    'v-card-actions',
    'v-spacer',
    'v-btn'
]
let wrapper;

beforeEach(() => {
    mutations = {
    }

    state = {
    }

    modules = {
        checkout: {
            namespaced: true,
            state() {
                return {
                    leaving: false
                }
            },
            mutations: {
                setLeaving: jest.fn(),
                clearCheckoutContent: jest.fn(),
                clearCheckoutStates: jest.fn()
            }
        },
        noncheckout: {
            namespaced: true,
            state() {
                return {
                    cart: []
                }
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
    wrapper = shallowMount(CheckoutView, { mocks, stubs, store, localVue });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
});


describe('mounted: ', () => {
    test('CheckoutNavbar', () => {
        expect(wrapper.findComponent({ name: 'CheckoutNavbar' }).exists()).toBe(true)
    })

    test('function: leaving: initial call', () => {
        expect(wrapper.vm.leaving).toBeFalsy();
    })

    test('default', () => {
        expect(mocks.$router.push.mock.calls).toHaveLength(1);
    })
})

describe('getter: leaving', () => {
    test('default', () => {
        expect(wrapper.vm.leaving).toBeFalsy();
    })

    test('leaving in store is true', () => {
        state.checkout.leaving = true;
        expect(wrapper.vm.leaving).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('setter: leaving', () => {
    test('set leaving true', () => {
        wrapper.vm.leaving = true;
        expect(modules.checkout.mutations.setLeaving.mock.calls).toHaveLength(1);
        expect(modules.checkout.mutations.setLeaving.mock.calls[0][1]).toBeTruthy();
    })

    test('set leaving false', () => {
        wrapper.vm.leaving = false;
        expect(modules.checkout.mutations.setLeaving.mock.calls).toHaveLength(1);
        expect(modules.checkout.mutations.setLeaving.mock.calls[0][1]).toBeFalsy();
    })
})

describe('method: leave', () => {
    test('default', () => {
        mocks.$router.push.mockClear()
        wrapper.vm.leave();
        expect(modules.checkout.mutations.clearCheckoutContent.mock.calls).toHaveLength(1);
        expect(modules.checkout.mutations.clearCheckoutStates.mock.calls).toHaveLength(1);
        expect(mocks.$router.push.mock.calls).toHaveLength(1);
    })
})