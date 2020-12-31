
<template>
<div>
  <v-row>
      <v-col width="10%"></v-col>
      <v-col>
        <v-select
          :items="sections"
          label="Scelta sezione"
        ></v-select>
        </v-col>
      
      <v-col>
        <v-select
          :items="contents"
          label="Scelta contenuto"
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
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'

  export default {
    name: 'Registered',
    components: {      
    },
    data: () => ({
      videoId: 'HP7Snb9tH4U',
      sections: ['Generale', 'Offerta formativa', 'Laboratori', 'Studenti'],
      contents: ['Contenuto 1', 'Contenuto 2', 'Contenuto 3'],
    }),
    mounted: function () {
      Vue.use(VueYouTubeEmbed)
      // if you don't want install the component globally
      Vue.use(VueYouTubeEmbed, { global: false })
  }
  }
</script>
