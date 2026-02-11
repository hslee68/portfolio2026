import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Like.css";

import image1 from "../assets/img/hobby-Mariecuire.png";
import image2 from "../assets/img/hobby-Jeanned'Arc.png";
import image3 from "../assets/img/hobby-OrlandoInVirginia.png";
import image4 from "../assets/img/hobby-ReparerLesVivants.png";
import image5 from "../assets/img/hobby-Drawing1.png";
import image6 from "../assets/img/hobby-Drawing2.png";
import image7 from "../assets/img/hobby-Drawing3.png";
import image8 from "../assets/img/hobby-Drawing4.png";
import image9 from "../assets/img/hobby-Conceptdesign1.png";
import image10 from "../assets/img/hobby-Conceptdesign2.png";
import image11 from "../assets/img/hobby-Conceptdesign3.png";
import image12 from "../assets/img/hobby-Conceptdesign4.png";

gsap.registerPlugin(ScrollTrigger);

const TEXTS = ["Musical", "Drawing", "Concept Design"];
const IMAGES_PER_SECTION = 4;

const IMAGES = [
    image1, image2, image3, image4,
    image5, image6, image7, image8,
    image9, image10, image11, image12,
];

const ROTATIONS = [
    2.11, -6.57, 5.61, -2.7,
    2.11, -6.57, 5.61, -2.7,
    2.11, -6.57, 5.61, -2.7,
];

const Like = () => {
    const sectionRef = useRef(null);
    const textRefs = useRef([]);
    const imageRefs = useRef([]);
    const pathRefs = useRef([]);

    useEffect(() => {
        const texts = textRefs.current;
        const images = imageRefs.current;

        /* ===== 초기 상태 ===== */
        gsap.set(images, {
            opacity: 0,
            scale: 0.95,
            rotation: (i) => ROTATIONS[i],
            transformOrigin: "center center",
        });

        gsap.set(texts, { color: "#555" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=8000",
                scrub: true,
                pin: true,
            },
        });

        TEXTS.forEach((_, sectionIndex) => {
            const baseIndex = sectionIndex * IMAGES_PER_SECTION;

            /* 텍스트 */
            tl.to(texts, {
                color: (i) => (i === sectionIndex ? "#f3f3f3" : "#555"),
                duration: 0.4,
            });

            /* 이미지 리셋 */
            tl.to(images, {
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
            });

            /* Concept Design일 때 패스 초기화 */
            if (sectionIndex === 2) {
                pathRefs.current.forEach((path) => {
                    if (!path) return;
                    const length = path.getTotalLength();
                    gsap.set(path, {
                        strokeDasharray: length,
                        strokeDashoffset: length,
                    });
                });
            }

            /* 이미지 등장 */
            for (let i = 0; i < IMAGES_PER_SECTION; i++) {
                const imgIndex = baseIndex + i;

                tl.to(
                    images[imgIndex],
                    {
                        opacity: 1,
                        scale: 1,
                        zIndex: i + 1,
                        duration: 0.7,
                        ease: "power2.out",
                    },
                    "+=0.35"
                );

                /* ⭐ 두 번째 카드에서 패스 시작 */
                if (sectionIndex === 2 && i === 3) {
                    const [path1, path2] = pathRefs.current;

                    tl.to(
                        path1,
                        {
                            strokeDashoffset: 0,
                            duration: 4, // ⭐ 첫 번째 패스 속도
                            ease: "power1.inOut",
                        },
                        "<"
                    );

                    tl.to(
                        path2,
                        {
                            strokeDashoffset: 0,
                            duration: 4, // ⭐ 두 번째 패스 속도
                            ease: "power1.inOut",
                        },
                        "+=1"
                    );
                }
            }
        });

        return () => ScrollTrigger.killAll();
    }, []);

    return (
        <>
            <section className="liked-hero">
                <h2 className="liked-title">I Liked</h2>
                <p className="liked-desc">
                    저의 삶은 제가 사랑하는 것과<br />
                    함께 이어져 왔습니다.
                </p>
            </section>

            <section ref={sectionRef} className="like-section">
                <div className="like-left">
                    <div className="concept-lines">
                        <svg className="concept-line line-1" viewBox="0 0 720 469">
                            <path
                                ref={(el) => (pathRefs.current[0] = el)}
                                d="M0.787109 1.27734C304.088 188.334 671.789 165.757 713.787 284.298C769.31 441.009 317.318 436.033 0.787109 466.673"
                                stroke="#677C51"
                                strokeWidth="3"
                                fill="none"
                            />
                        </svg>

                        <svg className="concept-line line-2" viewBox="0 0 1000 469">
                            <path
                                ref={(el) => (pathRefs.current[1] = el)}
                                d="M0.539062 31.4334C374.66 82.9949 973.539 94.6373 973.539 28.9668C973.539 -32.5951 404.781 8.06685 0.539062 163.712"
                                stroke="#677C51"
                                strokeWidth="3"
                                fill="none"
                            />
                        </svg>
                    </div>

                    {TEXTS.map((text, i) => (
                        <p
                            key={i}
                            ref={(el) => (textRefs.current[i] = el)}
                            className="like-text"
                        >
                            {text}
                        </p>
                    ))}
                </div>

                <div className="like-right">
                    {IMAGES.map((src, i) => (
                        <div
                            key={i}
                            ref={(el) => (imageRefs.current[i] = el)}
                            className="like-card"
                        >
                            <img src={src} alt="" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Like;
