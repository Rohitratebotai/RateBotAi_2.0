import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img from '../../assets/hero/laptopImg.jpg'

gsap.registerPlugin(ScrollTrigger);

const RateBotAIHospitalityReveal = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const imageWrapperRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const imageWrapper = imageWrapperRef.current;
        const image = imageRef.current;

        if (!section || !imageWrapper || !image) return;

        const ctx = gsap.context(() => {
            /*
             * Initial state
             * ----------------
             * Small image in the center of the screen.
             */
            gsap.set(imageWrapper, {
                width: "55vw",
                height: "50vh",
                borderRadius: "0px",
                scale: 1,
                x: 0,
                y: 0,
                transformOrigin: "center center",
                overflow: "hidden",
            });

            gsap.set(image, {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                scale: 1,
                transformOrigin: "center center",
            });

            /*
             * Main scroll animation
             */
            gsap.to(imageWrapper, {
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",

                ease: "none",

                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=180%",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen overflow-hidden bg-navy-900"
        >
            {/* Centering container */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Expanding image */}
                <div
                    ref={imageWrapperRef}
                    className="relative overflow-hidden will-change-[width,height,border-radius]"
                >
                    <img
                        ref={imageRef}
                        src={img}
                        alt="RateBotAI Hospitality"
                        className="block h-full w-full object-cover"
                    />

                    {/* Very subtle cinematic overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[#05152D]/[0.04]" />
                </div>
            </div>
        </section>
    );
};

export default RateBotAIHospitalityReveal;

