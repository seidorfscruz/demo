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
import Accordion from '@/components/ui/Accordion'
import BotpressChatVentas from '@/components/ui/BotpressChatVentas'
import BotpressChatSoporte from '@/components/ui/BotpressChatSoporte'
import BotpressChatRecursosHumanos from '@/components/ui/BotpressChatRecursosHumanos'
import BotpressChatInnovacion from '@/components/ui/BotpressChatInnovacion'
import { Button } from '@mui/material'
import imgDefault from '@/constant/defaultimg'
import { useUser } from '@supabase/auth-helpers-react'
import Login from '../login/index'
import { supabase } from '@/apis'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

const getChatbotsInformation = async () => {
  try {
    // fsantacruz - Chatbot Reglamento de Futbol 11 escolar
    const chatbotFutbol = await axios.get('https://api.botpress.cloud/v1/admin/bots/1f5c8318-4066-434b-b87e-acf4b192345f', {
      headers: {
        'x-workspace-id': '7bd3606c-9c5f-472e-8bbb-a5466b82c7e0',
        Authorization: `Bearer bp_pat_0WOQJ18bzLi1D9PGTY8wfRmlhFdlcqMhT11f`
      }
    })
    
    // santacruzgabrielf - Chatbot Constitución Nacional Argentina
    const chatbotConstitucion = await axios.get('https://api.botpress.cloud/v1/admin/bots/793096bf-365b-4a3a-994a-b54407c558a7', {
      headers: {
        'x-workspace-id': 'ae3eb1e5-47e5-45d3-898c-2d18a03f9816',
        Authorization: `Bearer bp_pat_TXfxE4kHFDKVMgTsfTcF7LaDyP2iLjCZMNts`
      }
    })
    
    // santacruzfernandog - Chatbot Aplicación Cuidar
    const chatbotCuidar = await axios.get('https://api.botpress.cloud/v1/admin/bots/c1fb4c0b-525c-475b-890d-8b9e5f18cc1d', {
      headers: {
        'x-workspace-id': '7459f6f8-fcf3-4266-adf0-7ffa55b6e964',
        Authorization: `Bearer bp_pat_qKieCpNDQq3cqKQGhkfQ7fDlAXRY4XojbQ1G`
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
    const chatbotFutbolInfo = await chatbotFutbol.data
    const chatbotCuidarInfo = await chatbotCuidar.data
    const chatbotConstitucionInfo = await chatbotConstitucion.data

    console.log(chatbotInnovacionInfo.bot.integrations[Object.keys(chatbotInnovacionInfo.bot.integrations)[0]].configuration)

    return [ chatbotInnovacionInfo, chatbotRecursosHumanosInfo, chatbotSoporteInfo, chatbotVentasInfo, chatbotFutbolInfo, chatbotCuidarInfo, chatbotConstitucionInfo ]

  } catch (error) {
    console.log('Error getting chatbot information')
    console.log(error)
  }
}



const ChatPage = () => {
  const user = useUser()
  const [chatSelected, setChatSelected] = useState(3)
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
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }},
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }},
    {bot:{ createdAt:'', name:'', integrations: [{ configuration: {botConversationDescription: ''} }] }}
  ])


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
              // onClick={ () => setChatSelected(3) }
            >
              <div className="col-span-1">
                <AvatarStatusBadge imageUrl={chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.avatarUrl}  />
              </div>
              <div className="col-span-4 flex flex-col justify-center">
                <small className='text-sm font-semibold'>
                  { chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botName }
                </small>
                <small className='text-xs font-semibold text-gray-500'>
                  { chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botConversationDescription }
                </small>
              </div>
            </div>
          
          {/* {
            teamSelected === 'humanresources' && (
              <div
                className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(chatSelected === 4) && 'bg-blue-200 text-black'}`}
                onClick={ () => setChatSelected(4) }
              >
                <div className="col-span-1">
                  <AvatarStatusBadge imageUrl={imgDefault[4].value}  />
                </div>
                <div className="col-span-4 flex flex-col justify-center">
                  <small className='text-sm font-semibold'>
                    { chatbotsInformation[4].bot.integrations[Object.keys(chatbotsInformation[4].bot.integrations)[0]].configuration.botName }
                  </small>
                  <small className='text-xs font-semibold text-gray-500'>
                    { chatbotsInformation[4].bot.integrations[Object.keys(chatbotsInformation[4].bot.integrations)[0]].configuration.botConversationDescription }
                  </small>
                </div>
              </div>
            )
          } */}
          
          {/* {
            teamSelected === 'sales' && (
              <div
                className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(chatSelected === 6) && 'bg-blue-200 text-black'}`}
                onClick={ () => setChatSelected(6) }
              >
                <div className="col-span-1">
                  <AvatarStatusBadge imageUrl={imgDefault[6].value}  />
                </div>
                <div className="col-span-4 flex flex-col justify-center">
                  <small className='text-sm font-semibold'>
                    { chatbotsInformation[6].bot.integrations[Object.keys(chatbotsInformation[6].bot.integrations)[0]].configuration.botName }
                  </small>
                  <small className='text-xs font-semibold text-gray-500'>
                    { chatbotsInformation[6].bot.integrations[Object.keys(chatbotsInformation[6].bot.integrations)[0]].configuration.botConversationDescription }
                  </small>
                </div>
              </div>
            )
          } */}
          
          {/* {
            teamSelected === 'support' && (
              <div
                className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(chatSelected === 5) && 'bg-blue-200 text-black'}`}
                onClick={ () => setChatSelected(5) }
              >
                <div className="col-span-1">
                  <AvatarStatusBadge imageUrl={imgDefault[5].value}  />
                </div>
                <div className="col-span-4 flex flex-col justify-center">
                  <small className='text-sm font-semibold'>
                    { chatbotsInformation[5].bot.integrations[Object.keys(chatbotsInformation[5].bot.integrations)[1]].configuration.botName }
                  </small>
                  <small className='text-xs font-semibold text-gray-500'>
                    { chatbotsInformation[5].bot.integrations[Object.keys(chatbotsInformation[5].bot.integrations)[1]].configuration.botConversationDescription }
                  </small>
                </div>
              </div>
            )
          } */}
          
          {/* {
            teamSelected === 'others' && (
              <>
                <div
                  className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(chatSelected === 0) && 'bg-blue-200 text-black'}`}
                  onClick={ () => setChatSelected(0) }
                >
                  <div className="col-span-1">
                    <AvatarStatusBadge imageUrl={imgDefault[0].value} />
                  </div>
                  <div className="col-span-4 flex flex-col justify-center">
                    <small className='text-sm font-semibold'>
                      { chatbotsInformation[0].bot.integrations[Object.keys(chatbotsInformation[0].bot.integrations)[0]].configuration.botName }
                    </small>
                    <small className='text-xs font-semibold text-gray-500'>{ chatbotsInformation[0].bot.integrations[Object.keys(chatbotsInformation[0].bot.integrations)[0]].configuration.botConversationDescription }</small>
                  </div>
                </div>
              
                <div
                  className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(chatSelected === 1) && 'bg-blue-200 text-black'}`}
                  onClick={ () => setChatSelected(1) }
                >
                  <div className="col-span-1">
                    <AvatarStatusBadge imageUrl={imgDefault[1].value}  />
                  </div>
                  <div className="col-span-4 flex flex-col justify-center">
                    <small className='text-sm font-semibold'>
                      { chatbotsInformation[1].bot.integrations[Object.keys(chatbotsInformation[1].bot.integrations)[0]].configuration.botName }
                    </small>
                    <small className='text-xs font-semibold text-gray-500'>
                      { chatbotsInformation[1].bot.integrations[Object.keys(chatbotsInformation[1].bot.integrations)[0]].configuration.botConversationDescription }
                    </small>
                  </div>
                </div>
              
                <div
                  className={`grid grid-cols-5 border p-2 rounded-sm my-1 cursor-pointer hover:text-black hover:bg-blue-200 ${(chatSelected === 2) && 'bg-blue-200 text-black'}`}
                  onClick={ () => setChatSelected(2) }
                >
                  <div className="col-span-1">
                    <AvatarStatusBadge imageUrl={imgDefault[2].value}  />
                  </div>
                  <div className="col-span-4 flex flex-col justify-center">
                    <small className='text-sm font-semibold'>
                      { chatbotsInformation[2].bot.integrations[Object.keys(chatbotsInformation[2].bot.integrations)[0]].configuration.botName }
                    </small>
                    <small className='text-xs font-semibold text-gray-500'>
                      { chatbotsInformation[2].bot.integrations[Object.keys(chatbotsInformation[2].bot.integrations)[0]].configuration.botConversationDescription }
                    </small>
                  </div>
                </div>
              </>
            )
          } */}
        </div>
        <div className="col-span-2">
          <div className="relative flex">
            <div
            style={{ width: '50vw%', height: '90vh' }}
              className={`relative h-full w-full overflow-clip border border-zinc-200 bg-white p-2 px-0 py-0`}
            >
              {
                (chatSelected === 0) && <BotpressChatInnovacion image={ chatbotsInformation[0].bot.integrations[Object.keys(chatbotsInformation[0].bot.integrations)[0]].configuration.avatarUrl } title={chatbotsInformation[0].bot.integrations[Object.keys(chatbotsInformation[0].bot.integrations)[0]].configuration.botName} /> ||
                (chatSelected === 1) && <BotpressChatRecursosHumanos image={ chatbotsInformation[1].bot.integrations[Object.keys(chatbotsInformation[1].bot.integrations)[0]].configuration.avatarUrl } title={chatbotsInformation[1].bot.integrations[Object.keys(chatbotsInformation[1].bot.integrations)[0]].configuration.botName} /> ||
                (chatSelected === 2) && <BotpressChatSoporte image={ chatbotsInformation[2].bot.integrations[Object.keys(chatbotsInformation[2].bot.integrations)[0]].configuration.avatarUrl } title={chatbotsInformation[2].bot.integrations[Object.keys(chatbotsInformation[2].bot.integrations)[0]].configuration.botName} /> ||
                (chatSelected === 3) && <BotpressChatVentas image={ chatbotsInformation[3].bot.integrations[Object.keys(chatbotsInformation[3].bot.integrations)[0]].configuration.avatarUrl } title={chatbotsInformation[3].bot.integrations[Object.keys(chatbotsInformation[3].bot.integrations)[0]].configuration.botName} /> ||
                (chatSelected === 4) && <BotpressChatFutbol image={ chatbotsInformation[4].bot.integrations[Object.keys(chatbotsInformation[4].bot.integrations)[0]].configuration.avatarUrl } title={chatbotsInformation[4].bot.integrations[Object.keys(chatbotsInformation[4].bot.integrations)[0]].configuration.botName} /> ||
                (chatSelected === 5) && <BotpressChatCuidar image={ chatbotsInformation[5].bot.integrations[Object.keys(chatbotsInformation[5].bot.integrations)[0]].configuration.avatarUrl } title={chatbotsInformation[5].bot.integrations[Object.keys(chatbotsInformation[5].bot.integrations)[0]].configuration.botName} /> ||
                (chatSelected === 6) && <BotpressChatConstitucion image={ chatbotsInformation[6].bot.integrations[Object.keys(chatbotsInformation[6].bot.integrations)[0]].configuration.avatarUrl } title={chatbotsInformation[6].bot.integrations[Object.keys(chatbotsInformation[6].bot.integrations)[0]].configuration.botName} />
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
                chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botName
              }
            </span>
          </div>
          
          <div className='flex flex-col mt-4'>
            <span className='text-gray-700 text-xs'>Descripción</span>
            <span className='text-sm text-gray-500 font-medium leading-none'>
              {
                chatbotsInformation[chatSelected].bot.integrations[Object.keys(chatbotsInformation[chatSelected].bot.integrations)[0]].configuration.botConversationDescription
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