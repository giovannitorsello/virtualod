<template>
<div id="chat">
</div>
</template>

<script>
  export default {
    name: 'Tiledesk',
    components: {      
    },
    data: () => ({
           
    }),
    mounted: function () {
      // Create a script element
      let script = document.createElement('script');
      // Set attributes
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('language', 'javascript');
      // Create inline script
      let inlineScript = document.createTextNode(`
            window.tiledeskSettings =  
            {
              projectid: "5feb0b39f5195b001993c25d"
            };
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "https://widget.tiledesk.com/v4/launch.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'tiledesk-jssdk'));
      `);
    
      // Append to script
      script.appendChild(inlineScript);
    
      // Append script
      document.getElementById('chat').insertAdjacentElement('afterend', script);
  }
  }
</script>
