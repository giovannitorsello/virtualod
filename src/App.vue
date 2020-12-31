<template>
<v-app>  
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
          v-for="item in leftMenu"
          :key="item.id"
          @click="menuActionClick(item.action)"
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
      Virtual Open Day - Liceo Vallone Galatina - Prossimo evento 17/01/2020
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <Tiledesk></Tiledesk>
    <Live v-if="selectedCategory=='live'"> </Live> 
    <Registered v-if="selectedCategory=='registered'"></Registered> 
    <About v-if="selectedCategory=='about'"></About> 
  </v-main>

  <v-footer app>
    <p><small>Copyright - Giovanni Torsello - Mirko Leo - Andrea Tricco - 2021</small></p>
  </v-footer>
</v-app>

</template>

<script>
import Tiledesk from './components/Tiledesk'
import Live from './components/Live'
import Registered from './components/Registered'
import About from './components/About'
export default {
  
  name: 'App',
  
  components: {
    Tiledesk,
    Live,
    Registered,
    About
  },

  data: () => ({
    selectedCategory: 'registered',
    leftMenu: [
          { id: "1", title: 'Online ora', icon: 'mdi-view-dashboard', action: "live" },
          { id: "2", title: 'Registrazioni', icon: 'mdi-image', action: "registered"},
          { id: "3", title: 'Info su', icon: 'mdi-help-box', action: "about" }]
  }),
  mounted: function () {
      
  },
  methods: {
    menuActionClick(action) {
        this.selectedCategory=action;
    }
  }
};
</script>
