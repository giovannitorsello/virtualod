<template>
<v-app>
  <v-system-bar>
      Open day - Liceo Vallone Galatina - Tour Virtuale
  </v-system-bar>
  <v-navigation-drawer app>
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Attività disponibili
          </v-list-item-title>
          <v-list-item-subtitle>
            seleziona l'attività
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-navigation-drawer>

  <v-app-bar app>
        <v-select
          :items="streamingEngine"
          label="Motore di streaming"
        ></v-select>

        <v-select
          :items="rooms"
          label="Scegli attività"
        ></v-select>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    Copyright - Giovanni Torsello - 2021
  </v-footer>
</v-app>

</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    streamingEngine: ['Facebook', 'Youtube', 'Switch TV'],
    rooms: ['Principale', 'Liceo Scientifico', 'Liceo Linguistico'],
    items: [
          { title: 'Online ora', icon: 'mdi-view-dashboard' },
          { title: 'Registrazioni', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' }]
  }),
};
</script>
