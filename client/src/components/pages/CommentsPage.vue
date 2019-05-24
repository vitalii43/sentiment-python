<template>
<div>
    <div class="container root">    
      <button class="btn btn-primary get-sentiment" v-on:click="getSentiment">get sentiment</button>
      
      <div v-if="comments" class="comment-list row">
         <div class="comment col-lg-6 col-md-12" v-for="(comment, index) in comments" :key="index">
            <div class="comment__author">{{comment.author}}</div>
            <div class="comment__root">{{comment.root}}</div>
            <div v-bind:class="{ 'neg-sent': sentiments[index]=='neg', 'pos-sent':sentiments[index]=='pos' }" v-if="sentiments[index]">{{sentiments[index]}}</div>
          </div>
         <div class="w-100"></div>
      </div>

    </div>
</div>
</template>

<script>
  import CommentsService from '@/services/CommentsService'
  import commentsJson from './comments.json'
  export default {
    name: 'CommentsPage',
    data () {
      return {
        comments: commentsJson.res.comments,
        sentiments: [],
        videoUrl: ''
      }
    },
    methods: {
      async getSentiment () {
        const sentiments = await CommentsService.fetchSentiment(this.comments)
        this.sentiments = sentiments.data
      }

    },
    mounted () {
      //this.getComments()
    }
  }
</script>

<style>
  .comment{
    padding:1em;
  }
  .comment__author{
      font-size: 1.5em;
      position: relative;
  }
  
  .comment__author::before{
    content:'author :';
    position: absolute;
    transform: translate(-130%);
    top:0.2em;
    font-size:0.65em;
    opacity:0.7; 
  }
  .comment__root::before{
    content: 'content :';
    position: absolute;
    transform: translate(-130%);
    opacity:0.7; 
  }

  .root{
    display:flex;
    flex-direction: column
  }
  .get-sentiment{
    width: fit-content;
    display: block;
    align-self: center;
  }
  .pos-sent{
    color: green;
  }
  .neg-sent{
    color: red;
  }
  .neg-sent::before,
  .pos-sent::before{
    content:'sentiment :';
    position: absolute;
    transform: translate(-130%);
    color:black;
  }
</style>