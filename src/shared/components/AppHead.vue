<script setup lang="ts">
  const { localeProperties } = useI18n();
  
  useHead({
    htmlAttrs: {
      lang: localeProperties.value.iso
    }
  });
</script>

<template>
  <Head>
    <Link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <Link rel="manifest" href="/favicons/site.webmanifest" />
    <Link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#1d2024" />
    <Link rel="shortcut icon" href="/favicons/favicon.ico" />
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <Link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
    <Meta name="msapplication-TileColor" content="#1d2024" />
    <Meta name="msapplication-config" content="/favicons/browserconfig.xml" />
    <Meta name="theme-color" content="#1d2024" />
    <Meta name='author' content='Diogo Pereira'/>
    <Meta name='description' :content='$t("metadata.description")'/>
    <Meta name='robots' content='index,follow' />
    <Meta name='og:title' :content='$t("metadata.title")' />
    <Meta name='og:description' :content='$t("metadata.description")' />
    <Meta name='twitter:title' :content='$t("metadata.title")' />
    <Meta name='twitter:description' :content='$t("metadata.description")' />
    <Meta name='twitter:card' content='summary' />
  </Head>
</template>