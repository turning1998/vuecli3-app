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
import MovieDetail from './views/movie/MovieDetail.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Movie,
      redirect: '/movie',
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie,
    },
    {
      path: '/moviedetail/:movieId',
      name: 'moviedetail',
      component: MovieDetail,
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
      path: '/moviedetail',
      name: 'moviedetail',
      component: MovieDetail,
    },
    {
      path: '/photo',
      name: 'photo',
      component: Photo,
    },
  ],
});
