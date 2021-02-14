import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import format from 'date-fns/format'

import useWindowSize from '../lib/use-window-size'
import useOs from '../lib/use-os'
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
      <div className="fixed top-0 z-10 flex items-center justify-end w-full h-8 bg-black">
        <div ref={repeatIconsRef} className="flex items-center justify-end mr-5" style={{ width: '29%' }}>
          <div className="flex items-center justify-around flex-grow mr-4">
            <div className="relative flex items-center justify-center h-full">
              <InstatusIcon className="w-5 h-4 text-white fill-current" />
              <Triangle 
                className="absolute h-auto left-1/2 top-4" 
                style={{ width: 460, marginLeft: -230 }} 
              />
              <div 
                className="absolute flex flex-col items-start justify-start font-mono text-black transform scale-110 bg-white border border-gray-800 shadow-2xl dark:text-white dark:bg-black left-1/2 top-24 rounded-xl"
                style={{ 
                  marginLeft: -230,
                  height: 400,
                  width: 460,
                }}
              >
                <AppHeader />
                {children}
              </div>
            </div>
            {[...Array(Math.round(repeatWidth / 60))].map((_item, index) => (
              <InstatusIcon className={`w-5 h-4 text-gray-${index >= 9 ? '9' : index + 1}00 fill-current`} />
            ))}
          </div>
          <div className="mr-4 text-sm text-gray-600 truncate">
            {format(date, 'EEE dd MMM')}
          </div>
          <div className="text-sm text-gray-600 truncate">
          {format(date, 'p')}
          </div>
        </div>
      </div>
      <div className="absolute left-0 right-0 w-5/12 h-1 top-32 line-horizontal" />
      <main className="container relative flex items-center justify-between h-screen mx-auto mt-5 antialiased text-white items-between">
        <div className="flex flex-col items-center w-1/2 h-full">
          <div className="flex flex-col w-full h-1/2">
            <div className="absolute top-0 left-0 right-0 w-1 h-screen line-vertical" />
            <div className="absolute left-0 z-10 flex items-center -mt-1 -ml-4 fill-current top-24">
              <InstatusIcon className="z-10 w-10 h-10 ml-px fill-current text-green-dark" />
              <h2 className="ml-3 text-3xl lowercase font-display">Instatus Out</h2>
            </div>
            <div className="flex w-full mt-56 -ml-4">
              <h1 className="max-w-3xl text-5xl text-left lowercase font-display">Monitor services in your menu bar</h1>
            </div>
          </div>
          <div className="flex flex-col items-start justify-end w-full pb-32 text-lg h-1/2">
            <a 
              href="https://github.com/instatushq/out" 
              className="z-10 flex items-center px-5 py-4 -ml-6 text-white uppercase transition duration-150 ease-in-out bg-black rounded-lg shadow-lg font-display hover:shadow-2xl hover:bg-green-dark hover:text-black group"
            >
              <DownloadIcon className="mr-4 -mt-1 -ml-2 text-white transition duration-150 ease-in-out fill-current w-7 h-7 group-hover:text-black" />
              Get on mac OS
            </a>
            <a 
              href="https://github.com/instatushq/out" 
              className="z-10 flex items-center px-5 pt-4 pb-3 mt-4 -ml-6 text-white uppercase transition duration-150 ease-in-out bg-black rounded-lg shadow-lg font-display hover:shadow-2xl hover:bg-green-dark hover:text-black group"
            >
              <VideoIcon className="w-6 h-6 mr-4 -mt-1 -ml-1 text-white transition duration-150 ease-in-out fill-current group-hover:text-black" />
              Watch intro video
            </a>
            <div className="mt-24 -ml-4 text-lg lowercase font-display">
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
        <div className="relative flex items-end justify-end w-1/2 h-screen">
          <div className="absolute z-10 flex items-center -mb-1 -right-8 bottom-32">
            <a
              href="https://github.com/instatushq/out" 
              target="_blank" 
              className="px-5 py-2 text-white transition duration-100 ease-in-out hover:text-green-dark"
            >
              <AppleIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="https://github.com/instatushq/out" 
              target="_blank" 
              className="px-5 py-2 text-white transition duration-100 ease-in-out hover:text-green-dark"
            >
              <MicrosoftIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="https://github.com/instatushq/out" 
              target="_blank" 
              className="px-5 py-2 text-white transition duration-100 ease-in-out hover:text-green-dark"
            >
              <LinuxIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="https://github.com/instatushq/out" 
              target="_blank" 
              className="px-5 py-2 text-white transition duration-100 ease-in-out hover:text-green-dark"
            >
              <GithubIcon className="w-6 h-6 fill-current" />
            </a>
            <a 
              href="https://github.com/instatushq/out" 
              target="_blank" 
              className="px-5 py-2 text-white transition duration-100 ease-in-out hover:text-green-dark"
            >
              <InstatusLogo className="py-px fill-current h-7" />
            </a>
          </div>
        </div>
      </main>
      <div className="absolute w-1/2 h-1 -mb-2 left-1/2 bottom-32 line-horizontal" />
      <style global jsx>
        {`
          .wrapper {
            background: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.80) ), url('/background.jpg') 50% 43%;
            background-size: cover;
          }
  
          .line-horizontal {
            background: url('/line-horizontal.png') repeat-x 50% 50%;
          }

          .line-vertical {
            background: url('/line-vertical.png') repeat-y 50% 50%;
          }
        `}
      </style>
    </div>
  )
}

export default Layout