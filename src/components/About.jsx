import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import textDesign from "../assets/img/textdesign.png";
import arrow from "../assets/img/arrowWhite.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const maskRef = useRef(null);
    const imageRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 120%",
                    /* 🔴 [애니메이션 종료 타이밍] 섹션 길이를 줄였기 때문에, 
                       애니메이션도 그에 맞춰 일찍 끝나도록 top -70%로 조정했습니다. */
                    end: "top -150%",
                    scrub: 1.8,
                    markers: false,
                },
            });

            // 초기 상태 설정
            gsap.set([imageRef.current, buttonRef.current], { opacity: 0, y: 100 });

            // 마스크 전체 이동 시간을 1로 기준 잡습니다 (속도 조절용이 아님)
            tl.to(maskRef.current, {
                y: "-160vh",
                ease: "power4.out",
                duration: 1,
            }, 0)
                .to(sectionRef.current, {
                    backgroundColor: "#262626", // 👈 배경색을 즉시(순식간에) 변경
                    duration: 0.01,
                }, 0.4) // 👈 마스크가 덮는 도중 0.5 시점에 즉시 변경
                .to(
                    imageRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                    },
                    0.1
                )
                .to(
                    buttonRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.2,
                    },
                    0.1
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="about-section">
            <div ref={maskRef} className="about-mask">
                <div className="about-content">
                    <img
                        ref={imageRef}
                        src={textDesign}
                        alt="Ideation Experience Value"
                        className="about-text-image"
                    />

                    <button ref={buttonRef} className="view-more-btn">
                        <span className="label">View More</span>
                        <span className="icon">
                            <img src={arrow} alt="" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;
