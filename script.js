window.onload = function() {
    const tl = gsap.timeline();

    tl.from(".letter-r", {
        y: -200,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .from(".rest-name", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")

    // 'OSHAN' മായുമ്പോൾ ആ ഗ്യാപ്പ് കൂടി ഇല്ലാതാക്കി 'R' സെന്ററിലാകുന്നു
    .to(".rest-name", {
        opacity: 0,
        width: 0,
        margin: 0,
        duration: 0.8,
        delay: 1,
        ease: "power2.inOut",
        onComplete: () => document.querySelector(".rest-name").style.display = "none"
    })

    // 'R' ചരിഞ്ഞു വീഴുന്നു - ഇപ്പോൾ അത് wrapper-ന്റെ നടുവിൽ തന്നെ വീഴും
    .to(".letter-r", {
        rotation: -90,
        duration: 1,
        ease: "bounce.out"
    })

    // ലോഗോ ഒന്ന് കൂടി ഹൈലൈറ്റ് ചെയ്യാൻ ചെറിയൊരു Zoom
    .to(".main-logo-wrapper", {
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out"
    })

    // ബട്ടൺ വരുന്നു
    .to(".enter-btn", {
        opacity: 1,
        y: -10,
        duration: 0.8
    });
};

