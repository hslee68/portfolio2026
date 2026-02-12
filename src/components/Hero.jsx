import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";
import nameWhite from "../assets/img/name-white.png";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
    const wrapperRef = useRef(null);
    const cameraRef = useRef(null);

    const circleRef = useRef(null);
    const lineRef = useRef(null);
    const topDotRef = useRef(null);
    const bottomDotRef = useRef(null);
    const smallTextRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const textRef3 = useRef(null);
    const textRef4 = useRef(null);
    const textRef5 = useRef(null);
    const textRef6 = useRef(null);
    const textRef7 = useRef(null);
    const nameRef = useRef(null);

    const path1Ref = useRef(null);
    const path2Ref = useRef(null);
    const path3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "+=6500",
                    scrub: 1.5,
                    pin: true,
                },
            });

            /* ---------- 초기 세팅 (null-safe) ---------- */

            if (lineRef.current) {
                const len = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                });
            }

            [path1Ref, path2Ref, path3Ref].forEach((ref) => {
                if (!ref.current) return;
                const len = ref.current.getTotalLength();
                gsap.set(ref.current, {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                });
            });

            gsap.set([topDotRef.current, textRef2.current, bottomDotRef.current], {
                opacity: 0,
                y: 30,
            });

            gsap.set([nameRef.current, textRef3.current, textRef4.current, textRef5.current, textRef6.current, textRef7.current], {
                opacity: 0,
                y: 30,
            });

            /* ---------- 애니메이션 (내용 그대로) ---------- */

            tl
                .to(textRef1.current, { opacity: 0, duration: 8 })
                .to(smallTextRef.current, { opacity: 0, duration: 8 })

                .to(
                    circleRef.current,
                    {
                        attr: { r: 2 },
                        duration: 15,
                        ease: "power4.inOut",
                    },
                    "-=0.3"
                )

                .to(lineRef.current, {
                    strokeDashoffset: 0,
                    duration: 10,
                    ease: "none",
                })

                .to(topDotRef.current, { opacity: 1, y: 0, duration: 5 })
                .to(textRef2.current, { opacity: 1, y: 0, duration: 7 })
                .to(bottomDotRef.current, { opacity: 1, y: 0, duration: 5 })

                .addLabel("curveStart")

                .to(
                    cameraRef.current,
                    {
                        y: -2650,
                        duration: 55,
                        ease: "none",
                    },
                    "curveStart"
                )

                .to(
                    [circleRef.current, lineRef.current, topDotRef.current],
                    { opacity: 0, duration: 10 },
                    "curveStart"
                )

                .to(
                    path1Ref.current,
                    {
                        strokeDashoffset: 0,
                        duration: 7,
                        ease: "power1.inOut",
                    },
                    "curveStart"
                )

                .to(
                    path2Ref.current,
                    {
                        strokeDashoffset: 0,
                        stroke: "#262626",          // ✅ 같이 묶음
                        duration: 15,
                        ease: "power1.inOut",
                    },
                    "curveStart+=9"
                )

                .to(
                    wrapperRef.current,
                    {
                        backgroundColor: "#f3f3f3",
                        duration: 15,
                    },
                    "curveStart+=7"
                )

                .to(
                    path3Ref.current,
                    {
                        strokeDashoffset: 0,
                        duration: 7,
                        ease: "power1.inOut",
                    },
                    "curveStart+=25"
                )

                .to(
                    textRef3.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 10,
                    },
                    "curveStart+=30"
                )
                .to(
                    textRef4.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 10,
                    },
                    "curveStart+=35"
                )
                .to(
                    [nameRef.current, textRef5.current, textRef6.current, textRef7.current],
                    {
                        opacity: 1,
                        y: 0,
                        duration: 10,
                    },
                    "curveStart+=60"
                )

                // 🔥 마지막에 멈춰있는 시간 추가 (다음 섹션으로 넘어가기 전 여유)
                .to({}, { duration: 20 });
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="hero-wrapper">
            <div className="sticky-box">
                <svg
                    className="responsive-svg"
                    viewBox="0 0 1920 2000"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <g ref={cameraRef}>
                        <circle ref={circleRef} cx="960" cy="480" r="400" fill="#f3f3f3" />
                        <path ref={lineRef} d="M960 0V850" stroke="#f3f3f3" strokeWidth="3" strokeLinecap="round" />
                        <text ref={textRef1} x="960" y="690" textAnchor="middle" dominantBaseline="middle" fill="#262626" fontFamily="Pretendard" fontSize="85" fontWeight="700" > 연결합니다. </text>
                        <text ref={smallTextRef} x="960" y="820" textAnchor="middle" dominantBaseline="middle" fill="#262626" fontFamily="Pretendard" fontSize="16" fontWeight="300" > scroll down </text>

                        <circle ref={topDotRef} cx="960" cy="880" r="4" fill="#f3f3f3" />
                        <text ref={textRef2} x="960" y="1000" textAnchor="middle" fill="#f3f3f3" fontFamily="Pretendard" fontSize="85" fontWeight="600" > 이어집니다. </text>
                        <circle ref={bottomDotRef} cx="960" cy="1050" r="4" fill="#f3f3f3" />

                        {/* 1번 선 */}
                        <g transform="translate(959, 1080)">
                            <path ref={path1Ref} d="M1.5 1.5C1.5 133 48.1506 282.401 750.146 470.5C833.912 492.945 903.157 515.362 958.496 537" stroke="#f3f3f3" strokeWidth="3" strokeLinecap="butt" /> </g>

                        {/* 2번 선 */}
                        <g transform="translate(0, 1600)">
                            <path ref={path2Ref} d="M1921.5 296.098C1869.53 306.144 1809.44 312.757 1744.62 315.319C732.62 355.319 35.2168 114.703 359.471 27.8193C893.499 -115.273 2130.78 363.596 1713.15 538.819C1613 580.839 1155.07 641.919 707.47 488.319C473.608 408.066 214.42 341.441 1.5 312.359" stroke="#f3f3f3" strokeWidth="3" strokeLinecap="round" /> </g>

                        {/* 3번 선 */} <g transform="translate(0, 2300)"> <path ref={path3Ref} d="M1.5 1.50049 C36 14.5002 158 33.6078 450.499 75.5002 C560.5 91.2549 965 131.5 965 418.501" stroke="#262626" strokeWidth="3" strokeLinecap="round" fill="none" /> </g>

                        <text ref={textRef3} x="960" y="2850" textAnchor="middle" dominantBaseline="middle" fill="#262626" fontFamily="Pretendard" fontSize="60" fontWeight="700" > 그리고 </text>
                        <text ref={textRef4} x="960" y="3050" textAnchor="middle" dominantBaseline="middle" fill="#677C51" fontFamily="ChosunKm" fontSize="128" fontWeight="600" > 나아갑니다. </text>

                        <image ref={nameRef} href={nameWhite} x="60" y="3200" width="1800" height="600" preserveAspectRatio="xMidYMid slice" />

                        <text ref={textRef5} x="100" y="4050" textAnchor="start" dominantBaseline="middle" fill="#262626" fontFamily="Pretendard" fontSize="16" fontWeight="400" > <tspan x="100" dy="0">2026 Portfolio</tspan> <tspan x="100" dy="20">Lee ha seung 李夏承</tspan> </text>

                        <text ref={textRef6} x="1910" y="4050" textAnchor="end" dominantBaseline="middle" fill="#262626" fontFamily="Pretendard" fontSize="16" fontWeight="400" > <tspan x="1800" dy="0">Visual/</tspan> <tspan x="1800" dy="20">UI/UX Designer</tspan> </text>

                        <text ref={textRef7} x="920" y="4100" dominantBaseline="middle" fill="#262626" fontFamily="Pretendard" fontSize="16" fontWeight="300" > Scroll Down </text>
                    </g>
                </svg>
            </div>
        </div >
    );
}
export default Hero;