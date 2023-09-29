export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', (elem: HTMLInputElement) => {
    elem.focus();
  });
});