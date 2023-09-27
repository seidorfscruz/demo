import { useEffect, useState } from 'react'
import { Layout } from '@/components/layouts'
import { AvatarStatusBadge, AvatarStaticBadge } from '@/components/ui'
import { Icon } from '@iconify/react'
import BotpressChatMarketing from '@/components/ui/BotpressChatMarketing'
import axios from 'axios'
import Accordion from '@/components/ui/Accordion'
import BotpressChatVentas from '@/components/ui/BotpressChatVentas'
import BotpressChatSoporte from '@/components/ui/BotpressChatSoporte'
import BotpressChatRecursosHumanos from '@/components/ui/BotpressChatRecursosHumanos'
import BotpressChatInnovacion from '@/components/ui/BotpressChatInnovacion'
import { Button } from '@mui/material'
import { useUser } from '@supabase/auth-helpers-react'
import Login from '../login/index'
import { supabase } from '@/apis'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import NoImage from '@/assets/img/no-image.jpg'

const getChatbotsInformation = async () => {
  try {
    // fsantacruz - Chatbot Reglamento de Futbol 11 escolar
    const chatbotMarketing = await axios.get('https://api.botpress.cloud/v1/admin/bots/e0a9fb8a-fed4-49e7-9451-78beb720e945', {
      headers: {
        'x-workspace-id': '44dab843-9144-423f-b5d4-75ced1a8c954',
        Authorization: `Bearer bp_pat_XqTwqq9fEdcy1e7AEF6hCq8ONC1QkOJppcwp`
      }
    })
    
    // Andrea - Chatbot Innovación
    const chatbotInnovacion = await axios.get('https://api.botpress.cloud/v1/admin/bots/b72d1a22-13b9-4949-93e4-2ec4974ea8fc', {
      headers: {
        'x-workspace-id': '44dab843-9144-423f-b5d4-75ced1a8c954',
        Authorization: `Bearer bp_pat_XqTwqq9fEdcy1e7AEF6hCq8ONC1QkOJppcwp`
      }
    })
    
    // Andrea - Chatbot Recursos Humanos | Consultas generales
    const chatbotRecursosHumanos = await axios.get('https://api.botpress.cloud/v1/admin/bots/18445742-4842-4d49-9925-3e49acdd17c2', {
      headers: {
        'x-workspace-id': '44dab843-9144-423f-b5d4-75ced1a8c954',
        Authorization: `Bearer bp_pat_XqTwqq9fEdcy1e7AEF6hCq8ONC1QkOJppcwp`
      }
    })
    
    // Andrea - Chatbot Soporte | Consultas sobre Harbinger
    const chatbotSoporte = await axios.get('https://api.botpress.cloud/v1/admin/bots/fe6cb52a-32b9-4b51-bcae-3c301ad0be4d', {
      headers: {
        'x-workspace-id': '44dab843-9144-423f-b5d4-75ced1a8c954',
        Authorization: `Bearer bp_pat_XqTwqq9fEdcy1e7AEF6hCq8ONC1QkOJppcwp`
      }
    })
    
    // Andrea - Chatbot Ventas | Productos Seidor Analytics
    const chatbotVentas = await axios.get('https://api.botpress.cloud/v1/admin/bots/dec67bc5-06d2-48a9-9d66-9f885c54abe1', {
      headers: {
        'x-workspace-id': '44dab843-9144-423f-b5d4-75ced1a8c954',
        Authorization: `Bearer bp_pat_XqTwqq9fEdcy1e7AEF6hCq8ONC1QkOJppcwp`
      }
    })

    const chatbotInnovacionInfo = await chatbotInnovacion.data
    const chatbotRecursosHumanosInfo = await chatbotRecursosHumanos.data
    const chatbotSoporteInfo = await chatbotSoporte.data
    const chatbotVentasInfo = await chatbotVentas.data
    const chatbotMarketingInfo = await chatbotMarketing.data

    return [ chatbotInnovacionInfo, chatbotRecursosHumanosInfo, chatbotSoporteInfo, chatbotVentasInfo, chatbotMarketingInfo ]

  } catch (error) {
    console.log('Error getting chatbot information')
    console.log(error)
  }
}



