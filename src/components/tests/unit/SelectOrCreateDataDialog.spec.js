import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SelectOrCreateDataDialog from '@/components/SelectOrCreateDataDialog.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let stubs = [
    'SelectOrCreateDataDialog',
    'v-container',
    'v-dialog',
    'v-btn'
]

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(SelectOrCreateDataDialog, { stubs, localVue });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('methods: closeDialog', () => {
    test('default', async () => {
        wrapper.vm.closeDialog();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('methods: cancel', () => {
    test('default: no cancelFunction', async () => {
        wrapper.vm.cancel();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toBe(false);
    })

    test('with cancelFunction', async () => {
        await wrapper.setProps({ cancelFunction: jest.fn() });
        wrapper.vm.cancel();
        await wrapper.vm.$nextTick();
        // event emitted
        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toBe(false);
        // cancelFunction called
        expect(wrapper.vm.cancelFunction).toBeTruthy();
        expect(wrapper.vm.cancelFunction.mock.calls).toHaveLength(1);
    })
})

describe('methods: confirm', () => {
    test('default: no confirmFunction', async () => {
        wrapper.vm.confirm();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toBe(false);
    })

    test('with confirmFunction', async () => {
        await wrapper.setProps({ confirmFunction: jest.fn() });
        wrapper.vm.confirm();
        await wrapper.vm.$nextTick();
        // event emitted
        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toBe(false);
        // confirmFunction called
        expect(wrapper.vm.confirmFunction).toBeTruthy();
        expect(wrapper.vm.confirmFunction.mock.calls).toHaveLength(1);
    })
})


