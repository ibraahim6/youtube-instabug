<template>
  <div class="home">
    <div class="container">
      <header id="second-header">
        <div class="container">
          <div v-if="searchObj.options.q">
            <div v-if="isMobile">
              <select
                class="select-style"
                @change="
                  selectType({
                    type: filter.type,
                    idx: -1,
                    field: 'type',
                    value: filter.type.value,
                  })
                "
                v-model="filter.type"
                name="types"
              >
                <option v-for="(type, idx) in types" :key="idx" :value="type">
                  {{ type.text }}
                </option>
              </select>
              <select
                class="select-style"
                @change="
                  selectDate({
                    date: filter.date,
                    idx: -1,
                    field: 'publishedAfter',
                    value: filter.date.value,
                  })
                "
                v-model="filter.date"
                name="types"
              >
                <option
                  v-for="(date, idx) in uploadDates"
                  :key="idx"
                  :value="date"
                >
                  {{ date.text }}
                </option>
              </select>
            </div>
            <div v-else class="row space-between align-center">
              <span
                >About {{ formatNumberWithCommas(totalResults) }} results</span
              >
              <button class="btn-icon" type="button" @click="toggleCollapse">
                <i class="fas fa-filter"></i>
                <span class="mx-5">Filter</span>
              </button>
            </div>

            <transition name="fade" mode="in-out">
              <div class="container my-20" v-if="show">
                <div class="row space-between">
                  <div class="column-4">
                    UPLOAD DATE
                    <hr />
                    <div
                      class="column ma-8"
                      v-for="(date, idx) in uploadDates"
                      :key="idx"
                    >
                      <span
                        class="space-between cursor-pointer"
                        :class="
                          date.isSelected ? 'select-text' : 'unselect-text'
                        "
                        @click="
                          selectDate({
                            date: date,
                            idx: idx,
                            field: 'publishedAfter',
                            value: date.value,
                          })
                        "
                      >
                        {{ date.text }}
                        <i
                          class="fas fa-times"
                          v-if="date.isSelected"
                          @click="
                            selectDate({
                              date: date,
                              idx: idx,
                              field: 'publishedAfter',
                              value: date.value,
                            })
                          "
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div class="column-4">
                    TYPE
                    <hr />
                    <div
                      class="column ma-8"
                      v-for="(type, idx) in types"
                      :key="idx"
                    >
                      <span
                        class="space-between cursor-pointer"
                        :class="
                          type.isSelected ? 'select-text' : 'unselect-text'
                        "
                        @click="
                          selectType({
                            type: type,
                            idx: idx,
                            field: 'type',
                            value: type.value,
                          })
                        "
                      >
                        {{ type.text }}
                        <i
                          class="fas fa-times"
                          v-if="type.isSelected"
                          @click="
                            selectType({
                              type: type,
                              idx: idx,
                              field: 'type',
                              value: type.value,
                            })
                          "
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div class="column-4">
                    SORT BY
                    <hr />
                    <div
                      class="column ma-8"
                      v-for="(sort, idx) in sorts"
                      :key="idx"
                    >
                      <span
                        class="space-between cursor-pointer"
                        :class="
                          sort.isSelected ? 'select-text' : 'unselect-text'
                        "
                        @click="
                          selectSort({
                            sort: sort,
                            idx: idx,
                            field: 'order',
                            value: sort.value,
                          })
                        "
                      >
                        {{ sort.text }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <hr />
          </div>
          <div v-else>Trending Videos</div>
        </div>
      </header>
      <div v-if="videos.length" class="row justify-center">
        <div v-for="(video, idx) in videos" :key="idx" class="column ma-8">
          <div class="card">
            <router-link
              :to="
                video.type == 'channel'
                  ? `/channel/${video.id}`
                  : video.type == 'playlist'
                  ? `/video/playlist/${video.id}/1`
                  : `/video/video/${video.id}/0`
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
                    {{ durationFormat(video.contentDetails.duration) }}</span
                  >
                  <div class="overlay-playlist" v-if="video.type == 'playlist'">
                    <div class="content">
                      <span>{{ video.contentDetails.itemCount }}</span
                      ><i class="fas fa-stream"></i>
                    </div>
                  </div>
                  <div class="overlay-playall" v-if="video.type == 'playlist'">
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
                      <router-link :to="`/channel/${video.snippet.channelId}`">
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
                    <p v-if="!isMobile" class="card-description">
                      {{ video.snippet.description }}
                    </p>
                  </div>
                  <div v-if="video.type === 'playlist'">
                    <h5 class="card-data">
                      <router-link :to="`/channel/${video.snippet.channelId}`">
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
          @click="fetchSearch"
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
          @loadMore="fetchSearch"
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
</template>

<script>
import { apiClient } from "@/config";
export default {
  name: "Home",
  components: {
    IntersectionObserver: () => import("@/components/infiniteScroll"),
  },
  watch: {
    q(val) {
      this.searchObj.options.q = val;
    },
    "searchObj.options.q"() {
      this.search();
    },
  },
  props: {
    q: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      filter: {
        type: {
          text: "All",
          value: "any",
          isSelected: false,
        },
        date: {
          text: "Any Time",
          value: "1970-01-01T00:00:00Z",
          isSelected: false,
        },
      },
      // type: "any",
      loadState: true,
      loadBar: false,
      videos: [],
      channelImgs: [],
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
      defaultObj: {
        type: "videos",
        options: {
          part: "snippet,statistics,contentDetails",
          maxResults: "5",
          regionCode: "eg",
          chart: "mostPopular",
          pageToken: "",
        },
      },
      searchObj: {
        type: "search",
        options: {
          part: "id",
          q: this.q,
          type: "any",
          maxResults: "5",
          regionCode: "eg",
          pageToken: "",
          order: "relevance",
          publishedAfter: "1970-01-01T00:00:00Z",
        },
      },
      totalResults: 0,
      uploadDates: [
        {
          text: "Any Time",
          value: "1970-01-01T00:00:00Z",
          isSelected: false,
        },
        {
          text: "Last Hour",
          value: null,
          isSelected: false,
        },
        {
          text: "Today",
          value: null,
          isSelected: false,
        },
        {
          text: "This week",
          value: null,
          isSelected: false,
        },
        {
          text: "This month",
          value: null,
          isSelected: false,
        },
      ],
      types: [
        {
          text: "All",
          value: "any",
          isSelected: false,
        },
        {
          text: "Video",
          value: "video",
          isSelected: false,
        },
        {
          text: "Playlist",
          value: "playlist",
          isSelected: false,
        },
        {
          text: "Channel",
          value: "channel",
          isSelected: false,
        },
      ],
      sorts: [
        {
          text: "Relevance",
          value: "relevance",
          isSelected: true,
        },
        {
          text: "Upload date",
          value: "date",
          isSelected: false,
        },
        {
          text: "View Count",
          value: "viewCount",
          isSelected: false,
        },
        {
          text: "Rating",
          value: "rating",
          isSelected: false,
        },
      ],
    };
  },
  created() {
    this.convertUploadedDate();
    this.fetchSearch();
  },
  methods: {
    fetchSearch() {
      this.searchObj.options.q ? this.fetchData() : this.fetchMostPopular();
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
          this.totalResults = res.data.pageInfo.totalResults;
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
    async fetchMostPopular() {
      let obj = Object.assign({}, this.defaultObj);
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
            this.videos.push({
              ...item,
              type: "video",
            });
          });

          this.loadState = false;
          obj.options.pageToken = res.data.nextPageToken;
        });
      }, 700);
    },
    search() {
      this.videos = [];
      this.searchObj.options.pageToken = "";
      this.totalResults = 0;
      this.loadBar = true;
      this.$emit("loadingBar", true);
      setTimeout(() => {
        this.$emit("loadingBar", false);
      }, 3000);
      this.fetchSearch();
      this.loadState = false;
    },

    toggleCollapse() {
      this.show = !this.show;
    },

    selectDate({ date, idx, field, value }) {
      console.log(date);
      if (date.isSelected) {
        date.isSelected = false;
        this.filterData(field, "1970-01-01T00:00:00Z");
      } else {
        this.uploadDates.map((item) => (item.isSelected = false));
        date.isSelected = true;
        this.filterData(field, value);
      }
      idx >= 0 && this.uploadDates.splice(idx, 1, date);
    },
    selectType({ type, idx, field, value }) {
      console.log(type);
      if (type.isSelected) {
        type.isSelected = false;
        this.filterData(field, "any");
      } else {
        this.types.map((item) => (item.isSelected = false));
        type.isSelected = true;
        this.filterData(field, value);
      }
      idx >= 0 && this.types.splice(idx, 1, type);
    },
    selectSort({ sort, idx, field, value }) {
      this.sorts.map((item) => (item.isSelected = false));
      sort.isSelected = true;
      this.filterData(field, value);
      this.sorts.splice(idx, 1, sort);
    },
    filterData(field, value) {
      this.searchObj.options[field] = value;
      this.searchObj.options.pageToken = "";

      this.show = false;
      this.search();
    },
  },
  metaInfo() {
    return {
      title: `${this.q ? this.q : "Trending Videos"} - YouTube`,
    };
  },
};
</script>
<style lang="scss">

</style>
