import React from 'react'

const BotpressChatFutbol = () => {
  return (
    <iframe
      srcDoc="<body><script src='https://cdn.botpress.cloud/webchat/v0/inject.js'></script>
      <script>
        window.botpressWebChat.init({
            'composerPlaceholder': 'Escríbele algo...',
            'botConversationDescription': 'Hazme las preguntas que quieras sobre la documentación que cargaste',
            'botName': 'Innovación',
            'avatarUrl': 'https://e7.pngegg.com/pngimages/811/700/png-clipart-chatbot-internet-bot-business-natural-language-processing-facebook-messenger-business-people-logo-thumbnail.png',
            'locale': 'es',
            'botId': 'b72d1a22-13b9-4949-93e4-2ec4974ea8fc',
            'hostUrl': 'https://cdn.botpress.cloud/webchat/v0',
            'messagingUrl': 'https://messaging.botpress.cloud',
            'clientId': 'b72d1a22-13b9-4949-93e4-2ec4974ea8fc',
            'enableConversationDeletion': true,
            'showPoweredBy': true,
            'className': 'webchatIframe',
            'containerWidth': '100%25',
            'layoutWidth': '100%25',
            'hideWidget': true,
            'showCloseButton': false,
            'disableAnimations': true,
            'closeOnEscape': false,
            'showConversationsButton': false,
            'enableTranscriptDownload': false,
            'stylesheet':'https://webchat-styler-css.botpress.app/prod/code/daef0f82-5651-4e76-92b7-0ccd437cc539/v794/style.css'
            
        });
      window.botpressWebChat.onEvent(function () { window.botpressWebChat.sendEvent({ type: 'show' }) }, ['LIFECYCLE.LOADED']);
      </script></body>"
      width="100%"
      height="100%"
    ></iframe>
  )
}

export default BotpressChatFutbol