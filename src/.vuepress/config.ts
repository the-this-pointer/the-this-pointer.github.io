import { defineUserConfig } from 'vuepress'
import KnznTheme from 'vuepress-theme-knzn'
import katexPlugin from '@renovamen/vuepress-plugin-katex'
import { particlesOptions } from './particlesOptions'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Rsomething <Personal Blog/>',
  description: 'Rsomething\'s Personal Blog',
  dest: './docs',
  plugins: [
    katexPlugin()
  ],
  // debug: true,
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-2R87B0XZCL',
      },
    ],
    [
      'script',
      {},
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-2R87B0XZCL');
      `,
    ]
  ],
  theme: KnznTheme({
    backgroundImage: '/images/bg.jpg',
    darkBackgroundImage: '/images/bg-dark.jpg',
    darkPostImage: '/images/post-dark.svg',
    particlesOptions,

    blogger: 'Rsomething',
    slogan: 'Personal Blog And Programming Notes.',
    avatar: '/images/avatar.jpg',
    darkAvatar: '/images/avatar-dark.jpg',
    medias: [
      { link: 'mailto:www.rkiani@gmail.com', icon: 'email' },
      { link: 'https://github.com/the-this-pointer/', icon: 'github' },
    ],
	beian: 'With ❤️ From Iran',
  beianUrl: 'https://the-this-pointer.github.io',
  perPage: 10,
  maxCategories: 6,
  maxTags: 10,
	navbar: [],
    siteStartDate: '2022'
  }),
})
