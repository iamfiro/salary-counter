'use client'

import style from './page.module.scss'
import { useEffect, useState } from 'react';
import useTimer from '@/hooks/useTimer';
import DataModal from './modal/data';
import { BsFillPlayFill } from 'react-icons/bs';
import { numberWithCommas } from '@/lib/format';
import { BsFillPauseFill } from 'react-icons/bs';

const time10Under = (time: number) => {
    return time < 10 ? `0${time}` : time;
}

export default function Timer() {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [money, setMoney] = useState(0);
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isTimerPause, setIsTimerPause] = useState(false);

    const { count, start, stop, pause, reset } = useTimer(0, 1000);

    const timer = () => {
        if(isTimerStart)
            setMoney(money + Math.floor(parseInt(localStorage.getItem('salary') || '0') / parseInt(localStorage.getItem('day') || '0') / 24 / 60))
        const checkMinute = Math.floor(count % 60);
        const hours = Math.floor(checkMinute / 60);
        const minutes =  Math.floor(count / 60);
        const seconds = Math.floor(checkMinute % 60);
        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
    }

    useEffect(timer, [count])
    
    return (
        <>
        <main className={style.home}>
            <section>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <span className={style.time}>{time10Under(hour)}:{time10Under(minute)}:{time10Under(second)}</span>
                    <span className={style.money}>{numberWithCommas(money) || 0}원</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    {
                        !isTimerStart && <button className={style.timerStartButton} onClick={() => {setIsModal(true)}}><BsFillPlayFill />시작</button>
                    }
                    {
                        (isTimerStart && !isTimerPause) && <button className={style.timerPauseButton} onClick={() => { pause(); setIsTimerPause(true) }}><BsFillPauseFill/>일시정지</button>
                    }
                    {
                        (isTimerStart && isTimerPause) && <button className={style.timerStartButton} onClick={() => { start(); setIsTimerPause(false) }}><BsFillPlayFill />다시 시작</button>
                    }
                </div>
            </section>
            <section>
s
            </section>
        </main>
        {
            isModal && <DataModal setState={setIsModal} resetTimer={() => {
                reset()
                setMoney(0)
            }} setTimerStart={setIsTimerStart} timerStart={() => start()}/>
        }
        </>
    )
}
