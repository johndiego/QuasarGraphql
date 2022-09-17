import { defineStore } from 'pinia';
import { useMutation  } from '@vue/apollo-composable'
import gql from 'graphql-tag'
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    LOADING: false,
    SERVER_URL : '',
    USER_ID :'',
    USERNAME :'',
    TOKEN :'',
    REFRESH :'',
    EMPRESA : '',
    CLIAPP : '',
  }),

  actions: {
    async login(username, password) {
        const { mutate: userLogin,onDone, onError } = await  useMutation(gql`
            mutation userLogin($username: String!, $password: String!) {
                userLogin(username: $username,password: $password) {
                        id
                        username
                        token
                        refresh
                    }
                }
        `,
        { variables: {username:username,password:password}},
    );
    },
  },
})