import { Layout } from '@/components/layouts'
import { AvatarStatusBadge, AvatarStaticBadge } from '@/components/ui'
import { Icon } from '@iconify/react'
import chatStyles from '@/styles/chat.module.css'


const ChatPage = () => {

  return (
    <Layout title='Chat page'>
      <div className="grid grid-cols-5 h-100">
        <div className="col-span-1 border-r-2 p-2">
          <h1 className='scroll-m-20 text-3xl font-bold tracking-tight mb-4'>Team</h1>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1'>
            <div className="col-span-1">
              <Icon icon="flat-color-icons:online-support" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex justify-between items-center ps-1">
              <small className='text-sm font-semibold'>Customer support</small>
              <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">2</span>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1'>
            <div className="col-span-1">
              <Icon icon="logos:microsoft-teams" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex justify-between items-center ps-1">
              <small className='text-sm font-semibold'>Accounting</small>
              <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">5</span>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1'>
            <div className="col-span-1">
              <Icon icon="emojione:money-bag" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex flex-col justify-center ps-1">
              <small className='text-sm font-semibold'>Sales team</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1'>
            <div className="col-span-1">
              <Icon icon="fluent-emoji:rocket" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex flex-col justify-center ps-1">
              <small className='text-sm font-semibold'>Marketing</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1'>
            <div className="col-span-1">
              <Icon icon="logos:google-marketing-platform" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex flex-col justify-center ps-1">
              <small className='text-sm font-semibold'>Human Resources</small>
            </div>
          </div>

        </div>
        <div className="col-span-1 p-2">
          <h1 className='scroll-m-20 text-3xl font-bold tracking-tight mb-4'>Chatbots</h1>

          <div className='grid grid-cols-5 border p-2 rounded-sm my-1 hoverable'>
            <div className="col-span-1">
              <AvatarStatusBadge />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>Pablo Guzman</small>
              <small className='text-xs font-semibold text-gray-500'>This is a little description</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 border bg-blue-200 p-2 rounded-sm my-1'>
            <div className="col-span-1">
              <AvatarStatusBadge />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>Pablo Guzman</small>
              <small className='text-xs font-semibold text-gray-500'>This is a little description</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 border p-2 rounded-sm my-1 hoverable'>
            <div className="col-span-1">
              <AvatarStatusBadge />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>Pablo Guzman</small>
              <small className='text-xs font-semibold text-gray-500'>This is a little description</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 border p-2 rounded-sm my-1 hoverable'>
            <div className="col-span-1">
              <AvatarStatusBadge />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>Pablo Guzman</small>
              <small className='text-xs font-semibold text-gray-500'>This is a little description</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 border p-2 rounded-sm my-1 hoverable'>
            <div className="col-span-1">
              <AvatarStaticBadge />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>Pablo Guzman</small>
              <small className='text-xs font-semibold text-gray-500'>This is a little description</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 border p-2 rounded-sm my-1 hoverable'>
            <div className="col-span-1">
              <AvatarStaticBadge />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>Pablo Guzman</small>
              <small className='text-xs font-semibold text-gray-500'>This is a little description</small>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="relative flex justify-end">
            <div
              className={`${chatStyles.centerDiv} relative h-full w-full overflow-clip border border-zinc-200 bg-white p-2 px-0 py-0`}
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
                      'stylesheet':'https://webchat-styler-css.botpress.app/prod/code/daef0f82-5651-4e76-92b7-0ccd437cc539/v794/style.css'
                      
                  });
                window.botpressWebChat.onEvent(function () { window.botpressWebChat.sendEvent({ type: 'show' }) }, ['LIFECYCLE.LOADED']);
                </script></body>"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="col-span-1 p-2">
          <h1 className='scroll-m-20 text-3xl font-bold tracking-tight'>Chatbot detail</h1>
        </div>
      </div>
    </Layout>
  )
}

export default ChatPage