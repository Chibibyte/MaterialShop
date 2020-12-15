import { shallowMount } from '@vue/test-utils';
import SummaryCost from '@/components/SummaryCost.vue';

let stubs = [
]

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(SummaryCost, { stubs });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})