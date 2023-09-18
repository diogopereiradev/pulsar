import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faFilter
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
library.add(...[
  faMagnifyingGlass,
  faPlus,
  faFilter
]);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});