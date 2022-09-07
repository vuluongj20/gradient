import axios from 'axios'

const getBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://ner-reg32b3vxq-uc.a.run.app'
    case 'development':
    default:
      return 'http://127.0.0.1:5000'
  }
}

export type ResponseData = { predictions: string[][] }

export default axios.create({
  baseURL: getBaseUrl(),
})
