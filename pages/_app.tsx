import '../styles/globals.css'
import Layout from '../components/layout'
import { Provider } from '../lib/context'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
