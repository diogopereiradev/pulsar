import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";

type NavbarStateType = {
  donateMenu: {
    isOpen: boolean,
    isCopiedPix: boolean,
    isCopiedTimer: NodeJS.Timeout | undefined
  },
  mobileMenuIsOpen: boolean,
  selectedLocale: LocaleObject | undefined
};

export const useNavbar = () => useState<NavbarStateType>('navbarState', () => ({
  donateMenu: {
    isOpen: false,
    isCopiedPix: false,
    isCopiedTimer: undefined
  },
  mobileMenuIsOpen: false,
  selectedLocale: undefined
}));