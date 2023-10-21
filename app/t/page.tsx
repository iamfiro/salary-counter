'use client'

import style from './page.module.scss'
import { useEffect, useState } from 'react';
import DataModal from './modal/data';
import { BsFillPlayFill } from 'react-icons/bs';
import { numberWithCommas } from '@/lib/format';
import { BsFillPauseFill } from 'react-icons/bs';

const time10Under = (time: number) => {
    return time < 10 ? `0${time}` : time;
}

export default function Timer() {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [time, setTime] = useState(0);
    const [money, setMoney] = useState(0);
    const [status, setStatus] = useState<'start' | 'stop' | 'pause'>('stop');

    useEffect(() => {
        let intervalId: any;
        if (status === 'start') {
            // 10ms마다 time state를 1씩 증가시키는 setInterval 함수를 실행
            intervalId = setInterval(() => {
                setTime(time + 1);
            }, 10);
        }
        // cleanup 함수에서 setInterval 함수를 clear
        return () => clearInterval(intervalId);
    }, [status, time]);

    const hours = Math.floor(time / 360000);

    const minutes = Math.floor((time % 360000) / 6000);

    const seconds = Math.floor((time % 6000) / 100);

    useEffect(() => {
        setMoney(money + Math.floor(parseInt(localStorage.getItem('salary') || '0') / parseInt(localStorage.getItem('day') || '0') / 24 / 60));
    }, [seconds])

    // 타이머 시작, 일시정지, 정지 함수
    const start = () => {
        setStatus('start');
    };

    const stop = () => {
        setStatus('stop');
    };

    const pause = () => {
        setStatus('pause');
    };

    // 타이머 초기화 함수
    const reset = () => {
        setTime(0);
    };

    return (
        <>
            <main className={style.home}>
                <section>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={style.time}>{time10Under(hours)}:{time10Under(minutes)}:{time10Under(seconds)}</span>
                        <span className={style.money}>{numberWithCommas(money) || 0}원</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {
                            // 타이머가 정지 상태일 때 시작 버튼 렌더링
                            status === 'stop' && <button className={style.timerStartButton} onClick={() => { setIsModal(true) }}><BsFillPlayFill />시작</button>
                        }
                        {
                            // 타이머가 시작 상태일 때 일시정지 버튼 렌더링
                            status === 'start' && <button className={style.timerPauseButton} onClick={() => { pause(); }}><BsFillPauseFill />일시정지</button>
                        }
                        {
                            // 타이머가 일시정지 상태일 때 다시 시작 버튼 렌더링
                            status === 'pause' && <button className={style.timerStartButton} onClick={() => { start() }}><BsFillPlayFill />다시 시작</button>
                        }
                    </div>
                </section>
                <section>
                    s
                </section>
            </main>
            {
                // 데이터 입력 모달 렌더링
                isModal && <DataModal setState={setIsModal} resetTimer={() => {
                    reset()
                    setMoney(0)
                }} timerStart={() => start()} />
            }
        </>
    )
}