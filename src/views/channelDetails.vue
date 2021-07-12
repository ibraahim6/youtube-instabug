<template>
  <div>
    <div class="container">
      <div class="row justify-center">
        <div :class="isMobile ? 'column' : 'column-10 px-30'">
          <div class="row justify-center">
            <div class="column" v-if="this.channelInfo">
              <div class="container-channel">
                <div class="banner-channel">
                  <img
                    :src="
                      this.channelInfo.items[0].brandingSettings.image
                        ? this.channelInfo.items[0].brandingSettings.image
                            .bannerExternalUrl
                        : 'https://i01.appmifile.com/webfile/globalimg/hd/2017011301/c6-video-bg.jpg'
                    "
                    :alt="this.channelInfo.items[0].snippet.title"
                  />
                </div>
                <div class="row">
                  <div class="avatar-channel">
                    <img
                      :src="
                        this.channelInfo.items[0].snippet.thumbnails.high.url
                      "
                      :alt="this.channelInfo.items[0].snippet.title"
                      :height="
                        this.channelInfo.items[0].snippet.thumbnails.high.height
                      "
                      :width="
                        this.channelInfo.items[0].snippet.thumbnails.high.width
                      "
                    />
                  </div>
                  <div class="info-channel align-center my-20">
                    <div>
                      {{ this.channelInfo.items[0].snippet.title }}
                    </div>
                    <div>
                      {{
                        `${formatNumbersWithKeys(
                          this.channelInfo.items[0].statistics.subscriberCount,
                          2
                        )} subscribers | ${formatNumbersWithKeys(
                          this.channelInfo.items[0].statistics.videoCount,
                          2
                        )} videos`
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="videos.length" class="row">
            <div v-for="(video, idx) in videos" :key="idx" class="column ma-8">
              <div class="card">
                <router-link :to="`/channel/${video.id}`">
                  <div class="card-content w-100">
                    <div :class="`card-thumbnails img-${video.type}`">
                      <img
                        :src="video.snippet.thumbnails.medium.url"
                        :width="video.snippet.thumbnails.medium.width"
                        alt=""
                      />
                      <span class="duration" v-if="video.type == 'video'">
                        {{
                          durationFormat(video.contentDetails.duration)
                        }}</span
                      >
                      <div
                        class="overlay-playlist"
                        v-if="video.type == 'playlist'"
                      >
                        <div class="content">
                          <span>{{ video.contentDetails.itemCount }}</span
                          ><i class="fas fa-stream"></i>
                        </div>
                      </div>
                      <div
                        class="overlay-playall"
                        v-if="video.type == 'playlist'"
                      >
                        <div class="content">
                          <i class="fas fa-play"></i> <span>PLAY ALL</span>
                        </div>
                      </div>
                    </div>
                    <div class="card-information">
                      <h3 class="card-title">
                        {{ video.snippet.title }}
                      </h3>
                      <!-- video -->
                      <div v-if="video.type === 'video'">
                        <h5 class="card-data">
                          <router-link
                            :to="`/channel/${video.snippet.channelId}`"
                          >
                            <span class="channel-title">
                              <bdi>
                                {{ `${video.snippet.channelTitle}` }}
                              </bdi>
                            </span>
                          </router-link>
                          <span v-if="isMobile">
                            {{
                              `${formatNumberWithCommas(
                                video.statistics.viewCount,
                                2
                              )} views`
                            }}
                          </span>
                          <span v-else>
                            |
                            {{
                              `${formatNumbersWithKeys(
                                video.statistics.viewCount,
                                2
                              )} | ${timeAgo(video.snippet.publishedAt)}`
                            }}
                          </span>
                        </h5>
                        <p class="card-description" v-if="!isMobile">
                          {{ video.snippet.description }}
                        </p>
                      </div>
                      <div v-if="video.type === 'channel'">
                        <h5 class="card-data">
                          <span v-if="isMobile">
                            <span class="d-block">
                              {{
                                `${formatNumbersWithKeys(
                                  video.statistics.subscriberCount,
                                  2
                                )} subscribers`
                              }}
                            </span>
                            <span class="d-block">
                              {{
                                `${formatNumbersWithKeys(
                                  video.statistics.videoCount,
                                  2
                                )} videos`
                              }}
                            </span>
                          </span>
                          <span v-else>
                            {{
                              `${formatNumbersWithKeys(
                                video.statistics.subscriberCount,
                                2
                              )} subscribers | ${formatNumbersWithKeys(
                                video.statistics.videoCount,
                                2
                              )} videos`
                            }}
                          </span>
                        </h5>
                        <p class="card-description">
                          {{ video.snippet.description }}
                        </p>
                      </div>
                      <div v-if="video.type === 'playlist'">
                        <h5 class="card-data">
                          <router-link
                            :to="`/channel/${video.snippet.channelId}`"
                          >
                            <span class="channel-title">
                              <bdi>
                                {{ `${video.snippet.channelTitle}` }}
                              </bdi>
                            </span>
                          </router-link>
                        </h5>

                        <p
                          class="card-description"
                          v-for="(videoItem, idx) in video.listItems.slice(
                            0,
                            isMobile ? 1 : 2
                          )"
                          :key="idx"
                        >
                          {{ videoItem.snippet.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div
            v-else-if="!videos.length && loadState && loadBar"
            class="row justify-center my-20"
          >
            No Videos Found
          </div>
          <div v-if="isMobile">
            <button
              :disabled="loadState"
              class="mobile-btn-loader w-100"
              v-if="
                videos.length &&
                (!searchObj.options.q || searchObj.options.pageToken)
              "
              @click="fetchData"
            >
              <div v-if="loadState" class="mobile-scroll-loader">
                <div class="circle1 circle"></div>
                <div class="circle2 circle"></div>
                <div class="circle3 circle"></div>
                <div class="circle4 circle"></div>
                <div class="circle5 circle"></div>
                <div class="circle6 circle"></div>
                <div class="circle7 circle"></div>
                <div class="circle8 circle"></div>
                <div class="circle9 circle"></div>
                <div class="circle10 circle"></div>
                <div class="circle11 circle"></div>
                <div class="circle12 circle"></div>
              </div>
              <span v-else> Show More Items </span>
            </button>
            <div v-else-if="videos.length" class="row justify-center my-20">
              <span>No More Results.</span>
            </div>
          </div>
          <div v-else>
            <intersection-observer
              v-if="
                videos.length &&
                (!searchObj.options.q || searchObj.options.pageToken)
              "
              @loadMore="fetchData"
            />

            <div v-else-if="videos.length" class="row justify-center my-20">
              <span>No More Results.</span>
            </div>
            <div v-if="loadState" class="desktop-scroll-loader">
              <div></div>
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
  components: {
    IntersectionObserver: () => import("@/components/infiniteScroll"),
  },
  watch: {
    id(val) {
      this.channelID = val;
    },
    channelID() {
      this.search();
    },
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    playlistIdx: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      readMore: false,
      loadState: false,
      loadBar: false,
      videos: [],
      pageToken: "",
      show: false,
      parts: {
        video: {
          part: "id,snippet,statistics,contentDetails",
        },
        channel: {
          part: "id,snippet,statistics",
        },
        playlist: {
          part: "id,snippet,contentDetails",
        },
        playlistItem: {
          part: "id,snippet",
        },
      },

      searchObj: {
        type: "search",
        options: {
          part: "id",
          channelId: this.id,
          maxResults: "3",
          //   regionCode: "eg",
          pageToken: "",
          order: "date",
        },
      },

      videoInfo: null,
      channelInfo: null,
      listVideos: [],
      idx: 1,
    };
  },
  created() {
    this.fetchInfo();
  },
  computed: {},
  methods: {
    async fetchInfo() {
      apiClient
        .get(`/channels?part=brandingSettings,snippet,statistics&id=${this.id}`)
        .then((res) => {
          this.channelInfo = res.data;
          this.fetchData();
          this.loadState = false;
        });
    },
    async fetchData() {
      let obj = Object.assign({}, this.searchObj);
      this.loadState = true;
      setTimeout(() => {
        let queryStr = "";
        let keys = Object.keys(obj.options);
        Object.entries(obj.options).forEach(
          ([key, value], idx) =>
            (queryStr = queryStr + `${key}=${value}${keys[idx + 1] ? "&" : ""}`)
        );
        apiClient.get(`/${obj.type}?${queryStr}`).then((res) => {
          res.data.items.map((item) => {
            apiClient
              .get(
                `/${this.returnType(item.id.kind)}s?part=${
                  this.parts[this.returnType(item.id.kind)].part
                }&id=${item.id[this.returnType(item.id.kind) + "Id"]}`
              )
              .then((res2) => {
                res2.data.items.map((item2) => {
                  if (this.returnType(item.id.kind) === "playlist") {
                    apiClient
                      .get(
                        `/playlistItems?part=${
                          this.parts.playlistItem.part
                        }&playlistId=${
                          item.id[this.returnType(item.id.kind) + "Id"]
                        }`
                      )
                      .then((res3) => {
                        this.videos.push({
                          ...item2,
                          type: this.returnType(item.id.kind),
                          listItems: res3.data.items,
                        });
                      });
                  } else {
                    this.videos.push({
                      ...item2,
                      type: this.returnType(item.id.kind),
                    });
                  }
                });

                this.loadState = false;
              });
          });
          obj.options.pageToken = res.data.nextPageToken
            ? res.data.nextPageToken
            : "";
        });
      }, 700);
    },

    formatDate(date) {
      return new Date(date).toString().slice(4, 16);
    },
    returnQuery() {
      if (this.videoInfo.items[0].kind.includes("video")) {
        return `search?part=id&relatedToVideoId=${this.videoInfo.items[0].id}&type=video&maxResults=2&pageToken=${this.pageToken}`;
      } else {
        return `playlistItems?part=id,snippet&playlistId=${this.videoInfo.items[0].id}&maxResults=2&pageToken=${this.pageToken}`;
      }
    },
    fetchListVideos() {
      this.loadState = true;
      setTimeout(() => {
        apiClient.get(`/${this.returnQuery()}`).then((res3) => {
          this.pageToken = res3.data.nextPageToken
            ? res3.data.nextPageToken
            : "";
          res3.data.items.map((item) => {
            apiClient
              .get(
                `/videos?part=id,snippet,statistics,contentDetails&id=${
                  this.type == `video`
                    ? item.id.videoId
                    : item.snippet.resourceId.videoId
                }`
              )
              .then((res4) => {
                res4.data.items.map((item2) => {
                  this.type == `video`
                    ? this.listVideos.push({
                        ...item2,
                        type: "video",
                      })
                    : this.listVideos.push({
                        ...item2,
                        idx: this.idx,
                        type: "video",
                      });
                  this.idx++;
                });
                this.loadState = false;
              });
          });
        });
      }, 700);
    },
  },
  metaInfo() {
    return {
      title: `${
        this.channelInfo ? this.channelInfo.items[0].snippet.title : ""
      } - YouTube`,
    };
  },
};
</script>
<style lang="scss">
.container-video {
  width: 100%;
  height: 480px;
  margin-bottom: 20px;
}
.h-60 {
  height: 60px;
  max-height: 60px;
}
.h-auto {
  height: auto;
  max-height: auto;
}
.four-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.all-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.container-channel {
  position: relative;
}
.banner-channel {
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    object-fit: cover;
  }
}
.container-channel {
  .avatar-channel {
    position: relative;
    bottom: 30px;
    margin-inline: 10px;
  }
}
</style>
