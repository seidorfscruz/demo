import { Layout } from '@/components/layouts'
import { BubbleChat, FullPageChat } from "flowise-embed-react";

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
      <BubbleChat chatflowid="e4740be0-f776-4d56-8bda-77134309fa5d" apiHost="https://flowise.seidoranalytics.com" />
      {/* <FullPageChat chatflowid="e4740be0-f776-4d56-8bda-77134309fa5d" apiHost="https://flowise.seidoranalytics.com" /> */}
    </Layout>
  )
}

export default ChatPage