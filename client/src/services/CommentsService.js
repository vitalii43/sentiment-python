import api from '@/services/api'
export default {
  fetchSentiment (comData) {
    return api().post('comments',{
      commentsData: comData
    })
  }
}