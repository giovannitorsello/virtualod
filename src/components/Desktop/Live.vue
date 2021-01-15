<template>
<div>
  <div v-if="isStreaming">
    <v-row>
      <v-col>
        <div class="contents-card" >
            <iframe :width="calcWidth" :height="calcHeigth" :src="urlLive" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <!--youtube  :video-id="videoId" :player-width="calcWidth" :player-height="calcHeigth" host="https://youtu.be/"></youtube-->
            <Tiledesk :departmentId="departmentId"></Tiledesk>                           
        </div>
        <div class="contents-card">
          <v-btn class="ma-2" color="success" @click="exitLive()">Esci</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
  
  <div v-if="!isStreaming">
    <v-row>
      <v-col>
          <v-carousel
              cycle
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              height="750"
              >
              <v-carousel-item
                v-for="content in contents"
                :key="content.idVideo"
              >
                  <div class="contents-card"  v-if="!isStreaming">
                  <v-card
                          class="mx-auto my-12"
                          max-width="500"
                        >
                          <v-img :src="content.linkImmagine" ></v-img>
                          <v-card-title>{{content.titolo}}</v-card-title>

                          <v-card-text>                    
                            <div class="my-4 subtitle-1">
                              {{content.tipologia}}
                            </div>
                            <div class="my-4 subtitle-1" v-if="!showOpenLiveButton">
                              Domenica 17 Gennaio 2021, ore {{content.oraInizio}}
                            </div>                           
                          </v-card-text>

                          <v-divider class="mx-4"></v-divider>
                          <div v-if="showOpenLiveButton">
                            <v-card-actions>
                              <v-btn
                                color="deep-purple lighten-2"
                                text
                                @click="openLive(content)"
                              >
                                Apri la live
                              </v-btn>
                            </v-card-actions>
                          </div>
                  </v-card>
                  </div>
              </v-carousel-item>
          </v-carousel>        
      </v-col>
    </v-row>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Tiledesk from './Tiledesk'
  export default {
    name: 'Streaming',
    components: {     
      Tiledesk 
    },
    data: () => ({
      showOpenLiveButton: false,
      continuous: "false",
      cycle: "cycle",
      urlLive: "",
      calcWidth: 1080,
      calcHeigth: 720,
      streamingEngines: ['Youtube', 'Facebook', 'Twitch', 'Periscope'],      
      googleData: [],
      categories: [],
      contents: [],
      category: "",
      content: "",
      departmentId: "",
      isStreaming: false,
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
      exitLive() {        
        this.isStreaming=false;
      },
      parseContents(entries) {   
        entries.forEach((element,index,array) => {          
          console.log(element.gsx$idvideo.$t);
          this.googleData.push({            
            descrizione: element.gsx$descrizione.$t,
            tipologia: element.gsx$tipologia.$t, 
            titolo: element.gsx$titolo.$t,
            responsabile: element.gsx$responsabile.$t,            
            oraInizio: element.gsx$orainizio.$t,
            oraFine: element.gsx$orafine.$t,
            linkImmagine: element.gsx$linkimmagine.$t,
            idVideo: element.gsx$idvideo.$t,
            chatDepartmentId: element.gsx$chatdepartmentid.$t,
          });

          this.contents.push({            
            descrizione: element.gsx$titolo.$t,
            tipologia: element.gsx$tipologia.$t, 
            titolo: element.gsx$titolo.$t,
            responsabile: element.gsx$responsabile.$t,            
            oraInizio: element.gsx$orainizio.$t,
            oraFine: element.gsx$orafine.$t,
            linkImmagine: element.gsx$linkimmagine.$t,
            chatDepartmentId: element.gsx$chatdepartmentid.$t,
            idVideo: element.gsx$idvideo.$t,
          });

          //construisce scelta delle categorie
          if(this.categories.indexOf(element.gsx$tipologia.$t)===-1){            
            this.categories.push(element.gsx$tipologia.$t);
          }

          if(index===array.length-1) {
            this.scrambleContents();
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
              linkImmagine: element.linkImmagine,
              chatDepartmentId: element.chatDepartmentId
            })
          }
        })
      },
      scrambleContents() {
        var nFixed=4;
        var nRandom=this.contents.length-nFixed;
        for (var i = nFixed; i < this.contents.length - 1; i++) {
            var j = nFixed+Math.floor(Math.random() * nRandom);            
            var temp = this.contents[i];
            this.contents[i] = this.contents[j];
            this.contents[j] = temp;
        }
      },
      openLive(content) {
        this.urlLive="https://www.youtube.com/embed/"+content.idVideo;
        this.departmentId=content.chatDepartmentId;
        this.isStreaming="true";
        console.log("Video ID is:");
        console.log(this.idVideo);
        console.log("Chat department is:");
        console.log(this.departmentId);
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