<template>
    <div>
        <h3>Componente Base1</h3>

        <p>
        <router-link :to="{ name: 'cb1.ca1'}">Componente A1</router-link>
        <router-link to="/componenteBase1/component-b1">Componente B1</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>