import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
library.add(...[
  SolidIcons.faMagnifyingGlass,
  SolidIcons.faPlus,
  SolidIcons.faFilter,
  SolidIcons.faClose,
  SolidIcons.faEllipsis,
  SolidIcons.faPenToSquare,
  SolidIcons.faTrash,
  SolidIcons.faFloppyDisk,
  SolidIcons.faCircleNotch,
  SolidIcons.faArrowLeftLong,
  SolidIcons.faEye,
  SolidIcons.faBars
]);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});