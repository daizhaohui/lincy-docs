const sidebar = {
  vue: [
    {
      title: '基础',
      collapsable: false,
      children: [
        '/docs/vue/installation',
        '/docs/vue/introduction',
      ]
    },
    {
      title: '高阶指南',
      collapsable: false,
      children: [
        '/docs/vue/app-cycle',  
        '/docs/vue/router',  
        '/docs/vue/state', 
        '/docs/vue/http',
        '/docs/vue/multi-language',
        '/docs/vue/layout', 
        '/docs/vue/style',  
        '/docs/vue/theme',  
        '/docs/vue/tools',
        '/docs/vue/authority',
        '/docs/vue/track',
        '/docs/vue/app-config',  
        '/docs/vue/plugins',  
        '/docs/vue/directives',
        '/docs/vue/mock',
      ]
    },
    {
      title: '规范',
      collapsable: false,
      children: [
        '/docs/vue/standard/project',
        '/docs/vue/standard/release'
      ]
    },
    {
      title: '构建',
      collapsable: false,
      children: [
        '/docs/vue/cli/config',
        '/docs/vue/cli/tools'
      ]
    },
    {
      title: '桌面H5 Demo',
      collapsable: false,
      children: [
        '/docs/vue/demo/pc/introduce',
        '/docs/vue/demo/pc/api',
        '/docs/vue/demo/pc/config',
        '/docs/vue/demo/pc/components',
        '/docs/vue/demo/pc/locales',
        '/docs/vue/demo/pc/model',
        '/docs/vue/demo/pc/pages',
        '/docs/vue/demo/pc/plugins',
        '/docs/vue/demo/pc/state',
        '/docs/vue/demo/pc/themes',
        '/docs/vue/demo/pc/utils'
      ]
    },
    {
      title: '移动端H5 Demo',
      collapsable: false,
      children: [
        '/docs/vue/demo/mobile/introduce',
        '/docs/vue/demo/mobile/api',
        '/docs/vue/demo/mobile/config',
        '/docs/vue/demo/mobile/components',
        '/docs/vue/demo/mobile/locales',
        '/docs/vue/demo/mobile/model',
        '/docs/vue/demo/mobile/pages',
        '/docs/vue/demo/mobile/plugins',
        '/docs/vue/demo/mobile/state',
        '/docs/vue/demo/mobile/themes',
        '/docs/vue/demo/mobile/utils'
      ]
    }
  ],
  ssr:[
    {
      title: 'SSR(服务端渲染)',
      collapsable: false,
      children: [
        '/docs/ssr/introduction'
      ]
    },
  ],
  commonjs:[
    {
      title: '工具方法(utils)',
      collapsable: false,
      children: [
        '/docs/commonjs/utils/string',
        '/docs/commonjs/utils/number',
        '/docs/commonjs/utils/date',
        '/docs/commonjs/utils/tree',
        '/docs/commonjs/utils/url',
        '/docs/commonjs/utils/debounce',
        '/docs/commonjs/utils/md5',
      ]
    },
  ]
}

module.exports = {
  base: '/lincy_frontend_docs/',
  title: 'lincy',
  description: 'lincy前端复用资产',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: 'Vue',
        ariaLabel: '文档菜单',
        items: [
          {
            text: '教程',
            link: '/docs/vue/introduction'
          },
          {
            text: 'CLI',
            link: '/docs/vue/cli/config'
          },
          {
            text: '扩展库',
            link: '/docs/vue/exten/common'
          },
          {
            text: 'demo',
            link: '/docs/vue/demo/desktop'
          }
        ]
      },
      {
        text: 'SSR(服务端渲染)',
        items: [
          {
            text: '教程',
            link: '/docs/ssr/introduction'
          },
        ]
      },
      {
        text: 'Miniprogram(小程序)',
        items: [
          {
            text: '教程',
            link: '/docs/minprogram/introduction'
          },
        ]
      },
      {
        text: 'JS(跨端通用库)',
        items: [
          {
            text: '工具方法(utils)',
            link: '/docs/commonjs/utils/string'
          },
        ]
      },
      {
        text: 'ReactNative(App)',
        items: [
          {
            text: '教程',
            link: '/docs/reactnative/introduction'
          },
        ]
      }
    ],
    editLinks: false,
    lastUpdated: 'Last updated',
    docsDir: 'src',
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/docs/vue/contributing/': sidebar.contributing,
      '/docs/vue/': sidebar.vue,
      '/docs/community/': sidebar.vue,
      '/docs/commonjs/': sidebar.commonjs
    },
    smoothScroll: false,
    // algolia: {
    //   indexName: 'vuejs_cn3',
    //   apiKey: '773de665ca11d74cede4e35ecff46931'
    // },
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: '新内容可用',
            buttonText: '刷新'
          }
        }
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  }
}
