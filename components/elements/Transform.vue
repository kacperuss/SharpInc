<template>
    <div>
        <div :class="class_pos" transform="pos" :style="`transform: translate(${CalcPos()})`">
            <div :class="class_rot" transform="rot" :style="`transform: rotate(${rotation}deg)`">
                <div class="relative" :class="class_scl" transform="scl" :style="`transform: scale(${CalcScl()})`">
                    <Bloom class="absolute w-full h-full top-0 left-0" v-if="bloom[0] > 0" :bloom="bloom">
                        <slot />
                    </Bloom>
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        class_pos: {
            type: String,
            default: '',
        },
        class_rot: {
            type: String,
            default: '',
        },
        class_scl: {
            type: String,
            default: '',
        },
        position: {
            type: Array,
            default: () => [0, 0],
        },
        rotation: {
            type: Number,
            default: 0,
        },
        scale: {
            type: Array,
            default: () => [1, 1],
        },
        bloom: {
            type: Array,
            default: () => [0, 1],
        },
    },
    mounted() {},
    methods: {
        CalcPos() {
            const p = this.position
            if (p.length < 2) p.push(0)
            return `${p[0] / 16}rem, ${p[1] / 16}rem`
        },
        CalcScl() {
            const s = this.scale
            if (s.length < 2) s.push(s[0])
            return `${s[0]}, ${s[1]}`
        },
    },
}
</script>

<style lang="scss" scoped>
[transform] {
    width: 100%;
    height: 100%;
}
</style>
