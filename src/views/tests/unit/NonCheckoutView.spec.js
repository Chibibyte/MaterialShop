
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NonCheckoutView from '@/views/NonCheckoutView.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper;

beforeEach(() => {
    wrapper = shallowMount(NonCheckoutView, {
        stubs: [
            'v-main',
            'router-view'
        ],
        localVue
    })
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });
});

describe('NonCheckoutView.vue', () => {
    test('components existence', () => {
        expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})