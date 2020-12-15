
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CheckoutBase from '@/views/CheckoutViews/CheckoutBase.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

let stubs = [
    'v-container',
    'v-row',
    'v-col',
    'v-icon'
]
let wrapper;

beforeEach(() => {
    wrapper = shallowMount(CheckoutBase, { stubs, localVue });
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

