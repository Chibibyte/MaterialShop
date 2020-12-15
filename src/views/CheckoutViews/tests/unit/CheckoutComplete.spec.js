
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutComplete from '@/views/CheckoutViews/CheckoutComplete.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let wrapper;

beforeEach(() => {
    wrapper = shallowMount(CheckoutComplete, { localVue });
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



