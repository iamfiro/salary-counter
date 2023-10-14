import './globals.css'
import style from './layout.module.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { BsArrowRightShort } from 'react-icons/bs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '직장인 동기부여 타이머',
    description: '일한 시간만큼 월급을 계산해서 표시해 직장인들에게 동기부여를 해 줍니다.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <a href='https://firos.dev' style={{ textDecoration: 'none' }} target='_blank'>
                    <header className={style.header}>
                        <span style={{ color: 'var(--sub-color)' }}>바로가기</span>
                        <span>개발자 프로필 방문하기</span>
                        <BsArrowRightShort style={{ color: 'var(--sub-color)', width: '25px', height: '25px', marginLeft: '5px' }} />
                    </header>
                </a>
                {children}
            </body>
        </html>
    )
}
