import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ItemListViewItem from '@/components/ItemListViewItem.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let stubs = [
    'v-card',
    'v-row',
    'v-col',
    'v-container',
    'v-icon',
    'v-card-title',
    'v-card-subtitle',
    'v-select',
    'v-btn'
]

let wrapper;
let modules;
let store;
let state;
let defItem = {
    title: 'test title',
    price: '2',
    id: 0
};
beforeEach(() => {
    state = {};
    modules = {
        noncheckout: {
            namespaced: true,
            mutations: {
                addItem: jest.fn(),
                deleteItem: jest.fn()
            }
        }
    }
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(ItemListViewItem, { stubs, store, localVue });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('method: addItem', () => {
    test('default', () => {
        wrapper.vm.addItem(defItem)
        expect(modules.noncheckout.mutations.addItem.mock.calls).toHaveLength(1);
        expect(modules.noncheckout.mutations.addItem.mock.calls[0][1]).toEqual(defItem);
    })

    test('no item', () => {
        wrapper.vm.addItem();
        expect(modules.noncheckout.mutations.addItem.mock.calls).toHaveLength(1);
        expect(modules.noncheckout.mutations.addItem.mock.calls[0][1]).toEqual(undefined);
    })
})

describe('method: deleteItem', () => {
    test('default', () => {
        wrapper.vm.deleteItem(3)
        expect(modules.noncheckout.mutations.deleteItem.mock.calls).toHaveLength(1);
        expect(modules.noncheckout.mutations.deleteItem.mock.calls[0][1]).toEqual(3);
    })

    test('no item', () => {
        wrapper.vm.deleteItem();
        expect(modules.noncheckout.mutations.deleteItem.mock.calls).toHaveLength(1);
        expect(modules.noncheckout.mutations.deleteItem.mock.calls[0][1]).toEqual(undefined);
    })
})

describe('v-select', () => {
    test('emit 3', async () => {
        wrapper.vm.amount = 3;
        await wrapper.vm.$nextTick();
        expect(wrapper.element).toMatchSnapshot();
    })
})