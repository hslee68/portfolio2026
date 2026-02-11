import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Me.css';
import profileImg from '../assets/img/me.png';

/* skill 이미지 */
import skillFigma from '../assets/img/skillFigma.png';
import skillIllust from '../assets/img/skillIllust.png';
import skillPhotoshop from '../assets/img/skillPhotoshop.png';
import skillHTML from '../assets/img/skillHTML.png';
import skillCSS from '../assets/img/skillCss.png';
import skillJS from '../assets/img/skillJs.png';
import skillReact from '../assets/img/skillReact.png';
import skillBlender from '../assets/img/skillBlender.png';
import skillMid from '../assets/img/skillMid.png';
import skillChatGPT from '../assets/img/skillChatGPT.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    skillFigma,
    skillIllust,
    skillPhotoshop,
    skillHTML,
    skillCSS,
    skillJS,
    skillReact,
    skillBlender,
    skillMid,
    skillChatGPT,
];

const Me = () => {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);
    const contentRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* 🔹 박스 확대 */
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=2000',
                    scrub: 1.8,
                    pin: true,
                },
            })
                .to(boxRef.current, { opacity: 1, duration: 0.1 })
                .to(boxRef.current, {
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px',
                    duration: 1,
                    ease: 'power2.inOut',
                })
                .to(contentRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

            /* 🔹 끊김 없는 가로 마퀴 */
            const track = trackRef.current;
            const items = gsap.utils.toArray('.skill-item');
            const itemWidth = items[0].offsetWidth + 40;
            const singleSetWidth = itemWidth * skills.length;

            let x = 0;
            const speed = 1.2;

            gsap.ticker.add(() => {
                x -= speed;
                if (Math.abs(x) >= singleSetWidth) x = 0;
                gsap.set(track, { x });
            });

            /* 🔹 위아래 둥실 */
            gsap.utils.toArray('.skill-item img').forEach((img, i) => {
                gsap.to(img, {
                    y: -40,
                    duration: 1.4,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.15,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="me-section">
            <div ref={boxRef} className="me-expanding-box">
                <div ref={contentRef} className="me-inner-content">

                    {/* 프로필 */}
                    <div className="profile-image-container">
                        <img src={profileImg} alt="profile" />
                    </div>

                    {/* 텍스트 정보 */}
                    <div className="meinfoBox">
                        <div className="leftBox">
                            <p className="text">
                                안녕하세요! 연결의 힘을 믿는 UIUX 디자이너 <span>이하승</span>입니다.
                            </p>

                            <div className="infoBox">
                                <h3 className="name">이하승</h3>
                                <div className="smalltextBox">
                                    <p>2002.06.08</p>
                                    <p>+82 010-9185-5542</p>
                                    <p>heeh0608@naver.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="rightBox">
                            <div className="leftitem">
                                <div className="innerBox">
                                    <p className="seriftext">Education</p>
                                    <div className="textBox">
                                        <p className="text">2025.08 백석대학교 졸업</p>
                                        <p className="text">
                                            2025.08.27 ~ 2026.02.20 <br />
                                            EZEN 아카데미DX교육센터 강남 <br />
                                            UXUI디자인&웹기획 프론트엔드 <br />부트캠프 수료
                                        </p>
                                    </div>
                                </div>

                                <div className="innerBox">
                                    <p className="seriftext">Awards</p>
                                    <p className="text">백석대학교 SW 경진대회 우수상</p>
                                </div>

                                <div className="innerBox">
                                    <p className="seriftext">Character</p>
                                    <p className="text">ISTP 효율적인 유쾌한 센스있는</p>
                                </div>
                            </div>

                            <div className="rightitem">
                                <p className="seriftext">License</p>
                                <div className="text">
                                    <p>자동차운전면허증 2종보통</p>
                                    <p>디지털정보활용능력(DIAT)-스프레드시트</p>
                                    <p>디지털정보활용능력(DIAT)-워드프로세서</p>
                                    <p>디지털정보활용능력(DIAT)-멀티미디어제작</p>
                                    <p>디지털정보활용능력(DIAT)-프리젠테이션</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 Skill */}
                    <p className="skillText">Skill</p>
                    <div className="SkillBox">

                        <div className="skill-marquee">
                            <div className="skill-track" ref={trackRef}>
                                {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
                                    <div className="skill-item" key={idx}>
                                        <img src={skill} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Me;
