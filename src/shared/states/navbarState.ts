import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";

type NavbarStateType = {
  donateMenu: {
    isOpen: boolean,
    isCopiedPix: boolean,
    isCopiedTimer: NodeJS.Timeout | undefined
  },
  profileMenuIsOpen: boolean,
  mobileMenuIsOpen: boolean,
  selectedLocale: LocaleObject | undefined
};

export const useNavbar = () => useState<NavbarStateType>('navbarState', () => ({
  donateMenu: {
    isOpen: false,
    isCopiedPix: false,
    isCopiedTimer: undefined
  },
  profileMenuIsOpen: false,
  mobileMenuIsOpen: false,
  selectedLocale: undefined
}));