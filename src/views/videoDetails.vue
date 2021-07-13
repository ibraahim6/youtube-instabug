<template>
  <div>
    <div class="container-video">
      <iframe :src="videoUrl" frameborder="0" allowFullScreen></iframe>
    </div>

    <div class="container">
      <div class="row justify-center">
        <div v-if="videoInfo && channelInfo" class="column-10 px-30">
          <div class="row space-between">
            <!-- <div class="row"> -->
            <h3 class="w-90">
              {{
                `${
                  type == "video"
                    ? videoInfo.items[0].snippet.title
                    : listVideos[playlistIdx - 1] &&
                      listVideos[playlistIdx - 1].snippet.title
                }`
              }}
            </h3>
            <button
              class="btn-transparent"
              v-if="isMobile"
              @click="readMore = !readMore"
            >
              <i :class="`fas fa-sort-${readMore ? 'up' : 'down'}`"></i>
            </button>
          </div>

          <div class="row" id="container-statistics">
            <div class="column">
              <div class="row space-between align-center">
                <span class="row space-between" :class="isMobile && 'w-100'">
                  <span class="">
                    {{
                      `${
                        type == "video"
                          ? formatNumberWithCommas(
                              videoInfo.items[0].statistics.viewCount
                            )
                          : formatNumberWithCommas(
                              listVideos[playlistIdx - 1].statistics.viewCount
                            )
                      }`
                    }}
                    views
                  </span>
                  <span class="mx-5" v-if="!isMobile"> • </span>
                  <span>
                    {{
                      `${
                        type == "video"
                          ? formatDate(videoInfo.items[0].snippet.publishedAt)
                          : formatDate(
                              listVideos[playlistIdx - 1] &&
                                listVideos[playlistIdx - 1].snippet.publishedAt
                            )
                      }`
                    }}
                  </span>
                </span>
                <span
                  class="row space-between my-10"
                  :class="isMobile && 'w-100'"
                >
                  <button class="btn-icon" :class="isMobile ? 'flex-col' : ''">
                    <i class="far fa-thumbs-up"></i>
                    <span class="mx-5">
                      {{
                        `${
                          type == "video"
                            ? formatNumbersWithKeys(
                                videoInfo.items[0].statistics.likeCount
                              )
                            : formatNumbersWithKeys(
                                listVideos[playlistIdx - 1].statistics.likeCount
                              )
                        }`
                      }}
                    </span>
                  </button>
                  <button class="btn-icon" :class="isMobile ? 'flex-col' : ''">
                    <i class="far fa-thumbs-down"></i>
                    <span class="mx-5">
                      {{
                        `${
                          type == "video"
                            ? formatNumbersWithKeys(
                                videoInfo.items[0].statistics.dislikeCount
                              )
                            : formatNumbersWithKeys(
                                listVideos[playlistIdx - 1].statistics
                                  .dislikeCount
                              )
                        }`
                      }}
                    </span>
                  </button>
                  <button class="btn-icon" :class="isMobile ? 'flex-col' : ''">
                    <i class="far fa-share-square"></i>
                    <span class="mx-5"> share </span>
                  </button>
                  <button class="btn-icon" :class="isMobile ? 'flex-col' : ''">
                    <i class="fas fa-plus"></i>
                    <span class="mx-5"> save </span>
                  </button>
                </span>
              </div>
              <hr />
            </div>
            <div class="column">
              <div class="row align-flex-start">
                <div class="avatar-channel mr-15">
                  <img
                    :src="channelInfo.items[0].snippet.thumbnails.medium.url"
                    :height="
                      channelInfo.items[0].snippet.thumbnails.medium.height
                    "
                    :width="
                      channelInfo.items[0].snippet.thumbnails.medium.width
                    "
                    alt=""
                  />
                </div>
                <div class="info-channel">
                  <router-link :to="`/channel/${channelInfo.items[0].id}`">
                    <span> {{ `${channelInfo.items[0].snippet.title}` }}</span>
                  </router-link>

                  <p>
                    {{
                      `${formatNumbersWithKeys(
                        channelInfo.items[0].statistics.subscriberCount
                      )} subscribers`
                    }}
                  </p>
                </div>
                <div v-if="isMobile && readMore" class="description-channel">
                  <hr />
                  <pre>
                        {{
                      `${
                        type == "video"
                          ? videoInfo.items[0].snippet.description
                          : listVideos[playlistIdx - 1] &&
                            listVideos[playlistIdx - 1].snippet.description
                      }`
                    }}
                    </pre
                  >
                </div>
                <div
                  v-if="!isMobile"
                  class="description-channel"
                  :class="readMore ? 'all-lines' : 'four-lines'"
                >
                  <pre>
                        {{
                      `${
                        type == "video"
                          ? videoInfo.items[0].snippet.description
                          : listVideos[playlistIdx - 1] &&
                            listVideos[playlistIdx - 1].snippet.description
                      }`
                    }}
                    </pre
                  >
                </div>
                <button
                  v-if="!isMobile"
                  @click="readMore = !readMore"
                  class="btn-icon"
                >
                  <span> {{ readMore ? "show less" : "show more" }} </span>
                </button>
              </div>
              <hr />
            </div>
          </div>

          <div v-if="listVideos.length" class="row">
            <div
              v-for="(video, idx) in listVideos"
              :key="idx"
              class="column ma-8"
            >
              <div v-if="video" class="card">
                <router-link
                  :to="
                    video.type == 'channel'
                      ? `/channel/${video.snippet.channelId}`
                      : video.idx > 0
                      ? `/video/playlist/${id}/${video.idx}`
                      : `/video/${video.type}/${video.id}/0`
                  "
                >
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
                      <div>
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
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div
            v-else-if="!listVideos.length && loadState && loadBar"
            class="row justify-center my-20"
          >
            No Videos Found
          </div>
          <div v-if="isMobile">
            <button
              :disabled="loadState"
              class="mobile-btn-loader w-100"
              v-if="listVideos.length && pageToken"
              @click="fetchListVideos"
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
            <div v-else-if="listVideos.length" class="row justify-center my-20">
              <span>No More Results.</span>
            </div>
          </div>
          <div v-else>
            <intersection-observer
              v-if="listVideos.length && pageToken"
              @loadMore="fetchListVideos"
            />

            <div v-else-if="listVideos.length" class="row justify-center my-20">
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
  name: "VideoDetails",
  components: {
    IntersectionObserver: () => import("@/components/infiniteScroll"),
  },
  watch: {
    "$route.params": {
      handler() {
        this.listVideos = [];
        this.pageToken = "";
        this.idx = 1;
        this.loadBar = true;
        this.$emit("loadingBar", true);
        setTimeout(() => {
          this.$emit("loadingBar", false);
        }, 3000);
        this.fetchInfo();
        this.loadState = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      deep: true,
      immediate: true,
    },
    id(val) {
      this.videoId = val;
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
      pageToken: "",
      show: false,
      parts: {
        video: {
          part: "id,snippet,statistics",
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
      videoInfo: {
        items: [
          {
            snippet: {},
          },
        ],
      },
      channelInfo: null,
      listVideos: [
        {
          snippet: {},
        },
      ],
      idx: 1,
    };
  },
  created() {
    this.fetchInfo();
  },
  computed: {
    videoUrl() {
      return `https://www.youtube-nocookie.com/embed${
        this.type == "video" ? `/${this.id}` : ""
      }?${
        this.type == "playlist"
          ? `listType=playlist&list=${this.id}&index=${this.playlistIdx}`
          : ""
      }&autoplay=1&loop=1&modestbranding=1&rel=0&iv_load_policy=3`;
    },
    returnTitle() {
      return `${
        this.type == "video"
          ? this.videoInfo.items[0] && this.videoInfo.items[0].snippet.title
          : this.listVideos[this.playlistIdx - 1] &&
            this.listVideos[this.playlistIdx - 1].snippet.title
      }`;
    },
  },
  methods: {
    async fetchInfo() {
      await apiClient
        .get(`/${this.type}s?part=${this.parts[this.type].part}&id=${this.id}`)
        .then((res) => {
          this.videoInfo = res.data;
          apiClient
            .get(
              `/channels?part=snippet,statistics,brandingSettings&id=${this.videoInfo.items[0].snippet.channelId}`
            )
            .then((res2) => {
              this.channelInfo = res2.data;
              this.fetchListVideos();
              this.loadState = false;
            });
        });
    },
    formatDate(date) {
      return new Date(date).toString().slice(4, 16);
    },
    returnQuery() {
      if (this.videoInfo.items[0].kind.includes("video")) {
        return `search?part=id&relatedToVideoId=${this.videoInfo.items[0].id}&type=video&maxResults=5&pageToken=${this.pageToken}`;
      } else {
        return `playlistItems?part=id,snippet&playlistId=${this.videoInfo.items[0].id}&maxResults=5&pageToken=${this.pageToken}`;
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
            //   if (this.type == "video") {
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
      title: `${this.returnTitle ? this.returnTitle : ""} - YouTube`,
    };
  },
};
</script>
<style lang="scss">
.container-video {
  position: relative;
  width: 100%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
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
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.all-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  //    -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
