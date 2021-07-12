export const global = {
  data() {
    return {
      isMobile: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkMobile);
    this.checkMobile();
  },
  destroyed() {
    window.removeEventListener("resize", this.checkMobile);
  },
  watch: {},
  computed: {},
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 500;
    },
    returnType(data) {
      if (data.includes("video")) {
        return "video";
      } else if (data.includes("channel")) {
        return "channel";
      } else {
        return "playlist";
      }
    },
    timeAgo(date) {
      if (date) {
        const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
        if (seconds < 29) return "Just now";
        const intervals = {
          year: 31536000,
          month: 2592000,
          week: 604800,
          day: 86400,
          hour: 3600,
          minute: 60,
          second: 1,
        };
        let count;
        for (const i in intervals) {
          count = Math.floor(seconds / intervals[i]);
          if (count > 0)
            if (count === 1) {
              return count + " " + i + " ago";
            } else {
              return count + " " + i + "s ago";
            }
        }
      }
    },
    formatNumbersWithKeys(num, digits) {
      const arr = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
      ];
      const regx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = arr
        .slice()
        .reverse()
        .find((item) => {
          return num >= item.value;
        });
      return item
        ? (num / item.value).toFixed(digits).replace(regx, "$1") + item.symbol
        : "0";
    },
    formatNumberWithCommas(number) {
      return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    durationFormat(duration) {
      var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
      var hours = 0,
        minutes = 0,
        seconds = 0;
      // let total
      if (reptms.test(duration)) {
        var matches = reptms.exec(duration);
        if (matches[1]) hours = Number(matches[1]);
        if (matches[2]) minutes = Number(matches[2]);
        if (matches[3]) seconds = Number(matches[3]);
      }
      hours = hours.toString().length > 1 ? hours : "0" + hours;
      minutes = minutes.toString().length > 1 ? minutes : "0" + minutes;
      seconds = seconds.toString().length > 1 ? seconds : "0" + seconds;

      return `${
        hours > 0 && minutes && seconds
          ? hours + ":" + minutes + ":" + seconds
          : minutes && seconds
          ? minutes + ":" + seconds
          : seconds
      }`;
    },
    convertUploadedDate() {
      let hour = new Date();
      let today = new Date();
      let week = new Date();
      let month = new Date();
      hour.setHours(hour.getHours() - 1);
      this.uploadDates[1].value = hour.toISOString();
      today.setDate(today.getDate() - 1);
      this.uploadDates[2].value = today.toISOString();
      week.setDate(week.getDate() - 7);
      this.uploadDates[3].value = week.toISOString();
      month.setMonth(month.getMonth() - 1);
      this.uploadDates[4].value = month.toISOString();
    },
  },
};
