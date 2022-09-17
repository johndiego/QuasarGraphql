import { boot } from 'quasar/wrappers'
import { LocalStorage,Notify} from "quasar";
import axios from 'axios'

const api = axios.create()

export default boot(({ app ,router }) => {
  const servidor = LocalStorage.getItem('servidor') || "" 
  app.config.globalProperties.$axios = axios
  if (servidor !== null) {
    api.defaults.baseURL= 'http://172.20.0.95:9100'  
  }
  app.config.globalProperties.$api = api
  api.interceptors.request.use(function (config) {
    const user = LocalStorage.getItem('user');
    if (user !== null) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response) {
      switch (error.response.status) {
        case  401 :
          // router.replace({name:"login"})
          Notify.create({
            message: `Sem permissão pra executar a ação`,
            position: 'top',
            color: "negative",
            icon: 'announcement'
          });
        case  404 :
            Notify.create({
              message: `Recurso não disponivel /  encontrado no servidor`,
              position: 'top',
              color: "primary",
              icon: 'announcement'
            });
            // router.replace({name:"home"})
      }
    }
    return Promise.reject(error);
  });
})
export { api }