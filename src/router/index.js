import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import ItemListView from '../views/NonCheckoutViews/ItemListView.vue';
import CartView from '../views/NonCheckoutViews/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import NonCheckoutView from '../views/NonCheckoutView.vue';
import CheckoutAuthenticate from '../views/CheckoutViews/CheckoutAuthenticate.vue';
import CheckoutAddress from '../views/CheckoutViews/CheckoutAddress.vue';
import CheckoutBankaccount from '../views/CheckoutViews/CheckoutBankaccount.vue';
import CheckoutShipping
  from '../views/CheckoutViews/CheckoutShipping.vue';
import CheckoutSummary from '../views/CheckoutViews/CheckoutSummary.vue';
import CheckoutComplete from '../views/CheckoutViews/CheckoutComplete.vue';
import CheckoutPayment from '../views/CheckoutViews/CheckoutPayment.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NonCheckoutView',
    component: NonCheckoutView,
    children: [
      {
        path: '/',
        name: 'ItemListView',
        component: ItemListView
      },
      {
        path: "/cart",
        name: "CartView",
        component: CartView
      },
    ]
  },

  {
    path: "/checkout",
    name: "CheckoutView",
    component: CheckoutView,
    children: [
      {
        path: "authenticate",
        name: "CheckoutAuthenticate",
        component: CheckoutAuthenticate
      },
      {
        path: "address",
        name: "CheckoutAddress",
        component: CheckoutAddress
      },
      {
        path: "bankaccount",
        name: "CheckoutBankaccount",
        component: CheckoutBankaccount
      },
      {
        path: "shipping",
        name: "CheckoutShipping",
        component: CheckoutShipping
      },
      {
        path: "payment",
        name: "CheckoutPayment",
        component: CheckoutPayment
      },
      {
        path: "summary",
        name: "CheckoutSummary",
        component: CheckoutSummary
      },
      {
        path: "complete",
        name: "CheckoutComplete",
        component: CheckoutComplete
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!from.name && to.path.startsWith('/checkout')) return next("/");

  if (store.state.noncheckout.cart.length > 0 &&
    !store.state.checkout.leaving &&
    !from.path.startsWith('/checkout/complete') &&
    from.path.startsWith('/checkout') &&
    !to.path.startsWith('/checkout')) {
    store.state.checkout.leaving = true;
    return next(false);
  }
  if (to.path === '/checkout') return next('/checkout/authenticate');

  // checkout state guard
  if (to.path === '/checkout/address' && !store.state.checkout.checkoutStates.authentication) return next(false);
  if (to.path === '/checkout/bankaccount' && !store.state.checkout.checkoutStates.deliveryAddress) return next(false);
  if (to.path === '/checkout/shipping' && !store.state.checkout.checkoutStates.bankaccount) return next(false);
  if (to.path === '/checkout/summary' && !store.state.checkout.checkoutStates.shipping) return next(false);

  next();
})

export default router
