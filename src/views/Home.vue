<template>
  <div class="home">
    <div class="container">
      <div v-if="videos.length" class="row justify-center">
        <div v-for="(video, idx) in videos" :key="idx" class="column ma-8">
          <div class="card">
            <div class="card-content">
              <div class="card-thumbnails">
                <img
                  :src="video.snippet.thumbnails.medium.url"
                  :width="video.snippet.thumbnails.medium.width"
                  alt=""
                />
              </div>
              <div class="card-information">
                <h3 class="card-title">
                  {{ video.snippet.title }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/config";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      videos: [],
    };
  },
  created() {
    this.fetchMostPopular();
  },
  methods: {
    async fetchMostPopular() {
      apiClient
        .get(
          `/videos?part=snippet,statistics,contentDetails&maxResults=50&chart=mostPopular`
        )
        .then((res) => {
          this.videos = res.data.items;
        });
    },
  },
  metaInfo() {
    return {
      title: `YouTube`,
    };
  },
};
</script>
<style lang="scss"></style>
