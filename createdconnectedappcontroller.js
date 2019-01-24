<apex:page sidebar="false" showHeader="false">
    <html>
      <head>
        <title>reCAPTCHA demo: Explicit render after an onload callback</title>
        <script type="text/javascript">
          var verifyCallback = function(response) {
              parent.postMessage("Unlock", "https://reddyraja-dev-ed.lightning.force.com");
          };
          var onloadCallback = function() {
              grecaptcha.render('html_element', {
                  'sitekey' : '6Lc-EYwUAAAAALPPwY8UuUk-r3SyQGZqxQCSGKNG',
                  'callback' : verifyCallback,
              });
          };
        </script>
      </head>
      <body>
        <form action="?" method="POST">
          <div id="html_element"></div>
            <br/>
            <input type="submit" value="Submit" style="display:none"/>
        </form>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async="" defer="">
        </script>
      </body>
    </html>
</apex:page>
