import { shallowMount } from '@vue/test-utils';
import Bankaccount from '@/components/Bankaccount.vue';

let stubs = [
]

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(Bankaccount, { stubs });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})