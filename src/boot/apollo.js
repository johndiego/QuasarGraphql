import { ApolloClient /*, createHttpLink */ } from '@apollo/client/core'
import { ApolloClients,DefaultApolloClient } from '@vue/apollo-composable'
import { boot } from 'quasar/wrappers'
import { getClientOptions } from 'src/apollo'
export default boot(
  /* async */ ({ app,store }) => {
    // Default client.
    const options = /* await */ getClientOptions(/*{app, router }*/)
    const apolloClient = new ApolloClient(options)
    const apolloClients = {
      default: apolloClient,
    }
    app.provide(ApolloClients, apolloClients)
    store.use(() => ({
      $apollo: apolloClient
    }))
  }
)
