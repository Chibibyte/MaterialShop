import { shallowMount } from '@vue/test-utils';
import ContentBase from '@/components/ContentBase.vue';

let stubs = [
    'v-card',
    'v-container',
    'v-form'
]

let wrapper;
beforeEach(() => {
    wrapper = shallowMount(ContentBase, { stubs });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })

    test('props: contentMeta', () => {
        expect(wrapper.vm.contentMeta).toBeUndefined();
    })

    test('props: value', () => {
        expect(wrapper.vm.value).toEqual({});
    })

    test('props: disabled', () => {
        expect(wrapper.vm.disabled).toBeFalsy();
    })

    test('props: readonly', () => {
        expect(wrapper.vm.readonly).toBeFalsy();
    })

    test('props: dense', () => {
        expect(wrapper.vm.dense).toBeFalsy();
    })

    test('data: content', () => {
        expect(wrapper.vm.content).toEqual(wrapper.vm.value);
    })
})

// watch
describe('watch', () => {
    test('value', async () => {
        await wrapper.setProps({ value: { fieldA: 'contentA', fieldB: 'contentB' } });
        expect(wrapper.vm.content).toEqual(wrapper.vm.value);
    })

    test('content', async () => {
        wrapper.vm.content = { fieldA: 'contentA2', fieldB: 'contentB2' };
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().input[0][0]).toEqual(wrapper.vm.content);
    })
})