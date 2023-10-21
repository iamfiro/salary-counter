'use client'
import { SetStateAction, useState } from 'react';
import style from './data.module.scss'
import { PiTimerBold } from 'react-icons/pi';
import { numberWithCommas } from '@/lib/format';
import { IM_Fell_DW_Pica_SC } from 'next/font/google';

const numberRegex = /^\d+$/

interface Ioptions {
    value: number;
    label: string
}

function testNumberRegex(value: number) {
    if (!numberRegex.test(value.toString())) return true;
    if (value < 10000) return true
}

const options = [
    { value: 1, label: '1일' },
    { value: 2, label: '2일' },
    { value: 3, label: '3일' },
    { value: 4, label: '4일' },
    { value: 5, label: '5일' },
    { value: 6, label: '6일' },
    { value: 7, label: '7일' },
    { value: 8, label: '8일' },
    { value: 9, label: '9일' },
    { value: 10, label: '10일' },
    { value: 11, label: '11일' },
    { value: 12, label: '12일' },
    { value: 13, label: '13일' },
    { value: 14, label: '14일' },
    { value: 15, label: '15일' },
    { value: 16, label: '16일' },
    { value: 17, label: '17일' },
    { value: 18, label: '18일' },
    { value: 19, label: '19일' },
    { value: 20, label: '20일' },
    { value: 21, label: '21일' },
    { value: 22, label: '22일' },
    { value: 23, label: '23일' },
    { value: 24, label: '24일' },
    { value: 25, label: '25일' },
    { value: 26, label: '26일' },
    { value: 27, label: '27일' },
    { value: 28, label: '28일' },
    { value: 29, label: '29일' },
    { value: 30, label: '30일' },
    { value: 31, label: '31일' },
]

interface IDataModalProps {
    setState: (value: React.SetStateAction<boolean>) => void;
    timerStart: () => void;
    resetTimer: () => void;
}

export default function DataModal({ setState, timerStart, resetTimer }: IDataModalProps) {
    const [day, setDay] = useState<string>(localStorage.getItem('day') ?? '1');
    const [salary, setSalary] = useState<number>(parseInt(localStorage.getItem('salary') ?? '10000'));

    return (
        <>
            <section className={style.backdrop} onClick={() => setState(false)}>
                <div className={style.modal} onClick={e => e.stopPropagation()}>
                    <header>
                        <div className={style.icon}>
                            <PiTimerBold />
                        </div>
                        <span className={style.title}>타이머 세팅하기</span>
                    </header>
                    <span className={style.itemTitle}>1달에 며칠 일하시나요?</span>
                    <select className={style.option} defaultValue={localStorage.getItem('day')?.toString()} onChange={(e) => setDay(e.target.value)}>
                        {
                            options.map((option, index) => {
                                return <option key={index} value={option.value}>{option.label}</option>
                            })
                        }
                    </select>
                    <span className={style.itemTitle}>월급을 알려주세요 (최소 10,000원)</span>
                    <input
                        type="number"
                        className={style.input}
                        defaultValue={localStorage.getItem('salary')?.toString()}
                        maxLength={10}
                        onChange={(e) => {
                            if (e.target.value.length > e.target.maxLength) {
                                e.target.value = e.target.value.slice(0, e.target.maxLength);
                            }
                            setSalary(parseInt(e.target.value));
                        }}
                    />
                    <span className={style.value}>{numberWithCommas(salary) || 0}원</span>
                    <button className={style.button} disabled={testNumberRegex(salary)} onClick={() => {                        
                        if(day?.toString() === '0') {
                            localStorage.setItem('day', '1');
                        } else {
                            localStorage.setItem('day', day || '1');
                        }
                        localStorage.setItem('salary', salary?.toString() || '10000');
                        setState(false)
                        resetTimer()
                        timerStart()
                    }}>타이머 시작하기</button>
                </div>
            </section>
        </>
    )
}