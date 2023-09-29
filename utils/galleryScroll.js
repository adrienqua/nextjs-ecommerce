export const handleGalleryScroll = (ref) => {
    const container = ref.current

    let isDown
    let fromY
    let fromScrollY

    const handleMouseLeave = () => {
        isDown = false
    }

    const handleMouseDown = (e, touch = false) => {
        isDown = true

        //fix for mobile and tablets
        let pageY
        if (touch) {
            pageY = e.touches[0].pageY
        } else {
            pageY = e.pageY
        }

        fromY = pageY - container.offsetTop
        fromScrollY = container.scrollTop
    }

    const handleMouseMove = (e, touch = false) => {
        if (isDown) {
            e.preventDefault()

            //fix for mobile and tablets
            let pageY
            if (touch) {
                pageY = e.touches[0].pageY
            } else {
                pageY = e.pageY
            }

            const toY = pageY - container.offsetTop
            const moveY = toY - fromY
            container.scrollTop = fromScrollY - moveY
        }
    }

    if (container) {
        container.addEventListener("mouseleave", handleMouseLeave)
        container.addEventListener("mouseup", handleMouseLeave)
        container.addEventListener("mousedown", (e) => handleMouseDown(e))
        container.addEventListener("mousemove", (e) => handleMouseMove(e))

        //scroll support for mobile and tablets
        container.addEventListener("touchend", handleMouseLeave)
        container.addEventListener("touchstart", (e) => handleMouseDown(e, true))
        container.addEventListener("touchmove", (e) => handleMouseMove(e, true))
    }
}
