import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";
import footerImg from "../assets/img/name-black.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const pathRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        const path = pathRef.current;
        const footer = footerRef.current;
        const img = footer.querySelector("img");

        const length = path.getTotalLength();

        // 1. 초기 세팅 (Set)
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        });

        gsap.set(footer, {
            yPercent: 100,
        });

        // 🔥 중요: xPercent를 -50으로 고정하여 중앙 정렬 유지
        gsap.set(img, {
            xPercent: -50,
            yPercent: 100, // 더 아래에서 시작
            opacity: 0,
        });

        // 2. 타임라인 생성
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".footer-transition",
                start: "top top",
                end: "+=700%",
                scrub: true,
                pin: true,
            },
        });

        // 애니메이션 순서
        tl.to(path, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
        })
            .to(footer, {
                yPercent: 0,
                duration: 1,
                ease: "power2.out",
            })
            .to(img, {
                xPercent: -50, // 애니메이션 중에도 중앙 유지
                yPercent: -50, // 최종 위치 (CSS의 top 75%와 결합되어 중앙 배치)
                opacity: 1,
                duration: 2,
                ease: "power3.out",
            }, "-=0.5"); // 푸터가 올라오는 도중에 이미지가 나타나기 시작 (더 자연스러움)

    }, []);

    return (
        <section className="footer-transition">
            {/* SVG 배경 선 */}
            <svg
                className="footer-line"
                width="1921"
                height="849"
                viewBox="0 0 1921 849"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    d="M0.0664062 121.042
                    C501.946 143.324 1399.98 -125.887 1471.77 78.7451
                    C1565.27 345.245 63.7711 967.245 133.771 752.245
                    C203.771 537.245 1509.77 92.7446 1738.77 265.745
                    C1967.77 438.745 889.299 1043.74 1053.3 781.745
                    C1155.47 618.522 1591.3 585.19 1920.07 668.778"
                    stroke="#677C51"
                    strokeWidth="3"
                    fill="none"
                />
            </svg>

            {/* Footer 본체 */}
            <footer ref={footerRef} className="site-footer">
                <div className="textBox">
                    <div className="lefttextBox">
                        <div className="linkBox">
                            <h3 className="title">바로가기</h3>
                            <p>HOME</p>
                            <p>WORK</p>
                            <p>ABOUT</p>
                            <p>CONTACT</p>
                        </div>
                        <div className="contectBox">
                            <h3 className="title">연락망</h3>
                            <p>+82 010-9185-5542</p>
                            <p>heeh0608@naver.com</p>
                            <p>heeh0608@bu.ac.kr</p>
                        </div>
                    </div>

                    <div className="righttextBox">
                        <div className="meBox">
                            <h3>李夏承</h3>
                            <p>Lee haseung</p>
                            <p>이하승 李夏承</p>
                            <p>+82 010-9185-5542</p>
                            <p>heeh0608@never.com</p>
                        </div>
                    </div>
                </div>

                {/* 하단 이름 이미지 */}
                <img src={footerImg} alt="name-black" />
            </footer>
        </section>
    );
};

export default Footer;