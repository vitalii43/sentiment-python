import api from '@/services/api'
export default {
  fetchComments (videoUrl) {
    return api().post('comments',{
      videoUrl: videoUrl
    })
  }
}