import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line import/no-unresolved
import Book from '@/views/book/Book.vue';
// eslint-disable-next-line import/no-unresolved
import Movie from '@/views/movie/Movie.vue';
// eslint-disable-next-line import/no-unresolved
import Music from '@/views/music/Music.vue';
// eslint-disable-next-line import/no-unresolved
import Photo from '@/views/photo/Photo.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Movie,
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie,
    },
    {
      path: '/book',
      name: 'book',
      component: Book,
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
    },
    {
      path: '/photo',
      name: 'photo',
      component: Photo,
    },
  ],
});
