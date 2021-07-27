<template>
    <div class="relative">
        <div class="absolute w-full h-full overflow-hidden">
            <div
                class="
                    absolute
                    top-0
                    left-1/2
                    transform
                    -translate-x-1/2
                    bg-cover
                    w-full
                    h-full
                    anim-bg-scroll
                    --anim-speed-20000 --anim-reverse
                "
                :style="`background-image: url('${require('~/assets/img/heightmap/bg.png')}')`"
                gsap-id="bg"
            ></div>
        </div>
        <div class="_overlay --black opacity-50"></div>
        <div class="cartesian h-screen overflow-hidden">
            <Transform class="w-full h-full overflow-hidden" :position="[0, 400]" :scale="[2, 1]">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1920 1080"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xml:space="preserve"
                    xmlns:serif="http://www.serif.com/"
                    class="invisible"
                >
                    <g transform="matrix(1,0,0,1,-1.13687e-13,69.2362)">
                        <path
                            gsap-path="heli2"
                            d="M103.16,680.882C378.9,686.236 723.657,476.103 723.657,260.545"
                            style="fill: none; stroke: white; stroke-width: 1px"
                        />
                    </g>
                    <g transform="matrix(-1,0,0,1,1920,69.2362)">
                        <path
                            gsap-path="heli3"
                            d="M103.16,680.882C378.9,686.236 723.657,476.103 723.657,260.545"
                            style="fill: none; stroke: white; stroke-width: 1px"
                        />
                    </g>
                </svg>
            </Transform>
            <Transform
                gsap-id="heli1"
                class="w-30 h-30 opacity-0"
                :bloom="[30, 0.8]"
                class_rot="anim-rotate --anim-speed-900"
            >
                <img :src="require('~/assets/svg/heightmap/heli.svg')" />
            </Transform>
            <Transform
                gsap-id="heli2"
                class="w-30 h-30 opacity-0"
                :bloom="[30, 0.8]"
                class_rot="anim-rotate --anim-speed-900"
            >
                <img :src="require('~/assets/svg/heightmap/heli.svg')" />
            </Transform>
            <Transform
                gsap-id="heli3"
                class="w-30 h-30 opacity-0"
                :bloom="[30, 0.8]"
                class_rot="anim-rotate --anim-speed-900"
            >
                <img :src="require('~/assets/svg/heightmap/heli.svg')" />
            </Transform>
            <!-- <Transform gsap-id="tip" class="w-full opacity-0 text-16 text-center"> Scroll to proceed </Transform> -->
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
export default {
    data() {
        return {
            timeline: null,
            tipTL: null,
        }
    },
    mounted() {
        gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, ScrollToPlugin)

        this.InitAll()
    },
    beforeDestroy() {
        if (this.timeline && this.timeline.kill) this.timeline.kill()
        if (this.tipTL && this.tipTL.kill) this.tipTL.kill()
    },
    methods: {
        InitAll() {
            console.log('init - HeightMap')

            this.InitMainTimeline()
            this.InitTipTimeline()
        },
        InitTipTimeline() {
            this.tipTL = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    // markers: true,
                    trigger: this.$el,
                    start: '-10 top',
                    end: '10 top',
                    toggleActions: 'restart reset restart reset',
                },
            })

            const _this = this
            this.tipTL.add(function () {
                _this.$root.$gsapSnap({
                    timeline: _this.timeline,
                    label: 'additional_helis',
                    duration: 1,
                    overshoot: 50,
                })
            }, 2)
        },
        InitMainTimeline() {
            const easing = 'power1.inOut',
                time1 = 5

            const heli1 = this.$el.querySelector('[gsap-id="heli1"]')
            const heli2 = this.$el.querySelector('[gsap-id="heli2"]')
            const heli3 = this.$el.querySelector('[gsap-id="heli3"]')

            const bg = this.$el.querySelector('[gsap-id="bg"]')

            const heli2_path = this.$el.querySelector('[gsap-path="heli2"]')
            const heli3_path = this.$el.querySelector('[gsap-path="heli3"]')

            this.timeline = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: this.$el,
                    pin: true,
                    start: 'top top',
                    end: '200%',
                    scrub: 1,
                    snap: {
                        snapTo: 'labelsDirectional',
                        duration: { min: 0.2, max: 0.5 },
                        delay: 0,
                        ease: 'power1.out',
                    },
                },
            })

            this.timeline.addLabel('start')

            this.timeline.set(heli1, { opacity: 1, scale: 1.5 })
            this.timeline.set(bg, { width: '150vw' })

            this.timeline.fromTo(
                heli1,
                { y: '100vh' },
                {
                    y: 0,
                    duration: 3,
                    ease: easing,
                }
            )

            this.timeline.addLabel('additional_helis')

            this.timeline.set([heli2, heli3], { opacity: 1, scale: 1.5 })

            this.timeline.to(bg, { width: '100vw', duration: time1, ease: easing }, 'additional_helis')
            this.timeline.to(heli1, { scale: 1, duration: time1, ease: easing }, 'additional_helis')

            this.timeline.to(
                heli2,
                {
                    motionPath: {
                        path: heli2_path,
                        align: heli2_path,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: false,
                    },
                    scale: 1,
                    duration: time1,
                    ease: easing,
                },
                'additional_helis'
            )

            this.timeline.to(
                heli3,
                {
                    motionPath: {
                        path: heli3_path,
                        align: heli3_path,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: false,
                    },
                    scale: 1,
                    duration: time1,
                    ease: easing,
                },
                'additional_helis'
            )

            this.timeline.addLabel('end')
        },
    },
}
</script>

<style lang="scss" scoped></style>
