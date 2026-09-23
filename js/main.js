let activeDetails = null;

const roadmapObserver = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);

    if (visibleEntries.length === 0) {
        return;
    }

    visibleEntries.sort((first, second) => {
        const viewportCenter = window.innerHeight / 2;
        const firstCenter = first.boundingClientRect.top + first.boundingClientRect.height / 2;
        const secondCenter = second.boundingClientRect.top + second.boundingClientRect.height / 2;

        return Math.abs(firstCenter - viewportCenter) - Math.abs(secondCenter - viewportCenter);
    });

    const nextDetails = visibleEntries[0].target.closest("details");

    if (nextDetails === activeDetails) {
        return;
    }

    const currentScrollPosition = window.scrollY;

    if (activeDetails) {
        activeDetails.open = false;
    }

    nextDetails.open = true;
    activeDetails = nextDetails;

    window.requestAnimationFrame(() => {
        window.scrollTo(0, currentScrollPosition);
    });
}, {
    threshold: 0.5,
    rootMargin: "-28% 0px -28% 0px"
});

document.querySelectorAll(".roadmap__list summary").forEach((summary) => {
    roadmapObserver.observe(summary);
});