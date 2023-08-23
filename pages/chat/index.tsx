import { useEffect, useState } from 'react'
import { Layout } from '@/components/layouts'
import { AvatarStatusBadge, AvatarStaticBadge } from '@/components/ui'
import { Icon } from '@iconify/react'
import chatStyles from '@/styles/chat.module.css'
import BotpressChatConstitucion from '@/components/ui/BotpressChatConstitucion'
import BotpressChatCuidar from '@/components/ui/BotpressChatCuidar'
import BotpressChatFutbol from '@/components/ui/BotpressChatFutbol'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'



const getChatbotsInformation = async () => {
  try {
    // fsantacruz
    const chatbotFutbol = await axios.get('https://api.botpress.cloud/v1/admin/bots/1f5c8318-4066-434b-b87e-acf4b192345f', {
      headers: {
        'x-workspace-id': '7bd3606c-9c5f-472e-8bbb-a5466b82c7e0',
        Authorization: `Bearer bp_pat_0WOQJ18bzLi1D9PGTY8wfRmlhFdlcqMhT11f`
      }
    })
    
    // santacruzgabrielf
    const chatbotConstitucion = await axios.get('https://api.botpress.cloud/v1/admin/bots/793096bf-365b-4a3a-994a-b54407c558a7', {
      headers: {
        'x-workspace-id': 'ae3eb1e5-47e5-45d3-898c-2d18a03f9816',
        Authorization: `Bearer bp_pat_TXfxE4kHFDKVMgTsfTcF7LaDyP2iLjCZMNts`
      }
    })
    
    // santacruzfernandog
    const chatbotCuidar = await axios.get('https://api.botpress.cloud/v1/admin/bots/c1fb4c0b-525c-475b-890d-8b9e5f18cc1d', {
      headers: {
        'x-workspace-id': '7459f6f8-fcf3-4266-adf0-7ffa55b6e964',
        Authorization: `Bearer bp_pat_qKieCpNDQq3cqKQGhkfQ7fDlAXRY4XojbQ1G`
      }
    })

    const chatbotConstitucionInfo = await chatbotConstitucion.data
    const chatbotCuidarInfo = await chatbotCuidar.data
    const chatbotFutbolInfo = await chatbotFutbol.data
    
    return [ chatbotConstitucionInfo, chatbotCuidarInfo, chatbotFutbolInfo ]

  } catch (error) {
    console.log('Error getting chatbot information')
    console.log(error)
  }
}



const ChatPage = () => {

  const [chatSelected, setChatSelected] = useState(0)
  const { isLoading } = useSelector((state: RootState) => state.ui)
  // console.log(value)

  const [chatbotsInformation, setChatbotsInformation] = useState([{bot:{name:'', integrations:{iconUrl:''}}},{bot:{name:'', integrations:{iconUrl:''}}},{bot:{name:'', integrations:{iconUrl:''}}}])
  // console.log(chatbotsInformation)

  useEffect(() => {
    const getChatbotsInfo = async() => {
      const chatbotsInfo = await getChatbotsInformation()
      setChatbotsInformation(chatbotsInfo!)
    }
    getChatbotsInfo()
  }, [])
  

  return (
    <Layout title='Chat page'>
      <div className="grid grid-cols-5 h-100">
        <div className="col-span-1 border-r-2 p-2">
          <h1 className='scroll-m-20 text-3xl font-bold tracking-tight mb-4'>Team</h1>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200'>
            <div className="col-span-1">
              <Icon icon="flat-color-icons:online-support" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex justify-between items-center ps-1">
              <small className='text-sm font-semibold'>Customer support</small>
              <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">2</span>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200'>
            <div className="col-span-1">
              <Icon icon="logos:microsoft-teams" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex justify-between items-center ps-1">
              <small className='text-sm font-semibold'>Accounting</small>
              <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">5</span>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200'>
            <div className="col-span-1">
              <Icon icon="emojione:money-bag" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex flex-col justify-center ps-1">
              <small className='text-sm font-semibold'>Sales team</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200'>
            <div className="col-span-1">
              <Icon icon="fluent-emoji:rocket" style={{ fontSize: '40px' }} />
            </div>
            <div className="col-span-4 flex flex-col justify-center ps-1">
              <small className='text-sm font-semibold'>Marketing</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200'>
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

          <div
            className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200 ${(chatSelected === 0) && 'bg-blue-200'}`}
            onClick={ () => setChatSelected(0) }
          >
            <div className="col-span-1">
              <AvatarStatusBadge imageUrl={'https://app.botpress.cloud/chatbots/abstract-13.svg'} />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>{ chatbotsInformation[0].bot.name }</small>
              <small className='text-xs font-semibold text-gray-500'>{ chatbotsInformation[0].bot.name }</small>
            </div>
          </div>
          
          <div
            className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200 ${(chatSelected === 1) && 'bg-blue-200'}`}
            onClick={ () => setChatSelected(1) }
          >
            <div className="col-span-1">
              <AvatarStatusBadge imageUrl={'https://app.botpress.cloud/chatbots/abstract-35.svg'}  />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>{ chatbotsInformation[1].bot.name }</small>
              <small className='text-xs font-semibold text-gray-500'>{ chatbotsInformation[1].bot.name }</small>
            </div>
          </div>
          
          <div
            className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200 ${(chatSelected === 2) && 'bg-blue-200'}`}
            onClick={ () => setChatSelected(2) }
          >
            <div className="col-span-1">
              <AvatarStatusBadge imageUrl={'https://app.botpress.cloud/chatbots/abstract-52.svg'}  />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>{ chatbotsInformation[2].bot.name }</small>
              <small className='text-xs font-semibold text-gray-500'>{ chatbotsInformation[2].bot.name }</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200'>
            <div className="col-span-1">
              <AvatarStaticBadge />
            </div>
            <div className="col-span-4 flex flex-col justify-center">
              <small className='text-sm font-semibold'>Pablo Guzman</small>
              <small className='text-xs font-semibold text-gray-500'>This is a little description</small>
            </div>
          </div>
          
          <div className='grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:bg-blue-200'>
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
              {
                (chatSelected === 0) && <BotpressChatConstitucion /> ||
                (chatSelected === 1) && <BotpressChatCuidar /> ||
                (chatSelected === 2) && <BotpressChatFutbol />
              }
            </div>
          </div>
        </div>
        <div className="col-span-1 p-2 overflow-hidden">
          <h1 className='scroll-m-20 text-3xl font-bold tracking-tight'>Chatbot detail</h1>
          <small>
            { JSON.stringify(chatbotsInformation[chatSelected]) }
          </small>
        </div>
      </div>
    </Layout>
  )
}

export default ChatPage