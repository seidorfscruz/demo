import React from 'react'

const BotpressChatCuidar = ({ image, title }: { image: string, title: string }) => {
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
            'botId': 'c1fb4c0b-525c-475b-890d-8b9e5f18cc1d',
            'hostUrl': 'https://cdn.botpress.cloud/webchat/v0',
            'messagingUrl': 'https://messaging.botpress.cloud',
            'clientId': 'c1fb4c0b-525c-475b-890d-8b9e5f18cc1d',
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

export default BotpressChatCuidar