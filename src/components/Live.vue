<template>
<div>
  <v-row>
      <v-col width="10%"></v-col>
      <v-col>
        <v-select
          :items="streamingEngines"
          label="Motore di streaming"
        ></v-select>
        </v-col>
        <v-col width="10%"></v-col>
    </v-row>
    <!-- Provides the application the proper gutter -->
     <v-row>
       <v-col width="10%"></v-col>
       <v-col>
          <youtube :video-id="videoId" player-width="1080" player-height="720"></youtube>      
        </v-col>
        <v-col width="10%"></v-col>
     </v-row>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'

  export default {
    name: 'Streaming',
    components: {      
    },
    data: () => ({
      videoId: 'HP7Snb9tH4U',
      streamingEngines: ['Youtube', 'Facebook', 'Twitch', 'Periscope'],      
      urlGoogleSheetLive: "https://spreadsheets.google.com/feeds/list/1iX2I2-YwU0fgxxiatlyKFrQtJBZ5MHCM4SC_kIUkSSI/1/public/values?alt=json"
    }),
    mounted: function () {
      Vue.use(VueYouTubeEmbed)
      // if you don't want install the component globally
      Vue.use(VueYouTubeEmbed, { global: false })      

      //get infos from google
      axios
        .get(this.urlGoogleSheetLive)
        .then(response => (
            this.parseLiveContents(response.data.feed.entry)
        ))
    },
    methods: {
      parseLiveContents(entries) {   
        console.log(entries);
      }
    }
  }
</script>
