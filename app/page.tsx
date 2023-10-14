import { useState } from 'react'
import style from './page.module.scss'
import { FaArrowRight } from 'react-icons/fa'

export default function Home() {
    return (
        <>
        <div className={style.home}>
            <div className={style.titleContainer}>
                <h1>직장인 <span style={{ color: '#25c871' }}>동기부여</span> 타이머</h1>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</span>
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
