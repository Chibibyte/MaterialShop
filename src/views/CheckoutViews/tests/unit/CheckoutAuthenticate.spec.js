
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutAuthenticate from '@/views/CheckoutViews/CheckoutAuthenticate.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let store;
let state;
let modules;
let mocks;
let stubs = [
    'v-container',
    'v-form',
    'v-text-field',
    'v-btn',
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
            },
            mutations: {
                setCheckoutState: jest.fn()
            }
        }
    }
    mocks = {
        $router: { push: jest.fn() }
    };
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(CheckoutAuthenticate, { mocks, stubs, store, localVue });
    wrapper.vm.$refs.form.validate = jest.fn();
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

describe('validation', () => {
    test('validate', () => {
        wrapper.vm.validate();
        expect(wrapper.vm.$refs.form.validate.mock.calls).toHaveLength(1);
    })

    // email
    test('empty email', () => {
        expect(wrapper.vm.emailRules[0]('')).toBe('E-mail is required');
        expect(wrapper.vm.emailRules[1]('')).toBe('E-mail must be valid');
        expect(wrapper.vm.emailRules[2]('')).toBe('E-mail must be "ro@bo.cop"');
    })

    test('wrong email value', () => {
        expect(wrapper.vm.emailRules[0]('ro@bo.co')).toBe(true);
        expect(wrapper.vm.emailRules[1]('ro@bo.co')).toBe(true);
        expect(wrapper.vm.emailRules[2]('ro@bo.co')).toBe('E-mail must be "ro@bo.cop"');
    })

    test('wrong email format', () => {
        expect(wrapper.vm.emailRules[0]('ro.bo.co')).toBe(true);
        expect(wrapper.vm.emailRules[1]('ro.bo.co')).toBe('E-mail must be valid');
        expect(wrapper.vm.emailRules[2]('ro.bo.co')).toBe('E-mail must be "ro@bo.cop"');
    })

    // password
    test('empty password', () => {
        expect(wrapper.vm.passwordRules[0]('')).toBe('Password is required');
        expect(wrapper.vm.passwordRules[1]('')).toBe('Password must be 1234');
    })

    test('wrong password value', () => {
        expect(wrapper.vm.passwordRules[0]('ro@bo.co')).toBe(true);
        expect(wrapper.vm.passwordRules[1]('ro@bo.co')).toBe('Password must be 1234');
    })
})



