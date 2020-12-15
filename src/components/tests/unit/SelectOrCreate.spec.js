import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SelectOrCreate from '@/components/SelectOrCreate.vue';
import constants from '@/constants.js'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$constants = constants;

let stubs = [
    'v-container',
    'v-row',
    'v-col',
    'v-radio-group',
    'v-btn',
    'v-icon',
    'v-hover'
]

let wrapper;
let state;
let modules;
let store;
function createBankaccount(bank, accountNr) {
    return {
        bank,
        accountNr
    };
}
beforeEach(() => {
    state = {
    };
    modules = {
        checkout: {
            namespaced: true,
            state() {
                return {
                    bankaccounts: [
                        createBankaccount('Bank-A', '1234'),
                        createBankaccount('Bank-B', '5678'),
                        createBankaccount('Bank-C', '1357'),
                        createBankaccount('Bank-D', '2468')
                    ],
                    checkoutStates: {
                        authentication: false,
                        deliveryAddress: false,
                        bankaccount: false,
                        shipping: false,
                        payment: false,
                        summary: false,
                    },
                }
            },
            mutations: {
                addContent: jest.fn(),
                removeContent: jest.fn(),
                updateContent: jest.fn()
            }
        }
    }
    store = new Vuex.Store({
        state,
        modules
    })
    wrapper = shallowMount(SelectOrCreate, { stubs, localVue, store });
})

describe('Component', () => {
    test('is instantiated', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    })

    test('default snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('props:updateContent', () => {
    test('default:true:no data', () => {
        expect(wrapper.vm.updateContent).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    })

    test('false:no data', () => {
        wrapper.setProps({ updateContent: false });
        expect(wrapper.vm.updateContent).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
    })

    test('default:true:bankaccounts data', () => {
        wrapper = shallowMount(SelectOrCreate, { stubs, localVue, store, propsData: { contentArrName: 'bankaccounts' } });
        expect(wrapper.vm.updateContent).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    })

    test('false:bankaccounts data', () => {
        wrapper.setProps({ contentArrName: 'bankaccounts', updateContent: false });
        expect(wrapper.vm.updateContent).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
    })
})

describe('props:dataDialogText', () => {
    test('default:', () => {
        expect(wrapper.vm.dataDialogText.addText).toBe('add');
        expect(wrapper.vm.dataDialogText.removeText).toBe('remove');
        expect(wrapper.vm.dataDialogText.updateText).toBe('update');
    })

    test('testTexts', () => {
        wrapper.setProps({ dataDialogText: { addText: 'test add', removeText: 'test delete', updateText: 'test update' } })
        expect(wrapper.vm.dataDialogText.addText).toBe('test add');
        expect(wrapper.vm.dataDialogText.removeText).toBe('test delete');
        expect(wrapper.vm.dataDialogText.updateText).toBe('test update');
    })
})

describe('data:dataDialogData', () => {
    test('default:', () => {
        expect(wrapper.vm.dataDialogData).toBe("emptyDataFunctionMISSING");
    })

    test('{a:"testA", b:"testB"}:', async () => {
        wrapper.vm.dataDialogData = { a: "testA", b: "testB" };
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.dataDialogData).toEqual({ a: "testA", b: "testB" });
        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toEqual({ a: "testA", b: "testB" });
    })
})

describe('methods:crudData', () => {
    test('default: addContent', () => {
        wrapper.vm.crudData('add', { varA: 'valueA', varB: 'valueB' });
        expect(modules.checkout.mutations.addContent.mock.calls).toHaveLength(0);
    })

    function contentArrTest(crudType) {
        let methodType = crudType + 'Content';
        test(`contentArrName === "bankaccounts": ${methodType}`, () => {
            wrapper = shallowMount(SelectOrCreate, { stubs, localVue, store, propsData: { contentArrName: 'bankaccounts' } });
            wrapper.vm.crudData(crudType, { varA: 'valueA', varB: 'valueB' });
            expect(modules.checkout.mutations[methodType].mock.calls).toHaveLength(1);
            expect(modules.checkout.mutations[methodType].mock.calls[0][1]).toEqual({ content: { varA: 'valueA', varB: 'valueB' }, contentArrName: 'bankaccounts' });
        })
    }

    contentArrTest('add');
    contentArrTest('remove');
    contentArrTest('update');

})