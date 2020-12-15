import { shallowMount } from '@vue/test-utils';
import Address from '@/components/Address.vue';

let stubs = [
]

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(Address, { stubs });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})