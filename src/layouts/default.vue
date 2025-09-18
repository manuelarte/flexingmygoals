<template>
  <v-main>
    <v-toolbar :elevation="8" title="Flexing My Goals">
      <template #prepend>
        <v-btn
          icon="mdi-arrow-left"
        />
      </template>
    </v-toolbar>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
  //
</script>
