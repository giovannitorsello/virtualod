<template>
<div>
  

  <v-row>
      <v-col>
        <div class="category-select"> 
        <v-select
          :items="categories"
          label="Tematica"
          v-on:change="changeCategory"
        ></v-select>
        </div>
        </v-col>        
    </v-row>
    <v-row>
      <v-col>
        <div class="contents-card">
          <v-card  v-for="content in contents" v-bind:key="content.idvideo"
                  class="mx-auto my-12"
                  max-width="300"
                >
                  <v-img :src="content.linkImmagine" ></v-img>
                  <v-card-title>{{content.titolo}}</v-card-title>

                  <v-card-text>                    
                    <div class="my-4 subtitle-1">
                      {{content.tipologia}}
                    </div>
                    <div>{{content.descrizione}}</div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions>
                    <v-btn
                      color="deep-purple lighten-2"
                      text
                      @click="openLive"
                    >
                      Apri la live
                    </v-btn>
                  </v-card-actions>
          </v-card>
        </div>
      </v-col>
        <!--youtube :video-id="videoId" :player-width="calcWidth" :player-height="calcHeigth"></!--youtube-->      
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
      calcWidth: 720,
      calcHeigth: 480,
      streamingEngines: ['Youtube', 'Facebook', 'Twitch', 'Periscope'],      
      googleData: [],
      categories: [],
      contents: [],
      category: "",
      content: "",
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
            this.parseContents(response.data.feed.entry)
        ))
    },
    methods: {
      parseContents(entries) {   
        entries.forEach(element => {          
          console.log(element);
          this.googleData.push({            
            descrizione: element.gsx$descrizione.$t,
            tipologia: element.gsx$tipologia.$t, 
            titolo: element.gsx$titolo.$t,
            responsabile: element.gsx$responsabile.$t,            
            oraInizio: element.gsx$orainizio.$t,
            oraFine: element.gsx$orafine.$t,
            linkImmagine: element.gsx$linkimmagine.$t,
            idVideo: element.gsx$idvideo.$t,
          });

/*
          this.contents.push({            
            descrizione: element.gsx$titolo.$t,
            tipologia: element.gsx$tipologia.$t, 
            titolo: element.gsx$titolo.$t,
            responsabile: element.gsx$responsabile.$t,            
            oraInizio: element.gsx$orainizio.$t,
            oraFine: element.gsx$orafine.$t,
            linkImmagine: element.gsx$linkimmagine.$t,
            idVideo: element.gsx$idvideo.$t,
          });
*/
          //construisce scelta delle categorie
          if(this.categories.indexOf(element.gsx$tipologia.$t)===-1){            
            this.categories.push(element.gsx$tipologia.$t);
          }
        });
      },
      changeContent(content){
        console.log("Category has changed");
        console.log(content);
        this.videoId=content.idvideo;
      },
      changeCategory(category) {
        console.log("Category has changed");
        console.log(category);
        this.contents=[];
        this.googleData.forEach(element => {
          if(category===element.tipologia) {
            this.contents.push({
              tipologia: element.tipologia,
              titolo: element.titolo,
              descrizione: element.descrizione,
              responsabile: element.responsabile,            
              oraInizio: element.oraInizio,
              oraFine: element.oraFine,
              idVideo: element.idVideo,
              linkImmagine: element.linkImmagine
            })
          }
        })
      },
      openLive(object) {
        console.log(object);

      }
    }
  }
</script>

<style>
.contents-card {
    display: flex;
    align-items: center;
    justify-content: center;    
}

.category-select {
    display: flex;
    align-items: center;
    justify-content: center;   
}
</style>