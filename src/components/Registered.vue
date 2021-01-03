
<template>
<div>
  <v-row>
      <v-col width="10%"></v-col>
      <v-col>
        <v-select
          :items="categories"
          label="Tipologia contenuto"
          v-on:change="changeCategory"
        ></v-select>
        </v-col>
      <v-col>
        <v-select
          v-model="selectContent"
          :hint="`${selectContent.descrizione}`"
          :items="contents"
          item-text="descrizione"
          item-value="urlvideo"
          label="Scelta contenuto"
          persistent-hint
          return-object
          single-line
          v-on:change="changeContent"      
        ></v-select>
        </v-col>
        <v-col width="10%"></v-col>
    </v-row>

    <v-row>
      <v-col width="10%"></v-col>
      <v-col>
        <youtube :video-id="videoId" :player-width="calcWidth" :player-height="calcHeigth"></youtube>      
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
    name: 'Registered',
    components: {      
    },
    data: () => ({
      calcWidth: 720,
      calcHeigth: 480,
      videoId: 'XmwzqpLuwGo',
      categories: [],
      contents: [],
      selectContent: {descrizione: "Auguri!", idvideo: "XmwzqpLuwGo"},
      googleData: [],
      urlGoogleSheetLive: "https://spreadsheets.google.com/feeds/list/15vGJ7vPv3RHxnYzUvoXOxYW4DpW7LvNqP5vlfJlTIcI/1/public/values?alt=json"
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
      parseContents(entries) {   
        var i=0;
        entries.forEach(element => {
          i=i+1;
          this.googleData.push({
            //id: i,
            descrizione: element.gsx$descrizione.$t,
            tipologia: element.gsx$tipologia.$t, 
            titolo: element.gsx$titolo.$t,
            durata: element.gsx$durata.$t,
            idvideo: element.gsx$idvideo.$t,
          });

          //construisce scelta delle categorie
          if(this.categories.indexOf(element.gsx$tipologia.$t)===-1){            
            this.categories.push(element.gsx$tipologia.$t);
          }
        });
      }
    }
  }
</script>
