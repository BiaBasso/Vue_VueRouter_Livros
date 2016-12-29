<template>
<div>
    <h2>Books</h2>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <router-link :to="{ name: 'books.list'}">Lista</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <router-link :to="{ name: 'books.create'}">Criação</router-link>
        </el-menu-item>
    </el-menu>
    <router-view></router-view>
</div>
</template>

<script>
  export default {
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>