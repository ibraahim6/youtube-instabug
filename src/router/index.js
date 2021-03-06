import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "MainLayout",
    component: () => import("@/layouts/mainLayout"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/:q",
        props: true,
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/video/:type/:id/:playlistIdx",
        props: true,
        name: "videoDetails",
        component: () => import("@/views/videoDetails.vue"),
      },
      {
        path: "/channel/:id",
        props: true,
        name: "channelDetails",
        component: () => import("@/views/channelDetails.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
