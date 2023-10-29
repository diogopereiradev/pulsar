import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandsIcons from '@fortawesome/free-brands-svg-icons';

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
  SolidIcons.faBars,
  SolidIcons.faMap,
  SolidIcons.faBold,
  SolidIcons.faItalic,
  SolidIcons.faStrikethrough,
  SolidIcons.faLink,
  SolidIcons.faCode,
  SolidIcons.faTable,
  SolidIcons.faImage,
  SolidIcons.faMinus,
  SolidIcons.faList,
  SolidIcons.faListOl,
  SolidIcons.faHeading,
  SolidIcons.faLinesLeaning,
  SolidIcons.faDownload,
  SolidIcons.faUpload,
  SolidIcons.faCloudArrowUp,
  SolidIcons.faRotate,
  SolidIcons.faPalette,
  SolidIcons.faMicrochip,
  SolidIcons.faCode,
  SolidIcons.faWindowMaximize,
  BrandsIcons.faCss3,
  BrandsIcons.faSquareJs,
  BrandsIcons.faMarkdown,
  BrandsIcons.faPix
]);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});