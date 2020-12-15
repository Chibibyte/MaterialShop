import { shallowMount } from '@vue/test-utils';
import Payment from '@/components/Payment.vue';

let stubs = [
]

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(Payment, { stubs });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})