// Test import of a JavaScript module
import { initReactApp } from '@/js/react-example';
import { initVueApp } from '@/js/vue-example';
import { Drawer } from '@/blocks/drawer';
// Test import of styles
import '@/styles/index.scss';

// import libs
import 'swiper/scss';
import { Modal } from './blocks/modal/modal';

// Appending to the DOM
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

document.addEventListener('DOMContentLoaded', () => {
  new Drawer();
  new Modal();
  initReactApp();
  new AirDatepicker('#my-element');
});
initVueApp();
// if (document.querySelector('header')) {
//   import(/* webpackChunkName: "header" */ '@/blocks/header/header').then((header) =>
//     header.default()
//   );
// }
