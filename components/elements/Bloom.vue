<template>
    <div :style="`filter: blur(${bloom[0] / 16}rem); opacity: ${bloom[1] ? bloom[1] : 1}`">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        bloom: {
            type: Array,
            default: () => [0, 1],
        },
    },
}
</script>

<style lang="scss" scoped></style>
