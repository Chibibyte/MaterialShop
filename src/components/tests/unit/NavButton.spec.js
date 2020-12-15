import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NavButton from '@/components/NavButton.vue';
import constants from '@/constants.js'
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.prototype.$constants = constants;
let router = new VueRouter();

let stubs = [
    'v-btn',
    'v-icon',
]

let wrapper;
let mocks;
beforeEach(() => {
    mocks = {
        // $router: { push: jest.fn() }
    };
    wrapper = shallowMount(NavButton, { stubs, mocks, localVue, router });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('props:runBefore', () => {
    test('runBefore:routerPush == false', async () => {
        await wrapper.setProps({ runBefore: jest.fn() });
        wrapper.vm.routerNav();
        expect(wrapper.vm.runBefore.mock.calls).toHaveLength(1);
        expect(wrapper.element).toMatchSnapshot();
    })

    test('runBefore:routerPush == true', async () => {
        await wrapper.setProps({ runBefore: jest.fn(), routerPush: true });
        wrapper.vm.routerNav();
        expect(wrapper.vm.runBefore.mock.calls).toHaveLength(1);
        expect(wrapper.element).toMatchSnapshot();
    })
})
