import { $ } from './utils/DOM.js';
import App from './notion/App.js';
import { ModalController } from './notion/ModalController.js';

const $target = $('#app');

new App({ $target });
ModalController();