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
            'botId': '18445742-4842-4d49-9925-3e49acdd17c2',
            'hostUrl': 'https://cdn.botpress.cloud/webchat/v0',
            'messagingUrl': 'https://messaging.botpress.cloud',
            'clientId': '18445742-4842-4d49-9925-3e49acdd17c2',
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