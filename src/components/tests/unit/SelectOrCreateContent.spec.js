import { shallowMount } from '@vue/test-utils';
import SelectOrCreateContent from '@/components/SelectOrCreateContent.vue';

let wrapper;
let stubs = [
    'v-text-field'
]

beforeEach(() => {
    wrapper = shallowMount(SelectOrCreateContent, { stubs });
})

// initial
describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })

    test('props: label', () => {
        expect(wrapper.vm.label).toBeUndefined();
    })

    test('props: value', () => {
        expect(wrapper.vm.value).toBeUndefined();
    })

    test('props: dense', () => {
        expect(wrapper.vm.dense).toBeFalsy();
    })

    test('data: innerValue', () => {
        expect(wrapper.vm.innerValue).toEqual(wrapper.vm.value);
    })
})

// watch
describe('watch', () => {
    test('value', async () => {
        await wrapper.setProps({ value: 'testString' });
        expect(wrapper.vm.innerValue).toEqual(wrapper.vm.value);
    })

    test('innerValue', async () => {
        wrapper.vm.innerValue = "testString2";
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toEqual(wrapper.vm.innerValue);
    })
})

