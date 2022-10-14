<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">
        返回首页
      </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = [
  `什么都没有.`,
  `在吗到这里的?`,
  `那是404`,
  `找不到我们需要的连接`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
