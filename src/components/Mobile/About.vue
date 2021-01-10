<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="https://www.liceovallone.edu.it/wp-content/themes/LiceoVallone/images/object2127041249.png"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Benvenuto nel Liceo Scientifico e Linguistico "A. Vallone" di Galatina
        </h1>

        <p class="subheading font-weight-regular">
          Realizzato con la collaborazione dei docenti e degli alunni.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Link importanti
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Sostenuto e supportato da
        </h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'About',

    data: () => ({
      ecosystem: [
        {
          text: 'Tiledesk',
          href: 'https://www.tiledesk.com',
        },
        {
          text: 'Google',
          href: 'https://www.google.com',
        },
        {
          text: 'Liceo Vallone',
          href: 'https://www.liceovallone.edu.it',
        }
      ],
      importantLinks: [
        {
          text: 'Piano Offerta Formativa',
          href: 'https://www.liceovallone.edu.it/?page_id=1831',
        },
        {
          text: 'Relazioni con il pubblico',
          href: 'https://www.liceovallone.edu.it/?page_id=2854',
        }
      ],
    }),
  }
</script>
