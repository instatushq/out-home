import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import format from 'date-fns/format'

import useWindowSize from '../lib/use-window-size'
import InstatusIcon from '../svg/instatus-icon.svg'
import DownloadIcon from '../svg/download.svg'
import VideoIcon from '../svg/video.svg'
import Triangle from '../svg/triangle.svg'
import AppleIcon from '../svg/apple.svg'
import MicrosoftIcon from '../svg/microsoft.svg'
import LinuxIcon from '../svg/linux.svg'
import GithubIcon from '../svg/github.svg'
import InstatusLogo from '../svg/instatus-logo.svg'
import AppHeader from '../components/app/header'
import useOs from '../lib/use-os'

const Layout = ({ children }) => {
  const [date, setDate] = useState(new Date())
  const [repeatWidth, setRepeatWidth] = useState(0)
  const repeatIconsRef = useRef(null)
  const size = useWindowSize()
  const os = useOs()

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setRepeatWidth(repeatIconsRef.current.clientWidth)
  }, [size])

  return (
    <div className="w-screen h-screen overflow-hidden wrapper">
      <Head>
        <title>Instatus Out — Monitor services in your menu bar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed top-0 z-10 flex items-center justify-end w-full h-full md:bg-black md:h-8">
        <div ref={repeatIconsRef} className="flex w-full md:items-center md:justify-end md:h-full md:w-auto md:mr-5 repeat-icons">
          <div className="mr-4 md:flex md:items-center md:justify-around md:flex-grow md:h-full">
            <div className="md:flex md:items-center md:justify-center md:h-full md:relative">
              <InstatusIcon className="hidden w-5 h-4 text-white fill-current md:block" />
              <Triangle 
                className="absolute hidden h-auto md:block left-1/2 top-4" 
                style={{ width: 460, marginLeft: -230 }} 
              />
              <div className="flex flex-col items-start justify-start font-mono text-black transform scale-50 bg-white border border-gray-800 shadow-2xl -translate-x-14 md:absolute md:scale-110 md:bottom-auto max-w-screen md:translate-x-0 dark:text-white dark:bg-black md:left-1/2 md:top-32 rounded-xl app">
                <AppHeader />
                {children}
              </div>
            </div>
            {[...Array(Math.round(repeatWidth / 60))].map((_item, index) => (
              <InstatusIcon className={`w-5 h-4 hidden md:block text-gray-${index >= 9 ? '9' : index + 1}00 fill-current`} />
            ))}
          </div>
          <div className="items-center hidden md:flex">
            <div className="mr-4 text-sm text-gray-600 truncate">
              {format(date, 'EEE dd MMM')}
            </div>
            <div className="text-sm text-gray-600 truncate">
              {format(date, 'p')}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 right-0 h-1 top-12 md:w-5/12 md:top-32 line-horizontal" />
      <main className="container relative flex flex-col items-center justify-between h-screen px-8 py-4 mx-auto mt-5 antialiased text-white md:flex-row items-between">
        <div className="flex flex-col items-center w-full h-full md:w-1/2">
          <div className="flex flex-col w-full md:h-1/2">
            <div className="absolute top-0 right-0 w-1 h-screen -mt-4 left-12 md:left-8 line-vertical" />
            <div className="absolute z-10 flex items-center -mt-4 -ml-4 fill-current md:-mt-2 left-12 md:left-8 md:-ml-5 top-8 md:top-24">
              <InstatusIcon className="z-10 w-8 h-8 ml-px fill-current md:w-10 md:h-10 text-green-dark" />
              <h2 className="ml-3 text-2xl lowercase md:text-3xl font-display">Instatus Out</h2>
            </div>
            <div className="flex w-full mt-16 md:-ml-6 md:mt-56">
              <h1 className="w-64 text-3xl text-left lowercase md:w-auto md:max-w-3xl md:text-5xl font-display">Monitor services in your menu bar</h1>
            </div>
          </div>
          <div className="absolute bottom-0 flex flex-col items-start justify-end w-full pb-32 pl-10 md:text-lg md:pl-0 md:pb-24 md:h-1/2 md:relative md:bottom-auto">
            {os === 'Mac' && (
              <a 
                href="/download/mac" 
                className="z-10 flex items-center px-4 py-3 -ml-2 text-white uppercase transition duration-150 ease-in-out bg-black rounded-lg shadow-lg md:-ml-6 md:px-5 md:py-4 font-display hover:shadow-2xl hover:bg-green-dark hover:text-black group"
              >
                <DownloadIcon className="w-5 h-5 mr-4 -mt-1 -ml-2 text-white transition duration-150 ease-in-out fill-current md:w-7 md:h-7 group-hover:text-black" />
                Get on mac OS
              </a>
            )}
            {os === 'Windows' && (
              <a 
                href="/download/windows" 
                className="z-10 flex items-center px-4 py-3 -ml-2 text-white uppercase transition duration-150 ease-in-out bg-black rounded-lg shadow-lg md:-ml-6 md:px-5 md:py-4 font-display hover:shadow-2xl hover:bg-green-dark hover:text-black group"
              >
                <DownloadIcon className="w-5 h-5 mr-4 -mt-1 -ml-2 text-white transition duration-150 ease-in-out fill-current md:w-7 md:h-7 group-hover:text-black" />
                Get on Windows
              </a>
            )}
            {os === 'Linux' && (
              <a 
                href="/download/linux" 
                className="z-10 flex items-center px-4 py-3 -ml-2 text-white uppercase transition duration-150 ease-in-out bg-black rounded-lg shadow-lg md:-ml-6 md:px-5 md:py-4 font-display hover:shadow-2xl hover:bg-green-dark hover:text-black group"
              >
                <DownloadIcon className="w-5 h-5 mr-4 -mt-1 -ml-2 text-white transition duration-150 ease-in-out fill-current md:w-7 md:h-7 group-hover:text-black" />
                Get on Linux
              </a>
            )}
            <a 
              href="https://github.com/instatushq/out" 
              className="z-10 flex items-center px-4 pt-3 pb-2 mt-3 -ml-2 text-white uppercase transition duration-150 ease-in-out bg-black rounded-lg shadow-lg md:pb-3 md:-ml-6 md:mt-4 md:pt-4 md:px-5 font-display hover:shadow-2xl hover:bg-green-dark hover:text-black group"
            >
              <VideoIcon className="w-5 h-5 mr-4 -mt-1 -ml-1 text-white transition duration-150 ease-in-out fill-current md:w-6 md:h-6 group-hover:text-black" />
              Watch intro video
            </a>
            <div className="hidden mt-8 text-lg lowercase md:-ml-4 md:mt-24 font-display md:block">
              <p className="flex items-center">
                <div className="h-px mr-4 bg-white opacity-50 w-9" />
                Select services you depend on
              </p>
              <p className="flex items-center mt-4">
                <div className="h-px mr-4 bg-white opacity-50 w-9" />
                Check their status in your menu bar
              </p>
              <p className="flex items-center mt-4">
                <div className="h-px mr-4 bg-white opacity-50 w-9" />
                Get notified when they change their status
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex w-full h-screen md:items-end md:justify-end md:w-1/2">
          <div className="absolute z-10 flex flex-row-reverse items-center -mb-2 md:left-auto -left-2 md:flex-row bottom-12 md:-right-8 md:bottom-28">
            <a
              href="/download/mac" 
              target="_blank" 
              className="px-4 py-2 text-white transition duration-100 ease-in-out md:px-5 hover:text-green-dark"
            >
              <AppleIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="/download/windows" 
              target="_blank" 
              className="px-4 py-2 text-white transition duration-100 ease-in-out md:px-5 hover:text-green-dark"
            >
              <MicrosoftIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="/download/linux" 
              target="_blank" 
              className="px-4 py-2 text-white transition duration-100 ease-in-out md:px-5 hover:text-green-dark"
            >
              <LinuxIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="https://github.com/instatushq/out" 
              target="_blank" 
              className="px-4 py-2 text-white transition duration-100 ease-in-out md:px-5 hover:text-green-dark"
            >
              <GithubIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="https://instatus.com" 
              target="_blank" 
              className="hidden px-4 py-2 text-white transition duration-100 ease-in-out md:px-5 hover:text-green-dark md:block"
            >
              <InstatusLogo className="py-px fill-current h-7" />
            </a>
            <a 
              href="https://instatus.com" 
              target="_blank" 
              className="px-4 py-2 text-white transition duration-100 ease-in-out md:px-5 hover:text-green-dark md:hidden"
            >
              <InstatusIcon className="py-px fill-current h-7" />
            </a>
          </div>
        </div>
      </main>
      <div className="absolute w-full h-1 -mb-10 md:-mb-2 md:w-1/2 md:left-1/2 bottom-24 md:bottom-28 line-horizontal" />
      <div className="text-gray-100 text-gray-200 text-gray-300 text-gray-400 text-gray-500 text-gray-600 text-gray-700 text-gray-800 text-gray-900 anti-purge" />
      <style global jsx>
        {`
          .wrapper {
            background: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.80) ), url('https://out.instatus.com/out/background.jpg') 50% 43%;
            background-size: cover;
          }
  
          .line-horizontal {
            background: url('https://out.instatus.com/out/line-horizontal.png') repeat-x 50% 50%;
          }

          .line-vertical {
            background: url('https://out.instatus.com/out/line-vertical.png') repeat-y 50% 50%;
          }
          .app {
            margin-left: -30px;
            width: 460px;
            height: 400px;
          }
          @media only screen and (min-width: 600px) {
            .repeat-icons {
              width: 29%;
            }
          .app {
            margin-left: -230px;
          }
        `}
      </style>
    </div>
  )
}

export default Layout