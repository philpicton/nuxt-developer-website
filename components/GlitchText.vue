<script setup lang="ts"></script>

<template>
    <div class="glitch-text">
        <slot />
    </div>
</template>

<style scoped>
.glitch-text {
    position: relative;
    animation: glitch-skew 1s infinite;
}
@keyframes glitch-skew {
    0% {
        transform: skew(0deg);
    }
    10% {
        transform: skew(-1deg);
    }
    20% {
        transform: skew(2deg);
    }
    30% {
        transform: skew(-2deg);
    }
    40% {
        transform: skew(1deg);
    }
    50% {
        transform: skew(-1deg);
    }
    60% {
        transform: skew(0deg);
    }
    70% {
        transform: skew(1deg);
    }
    80% {
        transform: skew(-1deg);
    }
    90% {
        transform: skew(2deg);
    }
    100% {
        transform: skew(0deg);
    }
}
</style>
