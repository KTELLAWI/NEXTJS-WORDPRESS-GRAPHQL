import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
const API_KEY = "http://34.72.169.230/graphql"
const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const cache = new InMemoryCache({
	resultCaching: false,
});

/**
 * The credentials: 'include' allows cookies to be automatically sent
 * along with the request 'include' because backend is on another domain.
 *
 * @see https://www.apollographql.com/docs/react/networking/authentication/#cookie
 */
const link = createHttpLink({

	uri:`${process.env.GRAPHQL_HOST}/graphql`,
	//'http://localhost:8020/graphql'
	`${process.env.GRAPHQL_HOST}/graphql`,
	
	//uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
	//API_KEY,
	//`${process.env.GRAPHQL_HOST}/graphql`
	//"http://34.72.169.230/graphql",
	//`${process.env.NEXT_PUBLIC_GRAPHQL_HOST}/graphql`,
     //
    
    
})

const client = new ApolloClient({
	connectToDevTools: true,
	link,
	cache,
	defaultOptions
});

export default client;