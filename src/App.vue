<template>
  <div>  
    <h1>Principal</h1>    
    <p>
      <router-link :to="{ name: 'books' }">Books</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>