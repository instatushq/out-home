import '../styles/globals.css'
import Layout from '../components/layout'
import { Provider } from '../lib/context'
import withLoadingScreen from 'react-loading-screen-hoc'
import InstatusIcon from '../svg/instatus-icon.svg'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

const LoadingScreen = ({ isLoaded }) => (
  <div className={`fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black ${!isLoaded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none transition ease-in-out duration-300'}`}>
    <InstatusIcon className="w-12 h-12 fill-current text-green-dark" />
  </div>
)

export default withLoadingScreen(MyApp, LoadingScreen, {
  limitMilliSecond: 10 * 1000,
})
