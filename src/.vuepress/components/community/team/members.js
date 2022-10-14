import { shuffle } from 'lodash'

const members = [
  {
    // name: '戴朝辉',
    // title: 'Senior Architect',
    // city: '上海',
    // languages: ['zh', 'en'],
    // github: 'yyx990803',
    // wechat: '18916666069',
    // work: {
    //   role: 'Creator',
    //   org: 'CST-CSD'
    // },
    // reposOfficial: ['vuejs/*', 'vuejs-templates/*'],
    // links: ['https://www.patreon.com/evanyou']
  }
].concat(
  shuffle([
    // {
    //   name: 'Eduardo',
    //   title: 'Real-Time Rerouter',
    //   city: 'Paris, France',
    //   languages: ['es', 'fr', 'en'],
    //   github: 'posva',
    //   twitter: 'posva',
    //   work: {
    //     role: 'Freelance Developer & Consultant'
    //   },
    //   reposOfficial: ['vuefire', 'vue-router'],
    //   reposPersonal: ['vuex-mock-store', 'vue-promised', 'vue-motion'],
    //   links: ['https://www.patreon.com/posva']
    // }
  ])
)

export default members
