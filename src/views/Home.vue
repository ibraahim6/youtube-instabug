<template>
  <div class="home">
    <div v-for="video in videos" :key="video">
      <pre>
      {{video}}
      </pre>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/config";
export default {
  name: "Home",
  components: {
  },
  data(){
    return{
      videos:[]
    };
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      apiClient
            .get(
              `/search?part=snippet&q=spongebob`
            )
            .then((res) => {
              this.videos = res.data;
            });
    }
  },
};
</script>
