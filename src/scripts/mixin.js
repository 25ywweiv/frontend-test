export default {
    methods: {
      // NOTE Axios Async/Await Fix Try/Catch
      async awaitAxios(options) {
        try {
         
          const res = await this.axios(options)
          return res.data
        } catch (error) {
          if (error.data !== undefined) return error.data
          else {
            return { code: 400, message: 'Bad Request', data: {}, status: false }
          }
        }
      },
      async getUser(payload) {
        const data = payload
        const params = {
          ...{
          },
          ...data,
        }
        const options = {
          url: `https://randomuser.me/api/`,
          method: 'get',
          params: params,
        }
        return await this.awaitAxios(options)
      },
    },
  }
  