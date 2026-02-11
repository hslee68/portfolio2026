import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        id: 1,
        title: "낙서가 그림이 되던 시절",
        desc:
            "어린 시절부터 손에서 펜을 놓지 않았던 낙서의 기억들이 수 권의 \n그림 공책으로 남았습니다. 그 시간들이 쌓여 자연스럽게 창작과 \n표현의 세계에 매료되는 계기가 되었습니다.",
        x: 1550,
        y: 850,
        align: "end",
    },
    {
        id: 2,
        title: "꿈을 향한 여정,\n수포로 돌아가다",
        desc:
            "디자인에 대한 꿈을 안고 입시에 도전했으나 현실의 \n벽에 부딪혔고, 이후 백석대학교 컴퓨터공학부에 \n진학하며 진로에 대한 방황을 겪었습니다.",
        x: 350,
        y: 1350,
        align: "start",
    },
    {
        id: 3,
        title: "미련을 확신으로 \n이어간 하나의 프로젝트",
        desc:
            "컴퓨터공학 진학 후 진행한 개인 프로젝트에서 제 디자인이 실제 공간에 \n구현되는 희열을 느꼈습니다. 이를 계기로 디자인의 매력을 재발견하며 \n디자이너로 결정적 계기를 가지게 되었습니다.",
        x: 1650,
        y: 2050,
        align: "end",
    },
    {
        id: 4,
        title: "다양한 경험으로 \n그리기 시작한 미래",
        desc:
            "이를 계기로 디자인 강의를 수강하며 시각적 경험에 몰입했습니다. \n특히 전공 프로젝트에서도 개발보다 사용자 플로우를 고민하는 자신을 \n발견하며, 디자인적 흥미와 전공 지식이 맞닿은 UI/UX 디자인을 \n진로로 확신하게 되었습니다.",
        x: 300,
        y: 2650,
        align: "start",
    },
    {
        id: 5,
        title: "확신을 위해 \n미래를 연결하다",
        desc:
            "그 확신을 바탕으로 이젠아카데미 DX 교육센터 강남 UXUI디자인& \n웹기획 프론트엔드 부트캠프에서 팀·개인 프로젝트를 완수하며\n실무 감각과 디자인 프로세스를 완벽히 익혔습니다.",
        x: 960,
        y: 3350,
        align: "middle",
    },
];

const Journey = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cameraRef = useRef(null);
    const pathRef = useRef(null);
    const milestoneRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 배경 전환
            gsap.fromTo(
                sectionRef.current,
                { backgroundColor: "#f3f3f3", color: "#262626" },
                {
                    backgroundColor: "#262626",
                    color: "#f3f3f3",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        end: "top 20%",
                        scrub: 1.5,
                    },
                }
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=7000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // 헤더 사라짐
            tl.to(
                headerRef.current,
                {
                    y: -800,
                    opacity: 0,
                    duration: 20,
                    ease: "power2.in",
                },
                5
            );

            // SVG path
            const path = pathRef.current;
            if (path) {
                const len = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                });

                tl.to(
                    path,
                    {
                        strokeDashoffset: 0,
                        duration: 80,
                        ease: "none",
                    },
                    10
                );

                tl.to(
                    cameraRef.current,
                    {
                        y: -3000,
                        duration: 80,
                        ease: "none",
                    },
                    10
                );
            }

            // 마일스톤
            milestones.forEach((_, i) => {
                tl.fromTo(
                    milestoneRefs.current[i],
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 10, ease: "power2.out" },
                    20 + i * 15
                );
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="journey-section">
            {/* 헤더 */}
            <div ref={headerRef} className="journey-header">
                <h2>
                    <span>I</span> Have Lived
                </h2>
                <p>
                    저의 삶은 각기 다른 <br />
                    변화들로 이어져 왔습니다.
                </p>
            </div>

            {/* SVG */}
            <div className="journey-svg-wrapper">
                <svg
                    viewBox="0 0 1920 3772"
                    preserveAspectRatio="xMidYMin slice"
                    className="journey-svg"
                >
                    <g ref={cameraRef}>
                        <path
                            ref={pathRef}
                            d="M1921.5 0.317383C1714.29 958.549 237.347 708.229 149.503 1136.99C92.0141 1417.59 534.33 1593.11 963 1707.97C1584 1874.37 1794 1940.32 1794 2105.32C1794 2411.82 420 2615.71 288.5 2495.82C157 2375.92 1087.5 2318.82 1153.5 2696.32C1178.44 2838.97 1153.5 3109.82 467.5 3494.32C300.736 3587.79 131.098 3677.47 0 3769.79"
                            fill="none"
                            stroke="#677C51"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                        {milestones.map((m, i) => (
                            <g
                                key={m.id}
                                ref={(el) => (milestoneRefs.current[i] = el)}
                                style={{ opacity: 0 }}
                            >
                                <foreignObject
                                    x={
                                        m.x +
                                        (m.id === 2
                                            ? 70
                                            : m.align === "end"
                                                ? -870
                                                : m.align === "middle"
                                                    ? -400
                                                    : 70)
                                    }
                                    y={m.y - 40}
                                    width={m.id === 2 ? 1400 : 800}
                                    height={600}
                                >
                                    <div
                                        xmlns="http://www.w3.org/1999/xhtml"
                                        className={`milestone-content-wrapper ${m.align} ${m.id === 2 ? "milestone-second" : ""
                                            }`}
                                    >
                                        <div className="milestone-title">
                                            {m.title.split("\n").map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </div>

                                        <div className="milestone-desc-container">
                                            {m.desc}
                                        </div>
                                    </div>
                                </foreignObject>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </section>
    );
};

export default Journey;
