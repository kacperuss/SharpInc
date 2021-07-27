import { gsap } from 'gsap'

export default (context, inject) => {
    const img = (img_obj, desktop = true, size = null) => {
        if (!img_obj || img_obj.image === undefined || img_obj.imagemob === undefined) {
            return ''
        }
        let _img = desktop || !img_obj.imagemob ? img_obj.image : img_obj.imagemob
        if (_img.sizes && size) {
            return _img.sizes[size] ? _img.sizes[size] : ''
        }
        return _img.url ? _img.url : ''
    }
    inject('img', img)
    context.$img = img

    const gsapSnap = (options) => {
        if (!options || !options.timeline || !options.timeline.scrollTrigger) {
            console.error('Invalid timeline or timeline lacks scrollTrigger')
            return null
        }
        if (!options.timeline.labels[options.label]) {
            console.error('Label not present in timeline')
            return null
        }

        const timeline = options.timeline,
            labelName = options.label,
            duration = options.duration ? options.duration : 1,
            ease = options.ease ? options.ease : 'power1.inOut',
            overshoot = options.overshoot ? options.overshoot : 0

        const start = timeline.scrollTrigger.start
        const end = timeline.scrollTrigger.end
        const total_time = timeline.totalDuration()
        const label_time = timeline.labels[labelName]
        const percent = label_time / total_time
        const target_pos = Math.floor((end - start) * percent + start)

        const anti_snap = window.scrollY > target_pos ? overshoot : -overshoot

        gsap.to(window, { ease: ease, duration: duration, scrollTo: target_pos + anti_snap })
    }
    inject('gsapSnap', gsapSnap)
    context.$gsapSnap = gsapSnap
}
