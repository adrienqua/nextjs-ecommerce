export const handleScroll = (page, setPage, scrolled) => {
    const handleScrollEvent = () => {
        const id = document.getElementById("products")
        if (id) {
            if (window.scrollY + window.innerHeight > id.offsetHeight) {
                console.log("scrolled")
                setPage(page + 1)
                window.removeEventListener("scroll", handleScrollEvent)
            }
        }
    }

    window.addEventListener("scroll", handleScrollEvent)
    if (scrolled === true) {
        window.removeEventListener("scroll", handleScrollEvent)
    }
}
