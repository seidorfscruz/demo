import Head from 'next/head'
import { FC } from 'react'
import { Props } from '@/interfaces'
import TeamSwitcher from '@/components/ui/team-switcher'
import { MainNav } from '@/components/ui/main-nav'
import { Search } from '@/components/ui/search'
import { UserNav } from '@/components/ui/user-nav'
import { DarkModeToggle } from '../ui/ModeToggle'


export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || 'Daiana'}</title>
            <meta name='author' content='Seidor Analytics' />
            <meta name='description' content='Create your own chatbots with all your business content' />
            <meta name='keywords' content={`${title}, ask, questions, docs, documents, files, chat, chatbot, ai, smart, business, content, daiana`} />
        </Head>

        {/* Navbar */}
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <TeamSwitcher />
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <DarkModeToggle />
                <Search />
                <UserNav />
              </div>
            </div>
          </div>
        </div>

        <main>
            { children }
        </main>
    </>
  )
}
