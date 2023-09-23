import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faFilter,
  faClose,
  faEllipsis,
  faPenToSquare,
  faTrash,
  faFloppyDisk,
  faCircleNotch,
  faArrowLeftLong
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
library.add(...[
  faMagnifyingGlass,
  faPlus,
  faFilter,
  faClose,
  faEllipsis,
  faPenToSquare,
  faTrash,
  faFloppyDisk,
  faCircleNotch,
  faArrowLeftLong
]);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});