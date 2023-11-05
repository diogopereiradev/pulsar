import i18nConfig from "~~/i18n.config";


export default defineNuxtRouteMiddleware(async (to) => {
  const i18nconfig = await i18nConfig();
  type AvailableLocales = keyof typeof i18nconfig.messages;
  const availableLocales = Object.keys(i18nconfig.messages) as AvailableLocales[];

  const routePaths = to.fullPath.split('/');
  const locale = availableLocales.includes(routePaths[1] as AvailableLocales)? `/${routePaths[1]}` : '';
  const { status } = useAuth();

  if(to.path === `${locale}/auth`) {
    if(status.value === 'authenticated') {
      return navigateTo(`${locale}/documentations`);
    }
  } else if(status.value !== 'authenticated') {
    return navigateTo(`${locale}/auth`);
  }
  return;
});