import { getHeader, getLanguage } from '@/context/server'
import { HeaderMenu } from '@/features/common/header/HeaderMenu'
import { Slideout } from '@/features/common/header/Slideout'
import Link from 'next/link'

export async function CustomHeader() {
  const lang = getLanguage()
  const { header } = getHeader()

  return (
    <header>
      <nav className="navigation">
        <Link href={'/' + lang}>
          <h1>
            <div>
              <span className="title-1">
                {header?.data?.attributes?.Header?.Titre.split(' ')[0] + ' '}
              </span>
              <span className="title-2">
                {header?.data?.attributes?.Header?.Titre.split(' ')[1]}
              </span>
              <span className="title-3">
                {header?.data?.attributes?.Header?.SousTitre}
              </span>
            </div>
          </h1>
        </Link>

        <Slideout
          titleComponent={
            <div>
              <span className="title-1">
                {header?.data?.attributes?.Header?.Titre.split(' ')[0] + ' '}
              </span>
              <span className="title-2">
                {header?.data?.attributes?.Header?.Titre.split(' ')[1]}
              </span>
              <span className="title-3">
                {header?.data?.attributes?.Header?.SousTitre}
              </span>
            </div>
          }
          menuItem={header}
          lang={lang}
        />
        <div className="navigation__desktop">
          <HeaderMenu listItem={header} lang={lang} />
        </div>
      </nav>
    </header>
  )
}
