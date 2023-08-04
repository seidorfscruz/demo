import { Layout } from '@/components/layouts'
import '@/styles/chat.css'


const ChatPage = () => {




  return (
    <Layout title='Chat page'>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Chat</h2>
          </div>
        </div>
      </div>

      <div className="relative flex justify-end">
        <div
          className="center-div relative h-full w-full overflow-clip rounded-md border border-zinc-200 bg-white p-2 px-0 py-0"
        >
          <iframe
            srcDoc="<body><script src='https://cdn.botpress.cloud/webchat/v0/inject.js'></script>
            <script>
              window.botpressWebChat.init({
                  'composerPlaceholder': 'Escríbele a SmartBot...',
                  'botConversationDescription': 'Hazme las preguntas que quieras sobre la documentación que cargaste',
                  'botName': 'SmartBot',
                  'avatarUrl': 'https://e7.pngegg.com/pngimages/811/700/png-clipart-chatbot-internet-bot-business-natural-language-processing-facebook-messenger-business-people-logo-thumbnail.png',
                  'locale': 'es',
                  'botId': '81c2c462-0122-4e42-921a-2fd55c636d95',
                  'hostUrl': 'https://cdn.botpress.cloud/webchat/v0',
                  'messagingUrl': 'https://messaging.botpress.cloud',
                  'clientId': '81c2c462-0122-4e42-921a-2fd55c636d95',
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
                  'stylesheet':'https://webchat-styler-css.botpress.app/prod/code/3fcd3e4e-d5bc-4bf5-8699-14b621b3ada2/v31782/style.css'
                  
              });
            window.botpressWebChat.onEvent(function () { window.botpressWebChat.sendEvent({ type: 'show' }) }, ['LIFECYCLE.LOADED']);
            </script></body>"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </Layout>
  )
}

export default ChatPage