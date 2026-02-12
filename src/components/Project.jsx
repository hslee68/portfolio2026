import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Project.css';
import project1 from '../assets/img/project-1Million.png';
import project2 from '../assets/img/project-Nova.png';
import project3 from '../assets/img/project-experience.png';
import project4 from '../assets/img/project-clonecoding.png';
import arrow from '../assets/img/arrowWhite.png';

gsap.registerPlugin(ScrollTrigger);


const projects = [
    {
        id: 1,
        title: '1MILLION DANCE STUDIO',
        subtitle: 'Website Re-Design',
        description: '6인 Team Project | 2025.11.26 ~ 2025.12.29 | 기여도 40%',
        image: project1,
        tags: ['Design', 'Development'],
        url: 'https://yunjioh.github.io/1million/'
    },
    {
        id: 2,
        title: 'K-Fandom Project',
        subtitle: 'Virtual Application NOVA',
        description: '7인 Team Project | 2026.01.02 ~ 2026.02.26 | 기여도 30%',
        image: project2,
        tags: ['Design', 'UX/UI'],
        url: 'https://tubi-nova.vercel.app/'
    },
    {
        id: 3,
        title: '공연 관람자들을 위한 어플리케이션',
        subtitle: '경험',
        description: 'Personal Project',
        image: project3,
        tags: ['Design', 'Mobile']
    },
    {
        id: 4,
        title: 'Clone Coding',
        subtitle: '',
        description: 'Clone Coding',
        image: project4,
        tags: ['Design', 'AI']
    }
];

const Project = () => {
    const headerRef = useRef(null); // 👈 헤더 애니메이션을 위한 ref

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* ---------- 헤더 애니메이션 (Hero 섹션 스타일) ---------- */
            gsap.set(headerRef.current, { opacity: 0, y: 30 }); // 초기 상태: 투명하고 30px 아래

            gsap.to(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%", // 👈 [시점 조절] 헤더가 화면 하단에서 85% 지점에 올 때 시작
                    end: "top 65%",   // 👈 [시점 조절] 헤더가 화면 65% 지점에 올 때 완료
                    scrub: 1,         // 👈 [속도 조절] 숫자가 클수록 부드럽게 따라옴 (0.5~2 사이 추천)
                },
                opacity: 1,
                y: 0,
                duration: 1,         // scrub이 false일 때 유효, scrub true일 땐 스크롤 속도에 비례
                ease: "power2.out"
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="project-section">
            <div className="project-container">
                {/* 헤더 */}
                <div ref={headerRef} className="project-header">
                    <h2><span>I</span> Worked</h2>
                    <p>팀 프로젝트부터 개인 프로젝트까지ㅡ<br />저의 작업을 모두 담았습니다.</p>
                </div>

                {/* 프로젝트 리스트 */}
                <div className="project-list">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className="project-info">
                                <div className="project-text">
                                    <p className="project-label">{project.description}</p>
                                    <h3>{project.title}</h3>
                                    <h3>{project.subtitle}</h3>
                                </div>
                                <button className="more-project-btn">
                                    <span className="label">more project</span>
                                    <span className="icon">
                                        <img src={arrow} alt="" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

                {/* 하단 버튼을 다시 리스트 밖으로 이동 */}
                <button className="View-more-btn">
                    <span className="label">View More</span>
                    <span className="icon">
                        <img src={arrow} alt="" />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default Project;