const ChatPage = () => {
  const user = useUser()
  const [chatSelected, setChatSelected] = useState(0)
  const [teamSelected, setTeamSelected] = useState('innovation')
  
  const [userTeams, setUserTeams] = useState([
    {
      id: "",
      name: "",
      imageUrl: "",
      description: "",
    },
  ]);
  // const { isLoading } = useSelector((state: RootState) => state.ui)

  const [chatbotsInformation, setChatbotsInformation] = useState<any>([
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }},
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }},
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }},
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }},
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }}
  ])
  console.log(chatbotsInformation[0])


  useEffect(() => {
    const getChatbotsInfo = async() => {
      const chatbotsInfo = await getChatbotsInformation()
      setChatbotsInformation(chatbotsInfo!)
    }
    getChatbotsInfo()
  }, [])

  
  async function fetchTeamsData() {
    const x = await supabase.from("teams").select().eq('idTenant', user?.user_metadata.id_tenantint).order('created_at', { ascending: true });
    if (x.error) {
      console.log(x.error);
    } else {
      console.log(x.data)
      setUserTeams(x.data);
    }
  }

  useEffect(() => {
    fetchTeamsData();
  }, []);

  
  if (!user)
  return (
    <Login></Login>
  )

  return (
    <Layout title='Chat page'>
      <div className="grid grid-cols-5 h-100">

        <div className="col-span-1 border-r-2 p-2">
          <span className='scroll-m-20 text-3xl font-bold tracking-tight mb-4'>Teams</span>
          {
            userTeams.map( (team, index) => (
              <div
                key={ team.id }
                className={`grid grid-cols-5 p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(teamSelected === team.name) && 'bg-blue-200 text-black'}`}
                onClick={ () => {
                  console.log(index)
                  setTeamSelected(team.name)
                  setChatSelected(index)
                }}
              >
                <div className="col-span-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        typeof team.imageUrl === "number" ||
                        !isNaN(Number(team.imageUrl))
                          ? `https://fzjgljxomqpukuvmguay.supabase.co/storage/v1/object/public/Images/imagesChatBots/${team.id}/${team.imageUrl}`
                          : team.imageUrl
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="col-span-4 flex flex-col justify-center ps-1">
                  <small className='text-sm font-semibold'>{ team.name }</small>
                </div>
              </div>
            ))
          }
        </div>

        <div className="col-span-1 p-2">
          <h1 className='scroll-m-20 text-3xl font-bold tracking-tight mb-4'>Chatbots</h1>
            <div
              className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(chatSelected === 0) && 'bg-blue-200 text-black'}`}
            >
              <div className="col-span-1">
                <AvatarStatusBadge
                  imageUrl={
                    chatSelected === 2
                    ? chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[1]].configuration.avatarUrl
                    : chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.avatarUrl
                  }
                  />
              </div>
              <div className="col-span-4 flex flex-col justify-center">
                <small className='text-sm font-semibold'>
                  {
                    chatSelected === 2
                    ? chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[1]].configuration.botName
                    : chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botName
                  }
                </small>
                <small className='text-xs font-semibold text-gray-500'>
                  {
                    chatSelected === 2
                    ? chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[1]].configuration.botConversationDescription
                    : chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botConversationDescription
                  }
                </small>
              </div>
            </div>
        </div>
        <div className="col-span-2">
          <div className="relative flex">
            <div
            style={{ width: '50vw%', height: '90vh' }}
              className={`relative h-full w-full overflow-clip border border-zinc-200 bg-white p-2 px-0 py-0`}
            >
              {
                (chatSelected === 0) &&
                <BotpressChatInnovacion
                  image={ chatbotsInformation[0].bot.integrations[Object.keys(chatbotsInformation[0].bot.integrations)[0]].configuration.avatarUrl }
                  title={chatbotsInformation[0].bot.integrations[Object.keys(chatbotsInformation[0].bot.integrations)[0]].configuration.botName} /> ||

                (chatSelected === 1) &&
                <BotpressChatRecursosHumanos
                  image={ chatbotsInformation[1].bot.integrations[Object.keys(chatbotsInformation[1].bot.integrations)[0]].configuration.avatarUrl }
                  title={chatbotsInformation[1].bot.integrations[Object.keys(chatbotsInformation[1].bot.integrations)[0]].configuration.botName} /> ||

                (chatSelected === 2) &&
                <BotpressChatSoporte
                  image={ chatbotsInformation[2].bot.integrations[Object.keys(chatbotsInformation[2].bot.integrations)[1]].configuration.avatarUrl }
                  title={chatbotsInformation[2].bot.integrations[Object.keys(chatbotsInformation[2].bot.integrations)[1]].configuration.botName} /> ||

                (chatSelected === 3) &&
                <BotpressChatVentas
                  image={ chatbotsInformation[3].bot.integrations[Object.keys(chatbotsInformation[3].bot.integrations)[0]].configuration.avatarUrl }
                  title={chatbotsInformation[3].bot.integrations[Object.keys(chatbotsInformation[3].bot.integrations)[0]].configuration.botName} /> ||

                (chatSelected === 4) &&
                <BotpressChatMarketing
                  image={ chatbotsInformation[4].bot.integrations[Object.keys(chatbotsInformation[4].bot.integrations)[0]].configuration.avatarUrl }
                  title={chatbotsInformation[4].bot.integrations[Object.keys(chatbotsInformation[4].bot.integrations)[0]].configuration.botName} />
              }
            </div>
          </div>
        </div>

        <div className="col-span-1 p-2 overflow-hidden">
          <h1 className='scroll-m-20 text-3xl font-bold tracking-tight'>Details</h1>
          
          <div className='flex items-center mt-5'>
            <Icon icon="fluent:bot-24-regular" className='me-2' style={{ color: 'rgb(239, 184, 16)', fontSize: '23px' }} />
            <span className='text-lg text-gray-700 font-bold leading-none'>Chatbot info</span>
          </div>

          <div className='flex flex-col mt-4'>
            <span className='text-gray-700 text-xs'>Nombre del Chatbot</span>
            <span className='text-sm text-gray-500 font-medium leading-none'>
              {
                chatSelected === 2
                ? chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[1]].configuration.botName
                : chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botName
              }
            </span>
          </div>
          
          <div className='flex flex-col mt-4'>
            <span className='text-gray-700 text-xs'>Descripción</span>
            <span className='text-sm text-gray-500 font-medium leading-none'>
              {
                chatSelected === 2
                ? chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[1]].configuration.botConversationDescription
                : chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botConversationDescription
              }
            </span>
          </div>
          
          <div className='flex flex-col mt-4'>
            <span className='text-gray-700 text-xs mb-1'>Base de conocimiento</span>
            <Accordion title='Documentos cargados'>
              <div className='flex flex-col'>
                <span className='text-gray-500 text-sm'>Harbinger modo de uso.doc</span>
                <span className='text-gray-500 text-sm'>Harbinger preguntas frecuentes.pdf</span>
                <span className='text-gray-500 text-sm'>Harbinger pricing.pdf</span>
              </div>
            </Accordion>
          </div>

          <div className='flex flex-col mt-4'>
            <span className='text-gray-700 text-xs'>Última conversación</span>
            <span className='text-sm text-gray-500 font-medium leading-none'>Hace 3 días</span>
          </div>
          
          <div className='flex flex-col mt-4'>
            <span className='text-gray-700 text-xs'>Chatbot creado el día</span>
            <span className='text-sm text-gray-500 font-medium leading-none'>{ new Date(chatbotsInformation[chatSelected].bot.createdAt).toLocaleString() }</span>
          </div>

          <div className='mt-10'>
            <Button href='https://teams.microsoft.com/l/chat/0/0?users=28:50d83e1a-eb39-4725-bf59-870729939bbe' target='_blank' variant='contained' size="small" style={{ backgroundColor: '#fff' }} className='w-48'>
              <span className='text-xs font-semibold px-2 py-1' style={{ color: '#464EB8' }}>Abrir en Teams</span>
              <Icon icon="logos:microsoft-teams" style={{ fontSize: '20px' }} />
            </Button>
            
            <Button variant='contained' size="small" style={{ marginTop: '5px', backgroundColor: 'rgb(170, 170, 170, 0.9)', cursor: 'auto' }} className='w-48'>
              <span className='text-xs font-semibold px-2 py-1' style={{ color: 'rgb(90, 90, 90)' }}>Próximamente</span>
              <Icon icon="logos:whatsapp-icon" style={{ fontSize: '20px' }} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ChatPage