import { useState } from 'react'
import style from './page.module.scss'
import { FaArrowRight } from 'react-icons/fa'

export default function Home() {
    return (
        <>
        <div className={style.home}>
            <div className={style.titleContainer}>
                <h1>직장인 <span style={{ color: '#25c871' }}>동기부여</span> 타이머</h1>
                <span>일한 시간만큼 월급을 계산해서 표시해 직장인들에게 동기부여를 해 줍니다.</span>
            </div>
            <a href='/t' style={{ textDecoration: 'none' }}>
                <button className={style.letsStart}>
                    <span>타이머 시작하기</span>
                    <FaArrowRight/>
                </button>
            </a>
        </div>
        </>
    )
}
