<template>
<div>
    <div>    
      <form @submit.prevent="getData">
        <input type="text" v-model='videoUrl'>
        <button>get sentiment</button>
      </form>
      <div v-if="comments">
         <div v-for="(comment, index) in comments" :key="index">
            {{comment.title}}---{{comment.root}}
         </div>
      </div>      
      <button v-on:click="getData()">get data to console</button>
    </div>
</div>
</template>
<script>
  import CommentsService from '@/services/CommentsService'
  export default {
    name: 'CommentsPage',
    data () {
      return {
        comments: [],
        videoUrl: ''
      }
    },
    methods: {
      getData(){
          if(this.videoUrl){
            this.getComments(this.videoUrl)
          }
      },
      async getComments () {
        const response = await CommentsService.fetchComments(this.videoUrl)
        console.log((response))
        this.comments = JSON.stringify(response.data);
      }
    },
    mounted () {
      //this.getComments()
    }
  }
</script>