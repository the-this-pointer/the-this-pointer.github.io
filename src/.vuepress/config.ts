import { defineUserConfig } from 'vuepress'
import KnznTheme from 'vuepress-theme-knzn'
import { particlesOptions } from './particlesOptions'

export default defineUserConfig({
  lang: 'en-US',
  title: 'This Ptr <Personal Blog/>',
  description: 'Reza Kiani\'s Personal Blog',
  dest: './docs',
  // debug: true,
  theme: KnznTheme({
    backgroundImage: '/images/bg.jpg',
    darkBackgroundImage: '/images/bg-dark.jpg',
    darkPostImage: '/images/post-dark.svg',
    particlesOptions,

    blogger: 'Reza Kiani',
    slogan: 'Personal Blog And Programming Notes.',
    avatar: '/images/avatar.jpg',
    darkAvatar: '/images/avatar-dark.jpg',
    medias: [
      { link: 'mailto:rkm7232@gmail.com', icon: 'email' },
      { link: 'https://github.com/rkm7232/', icon: 'github' },
    ],
	beian: 'With ❤️ From Iran',
    perPage: 10,
    maxCategories: 6,
    maxTags: 10,
	navbar: [],
    siteStartDate: '2022'
  }),
})
