<template>
    <main>
        <div class="bg-gradient-to-b from-black to-blue-900">
            <div class="cartesian h-screen">
                <Transform class="w-30 h-30" :bloom="[30, 0.3]" class_rot="anim-rotate --anim-speed-900">
                    <img :src="require('~/assets/svg/heightmap_heli.svg')" />
                </Transform>
            </div>
            <div class="h-screen"></div>
        </div>
    </main>
</template>

<script>
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
export default {
    mounted() {
        gsap.registerPlugin(Draggable, MotionPathPlugin, ScrollToPlugin, ScrollTrigger)

        this.InitAll()
    },
    methods: {
        InitAll() {
            console.log('init')
        },
    },
}
</script>

<style lang="scss" scoped></style>
