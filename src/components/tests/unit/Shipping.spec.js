import { shallowMount } from '@vue/test-utils';
import Shipping from '@/components/Shipping.vue';

let stubs = [
]

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(Shipping, { stubs });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})