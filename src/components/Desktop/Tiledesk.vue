<template>
<div id="chat"></div>
</template>

<script>
  export default {
    name: 'Tiledesk',
    domElementTiledesk: null,
    props: ['departmentId'],
    components: {      
    },
    data: () => ({
    }),
    mounted: function () {
      console.log("Department for chat is:");
      console.log(this.departmentId);
      
      // Create a script element
      let script = document.createElement('script');
      // Set attributes
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('language', 'javascript');
      // Create inline script
      var jsCode=`
            window.tiledeskSettings =  
            {
              projectid: "5feb0b39f5195b001993c25d",
              departmentID: "`+this.departmentId+`"
            };
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "https://widget.tiledesk.com/v4/launch.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'tiledesk-jssdk'));
      `;  
      let inlineScript = document.createTextNode(jsCode);
      script.appendChild(inlineScript);
      var chat_div=document.getElementById('chat');
      this.domElementTiledesk=chat_div.insertAdjacentElement('afterend', script);
      console.log("Logout from tiledesk");
      window.tiledeskSettings.departmentID=this.departmentId;
      console.log("Open from tiledesk");
      window.tiledesk.reInit();
  }
  }
</script>
