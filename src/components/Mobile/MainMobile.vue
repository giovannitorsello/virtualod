<template>
<div class=".d-inline">
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Liceo Vallone - Open Day App </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="item in leftMenu" :key="item.id" @click="menuActionClick(item.action)" link>{{ item.title }}</v-btn>      
    </v-toolbar-items>
  </v-toolbar>
  
<v-app light>  

  <!--v-app-bar app>
      Virtual Open Day - Liceo Vallone Galatina - Prossimo evento 17/01/2020
  </--v-app-bar-->

  <!-- Sizes your content based upon application components -->
  <v-main>    
    <Live v-if="selectedCategory=='live'"> </Live> 
    <Registered v-if="selectedCategory=='registered'"></Registered> 
    <About v-if="selectedCategory=='about'"></About> 
  </v-main>

  <v-footer app>
    <p><small><small>Copyright - Giovanni Torsello - 2021  -- Chat engine powered by Tiledesk</small></small></p>
  </v-footer>
</v-app>



<v-dialog  v-model="dialog" width="400">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Suggerimenti per l'utilizzo
        </v-card-title>

        <v-card-text>
          Benvenuti all'Open Day del Liceo Vallone. Questa semplice applicazione consente la visualizzazione dei contenuti
          in diretta e di contenuti preregistrati che illustrano le attività della scuola.
          <br>
          E' presente un sistema di messaggistica (chat) interna, totalmente sicura e privata con cui puoi 
          porre delle domande al nostro staff. Inserisci il tuo nome e la tua email. 
          <br>
          <b>
          Se lo vuoi puoi lasciare il numero di smartphone all'interno di un messaggio nel caso in cui desideri essere ricontattato in forma privata. 
          </b>
          <br>
          Siamo a tua disposizione per ogni richiesta di chiarimento e di supporto.
          <br>
          Nella sezione <b>Info Su</b> potrai trovare la documentazione ufficiale.
          <br>
          La chat è contrassegnata dall'icona
          <v-img width="25" height="25" src="tiledesk_chat_icon.png"></v-img>
          <br>
          Scegli la tematica che ti interessa.
          <br>
          Grazie per la partecipazione e buona visione.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="!disableButtonInitDialog">
          <v-btn color="primary" @click="dialog = false">
            Accetta e continua
          </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>


</div>
</template>

<script>
const path = require('path');
import Live from './Live'
import Registered from './Registered'
import About from './About'
export default {
  
  name: 'MainMobile',
  
  components: {
    Live,
    Registered,
    About
  },

  data: () => ({
    dialog: true,
    disableButtonInitDialog: true,
    selectedCategory: 'live',
    chatIcon: path.join(__dirname, 'public', 'tiledek_chat_icon.png'),
    leftMenu: [
          { id: "1", title: 'Online ora', icon: 'mdi-view-dashboard', action: "live" },
          { id: "2", title: 'Registrazioni', icon: 'mdi-image', action: "registered"},
          { id: "3", title: 'Info su', icon: 'mdi-help-box', action: "about" }]
  }),
  mounted: function () {
     setTimeout(() => {this.disableButtonInitDialog = false; console.log("Button activate");}, 5000);
  },
  methods: {
    
  }
};
</script>
