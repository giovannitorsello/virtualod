
<template>
<div>
    <div v-if="!isStreaming">      
      <div v-for="section in sortedContents" v-bind:key="section.category">   
      <v-row>
        <v-col>
        <div class="titleSection">
          <p><strong>{{section.category}}</strong></p>
        </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="content in section.contents" :key="content.idVideo">
          <div class="contents-card">
            <v-card  
                    class="mx-auto my-12"
                    max-width="300"
                  >
                    <v-img :src="content.linkImgVideo" ></v-img>
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
                        @click="openVideo(content)"
                      >
                        Apri il contenuto
                      </v-btn>
                    </v-card-actions>
            </v-card>          
          </div>
        </v-col>
      </v-row>

      </div>
    </div>

    <div v-if="isStreaming">      
      <v-row>
        <v-col>
          <div class="contents-card">
              <youtube  :video-id="idVideo"></youtube>                                     
          </div>
        </v-col>      
      </v-row>
      <v-row>
        <v-col>
          <div class="contents-card" v-if="isStreaming">
            <v-btn class="ma-2" color="success" @click="exitVideo()">Esci</v-btn>
          </div>
        </v-col>
    </v-row>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'

  export default {
    name: 'Registered',
    components: {      
    },
    data: () => ({
      calcWidth: 720,
      calcHeigth: 480,
      idVideo: 'XmwzqpLuwGo',
      isStreaming: false,
      categories: [],
      contents: [],
      sortedContents: [],
      selectContent: {descrizione: "Auguri!", idvideo: "XmwzqpLuwGo"},
      googleData: [],
      urlGoogleSheetLive: "https://spreadsheets.google.com/feeds/list/15vGJ7vPv3RHxnYzUvoXOxYW4DpW7LvNqP5vlfJlTIcI/1/public/values?alt=json",
      nColsGridView: 3
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
              descrizione: element.descrizione,
              idvideo: element.idvideo
            })
          }
        })
      },
      buildSortedContents() {
        this.categories.forEach((cat,index, cats)=>{
          this.getContentsByCategory(cat);
          this.sortedContents.push({category: cat, contents: this.contents});
          if(index===cats.length-1) {console.log(this.sortedContents);}
        });      
      },
      getContentsByCategory(category) {      
        var contents=[];
        //console.log("Getting contents for: " + category);
        this.googleData.forEach((element, index, array) => {
          if(category===element.tipologia) {            
            contents.push({
              descrizione: element.descrizione,
              tipologia: element.tipologia,
              durata: element.durata,
              idvideo: element.idvideo,
              linkImgVideo: "https://img.youtube.com/vi/"+element.idvideo+"/default.jpg"
            })
          }
          if(index==array.length-1){            
              this.contents=contents;              
          }
        })
      },
      parseContents(entries) {        
        entries.forEach((element, index, array) => {          
          this.googleData.push({            
            descrizione: element.gsx$descrizione.$t,
            tipologia: element.gsx$tipologia.$t, 
            titolo: element.gsx$titolo.$t,
            durata: element.gsx$durata.$t,
            idvideo: element.gsx$idvideo.$t
          });

          //construisce scelta delle categorie
          if(this.categories.indexOf(element.gsx$tipologia.$t)===-1){            
            this.categories.push(element.gsx$tipologia.$t);
          }

          if(index===array.length-1) {
            console.log("Build sorted contents.");
            this.buildSortedContents();
          }
        });
      },
      openVideo(content) {
        console.log("Opening: "+content.idvideo);
        this.idVideo=content.idvideo;
        this.isStreaming="true";
      },
      exitVideo() {
        this.isStreaming=false;
      },
    }
  }
</script>

<style>
.titleSection {
  display: flex;
  align-items: center;
  justify-content: center;    
  font-size: 14;
}

.contents-card {
    display: flex;
    align-items: center;
    justify-content: center;    
}

.contents-video {
    display: flex;
    align-items: center;
    vertical-align: center;
    justify-content: center;    
}

</style>