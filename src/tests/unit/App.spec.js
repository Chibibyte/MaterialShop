
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let stubs = [
    'v-app',
    'router-view'
]
let wrapper;

beforeEach(() => {
    wrapper = shallowMount(App, { stubs, localVue });
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




