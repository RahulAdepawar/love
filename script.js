
// First Part 
function animateRope(imageId, ropeId, duration, finalRotation) {
    gsap.to(imageId, {
        y: 150,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: function () {
            let progress = this.progress();
            let imageY = 150 * progress;
            let image = document.querySelector(imageId);
            let imageHeight = image.clientHeight;
            let endY = imageY + imageHeight / 2;
            let endX = 100;

            let swingFactor = Math.sin(progress * Math.PI * 2) * (1 - progress) * 80;
            let controlX = 100 + swingFactor;
            let controlY = endY / 1.3;

            document.querySelector(ropeId).setAttribute("d", `M100,0 Q${controlX},${controlY} ${endX},${endY}`);

            let angle = Math.atan2(controlY - endY, controlX - endX) * (180 / Math.PI) * 0.8;
            image.style.transform = `translateX(-50%) translateY(${imageY}px) rotate(${angle}deg)`;
        },
        onComplete: function () {
            gsap.to(imageId, {
                duration: 4,
                rotation: finalRotation,
                ease: "elastic.out(1, 0.4)"
            });

            gsap.to("#cutButton", { opacity: 1, duration: 2, delay: 1.5 });
        }
    });
}

animateRope("#fallingImage", "#rope", 3, -50);
animateRope("#fallingImage2", "#rope2", 2.5, -25);

document.getElementById("cutButton").addEventListener("click", function () {
    gsap.to("#rope", { y: "+=500", duration: 2, ease: "bounce.out" });
    gsap.to("#rope2", { y: "+=500", duration: 2, ease: "bounce.out" });

    gsap.to("#fallingImage", { y: "+=500", duration: 2, ease: "bounce.out" });
    gsap.to("#fallingImage2", { y: "+=500", duration: 2, ease: "bounce.out" });
});
