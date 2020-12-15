# Material Shop
## Material Design Icon Shop with Vue

The Material Shop is a tiny single page webshop application made with Vue. The main focus was to create a simple checkout form that uses the Vuex store which is therefore separated in a checkout and a non-checkout module.
Before the checkout the user can select multiple material icons in various quantities and also check and update the added items in the shopping cart. In the checkout the user can add, update, delete and finally select delivery addresses and bankaccounts. Additionally a shipping service and a payment service have to be selected. The user can jump between the various selections anytime and update them or cancel the checkout process. The summary is unlocked after everything else has been selected. In this page the user has to verify that everything is correct and confirm the order.

### Settings

You can change the material icons used for the buttons and checkout parts in *src/constants.js*. 

### Build
Simply run...
```
npm run build
```
...in the console and ...
```
npm run start 
```
...to start the server or...
```
npm run serve
```
...for development.

### License
QuickChat is licenced under the [MIT license](https://choosealicense.com/licenses/mit/).

### Sources
The material design icons are from https://materialdesignicons.com.