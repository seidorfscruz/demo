import React from 'react'

const BotpressChatFutbol = ({ image, title }: { image: string, title: string }) => {
  return (
    <iframe
      srcDoc={`<body><script src='https://cdn.botpress.cloud/webchat/v0/inject.js'></script>
      <script>
        window.botpressWebChat.init({
            'composerPlaceholder': 'Escríbele algo...',
            'botConversationDescription': 'Hazme las preguntas que quieras sobre la documentación que cargaste',
            'botName': '${title}',
            'avatarUrl': '${image}',
            'locale': 'es',
            'botId': '1f5c8318-4066-434b-b87e-acf4b192345f',
            'hostUrl': 'https://cdn.botpress.cloud/webchat/v0',
            'messagingUrl': 'https://messaging.botpress.cloud',
            'clientId': '1f5c8318-4066-434b-b87e-acf4b192345f',
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
      </script></body>`}
      width="100%"
      height="100%"
    ></iframe>
  )
}

export default BotpressChatFutbol