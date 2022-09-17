<template>
    <div class="row container-page">
      <div class="col-12 col-sm-12 col-md-8 col-lg-8">
        <q-carousel animated infinite autoplay v-model="slide" swipeable  height="100vh" class="bg-purple text-white" >
            <q-carousel-slide name="inicio" class="column no-wrap " img-src="https://cdn.quasar.dev/img/mountains.jpg">
                <div class="q-mt-md text-center">  </div>
            </q-carousel-slide>
            <q-carousel-slide name="tv" class="column no-wrap flex-center" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
                <div class="q-mt-md text-center"></div>
            </q-carousel-slide>
            <q-carousel-slide name="layers" class="column no-wrap flex-center" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="q-mt-md text-center">
                </div>
            </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4">
        <q-form class="row full-height justify-center items-center" @submit.prevent="login">
            <q-card class="full-width q-pa-md no-shadow">
                <q-card-section class="flex justify-center items-center column">
                    <q-img src="/imgs/logo.png" style="max-width: 25em"></q-img>
                    <span class="text-h5 text-weight-bold q-mt-md" >Entre com seus dados</span>
                </q-card-section>
                <q-card-section>
                    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg q-pa-xl">
                        <q-input  v-model="username"  label="Usuário"  type="text" v-bind="{ ...$visualInputs}"
                            lazy-rules
                            
                         >
                            <template v-slot:prepend> <q-icon name="person_outline" />  </template>
                        </q-input>
                        <q-input v-model="password" bottom-slots  label="Senha" lazy-rules type="password" v-bind="{ ...$visualInputs}"
                         
                        >
                            <template v-slot:prepend> <q-icon name="lock" /></template>
                        </q-input>
                        <q-btn   label="Login"  color="primary" class="full-width"      type="submit" ></q-btn>
                        <p class="text-blue-8 text-center">Esqueci minha senha </p>
                    </div>
                </q-card-section>
            </q-card>
        </q-form>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from 'stores/user'
import { useMutation  } from '@vue/apollo-composable'
import gql from 'graphql-tag'
const slide = ref('inicio')
const username = ref('')

const password = ref('')
const user = useUserStore()
async function login () {
    const { mutate: userLogin } = useMutation(gql`
            mutation userLogin($username: String!, $password: String!) {
                userLogin(username: $username,password: $password) {
                        id
                        username
                        token
                        refresh
                    }
                }
        `,
        { variables: {username:'master',password:'dev'}},
    );
    await userLogin()
}
</script>
