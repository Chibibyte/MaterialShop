
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ItemListView from '@/views/NonCheckoutViews/ItemListView.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

let materialNames = [
    'alpha',
    'amount',
    'anna',
    'anno',
    'bread',
    'tennis',
    'toast'
]

let store;
let state;
let modules;
let stubs = [
    'v-container',
    'v-row',
    'v-col',
    'v-card',
    'v-card-title',
    'v-card-actions',
    'v-text-field',
    'v-pagination',
    'v-select'
]
let wrapper;

beforeEach(() => {
    state = {
        data() {
            return {
                maxItems: 0,
                searchValue: '',
                items: []
            }
        }
    }
    modules = {
        noncheckout: {
            namespaced: true,
            state() {
                return {
                    materialNames
                }
            },
            getters: {
                items: jest.fn((state) => {
                    let retVal = state.materialNames.map((name, index) => {
                        return { title: name, price: 2.99, id: index };
                    })
                    return retVal;
                })
            }
        }
    }
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(ItemListView, { stubs, store, localVue });
})

// initial
describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    });
});

// methods
describe('methods', () => {
    function onChangePageTest(pageCount, searchValue, sortValue, maxItems, exp1, exp2) {
        test('onChangePage', async () => {
            wrapper.vm.items = [];
            modules.noncheckout.getters.items.mockClear();
            wrapper.vm.maxItems = maxItems;
            wrapper.vm.searchValue = searchValue;
            wrapper.vm.sortValue = sortValue;
            wrapper.vm.onChangePage(pageCount);
            expect(modules.noncheckout.getters.items.mock.calls).toHaveLength(exp1);
            expect(wrapper.vm.items).toHaveLength(exp2);
        })
    }

    // maxItems 10
    onChangePageTest(1, '', 'Name ascending', 10, 0, 7);
    onChangePageTest(1, '', 'Name descending', 10, 0, 7);
    onChangePageTest(1, 'an', 'Name ascending', 10, 0, 2);
    onChangePageTest(1, 'an', 'Name descending', 10, 0, 2);
    onChangePageTest(0, '', 'Name ascending', 10, 0, 0);
    onChangePageTest(0, '', 'Name descending', 10, 0, 0);


    // maxItems 1
    onChangePageTest(1, '', 'Name ascending', 1, 0, 1);
    onChangePageTest(1, '', 'Name descending', 1, 0, 1);
    onChangePageTest(1, 'an', 'Name ascending', 1, 0, 1);
    onChangePageTest(1, 'an', 'Name descending', 1, 0, 1);
    onChangePageTest(0, '', 'Name ascending', 1, 0, 0);
    onChangePageTest(0, '', 'Name descending', 1, 0, 0);

    // maxItems 3
    onChangePageTest(1, '', 'Name ascending', 3, 0, 3);
    onChangePageTest(1, '', 'Name descending', 3, 0, 3);
    onChangePageTest(1, 'an', 'Name ascending', 3, 0, 2);
    onChangePageTest(1, 'an', 'Name descending', 3, 0, 2);
    onChangePageTest(0, '', 'Name ascending', 3, 0, 0);
    onChangePageTest(0, '', 'Name descending', 3, 0, 0);

})

// watch
describe('watch', () => {
    function onChangePageTriggerTest(handlerName, value) {
        test(handlerName, async () => {
            wrapper.vm.onChangePage = jest.fn();
            await wrapper.vm.onChangePage.mockClear();
            await wrapper.setData({ [handlerName]: value })
            expect(wrapper.vm.onChangePage.mock.calls).toHaveLength(1);
            expect(wrapper.element).toMatchSnapshot();
        });
    }

    onChangePageTriggerTest('maxItems', 1);
    onChangePageTriggerTest('sortValue', 1);
    onChangePageTriggerTest('searchValue', 1);

    onChangePageTriggerTest('maxItems', 5);
    onChangePageTriggerTest('sortValue', 5);
    onChangePageTriggerTest('searchValue', 5);
})