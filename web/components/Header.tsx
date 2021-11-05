import React from "react";

import { Button } from "@geist-ui/react";
import styles from "../styles/components.module.css";

const Header: React.FC = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(0.1, 0, 0, -0.1, -14.322343, 472.709381)" fill="#000000" stroke="none">
                        <path d="M1422 4100 c-38 -9 -68 -34 -88 -72 -21 -41 -21 -2992 0 -3043 28 -66 128 -97 187 -57 14 9 239 243 499 520 261 276 478 501 482 500 4 -2 222 -230 483 -508 262 -278 488 -510 503 -517 63 -28 134 -3 172 59 20 33 20 54 20 1521 0 1648 5 1531 -64 1580 l-31 22 -1065 2 c-586 0 -1080 -2 -1098 -7z m1988 -1491 c0 -754 -4 -1219 -9 -1217 -6 2 -159 163 -342 358 -183 195 -372 394 -420 443 -86 86 -87 87 -136 87 -36 0 -58 -6 -77 -21 -15 -12 -205 -211 -423 -443 -218 -231 -400 -422 -405 -424 -4 -2 -8 546 -8 1217 l0 1221 910 0 910 0 0 -1221z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M1582 678 c-32 -32 6 -76 54 -64 18 5 24 13 24 35 0 39 -50 57 -78 29z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M2080 490 l0 -190 45 0 45 0 0 44 c0 39 11 56 35 56 2 0 17 -22 34 -50 30 -49 32 -50 78 -49 27 0 42 3 35 6 -6 2 -10 9 -7 14 3 5 -12 35 -35 68 -22 33 -40 64 -40 70 0 5 20 34 46 65 l45 56 -48 0 c-48 0 -49 -1 -98 -65 -27 -36 -50 -65 -51 -65 -1 0 1 52 4 115 l5 115 -47 0 -46 0 0 -190z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M3670 490 l0 -190 45 0 45 0 0 44 c0 39 11 56 35 56 2 0 17 -22 34 -50 l31 -50 52 1 c29 1 45 3 35 6 -9 2 -15 8 -13 12 3 4 -13 36 -34 72 -22 35 -40 67 -40 70 0 3 15 26 34 50 19 23 32 47 29 53 -3 5 -1 6 5 2 6 -3 13 -2 17 4 4 6 -12 10 -42 10 -45 -1 -50 -3 -83 -46 -75 -98 -68 -101 -62 29 l5 117 -47 0 -46 0 0 -190z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M1280 480 l0 -180 115 0 115 0 0 35 0 35 -70 0 -70 0 0 145 0 145 -45 0 -45 0 0 -180z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M2690 479 l0 -182 94 6 c107 6 148 22 166 66 18 45 -2 100 -41 113 -7 2 -2 14 14 31 32 31 35 75 10 106 -22 27 -77 40 -170 41 l-73 0 0 -181z m167 95 c10 -26 -11 -49 -46 -52 -30 -3 -31 -2 -31 32 0 34 2 36 35 36 24 0 38 -5 42 -16z m-9 -130 c12 -8 22 -21 22 -29 0 -23 -30 -45 -61 -45 -28 0 -29 2 -29 45 0 40 2 45 23 45 12 0 33 -7 45 -16z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M1570 440 l0 -140 45 0 45 0 0 140 0 140 -45 0 -45 0 0 -140z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M1740 440 l0 -140 45 0 45 0 0 94 c0 101 9 120 52 114 21 -3 24 -10 33 -100 7 -67 7 -99 0 -102 -5 -2 11 -5 38 -5 l47 -1 0 113 c-1 72 -5 118 -13 128 -32 42 -99 51 -140 19 -14 -11 -27 -20 -30 -20 -3 0 -7 9 -10 20 -4 15 -14 20 -36 20 l-31 0 0 -140z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M2448 564 c-15 -8 -31 -26 -34 -41 -12 -46 7 -75 69 -105 84 -42 70 -71 -25 -51 l-48 10 0 -33 c0 -30 3 -34 36 -40 19 -3 56 -4 82 -1 70 8 108 62 86 122 -4 9 -33 29 -65 46 -75 37 -77 54 -5 46 49 -5 54 -3 64 18 10 21 8 25 -20 34 -43 15 -108 13 -140 -5z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M3072 560 c-85 -52 -80 -199 8 -242 98 -50 200 13 200 122 0 111 -114 177 -208 120z m102 -56 c35 -34 13 -144 -27 -144 -32 1 -42 20 -42 80 0 43 4 63 15 70 22 14 36 12 54 -6z" style={{ fill: "rgb(95, 117, 255)" }} />
                        <path d="M3403 566 c-40 -18 -66 -68 -67 -126 0 -108 100 -171 198 -125 45 22 66 62 66 129 0 50 -4 61 -33 92 -28 31 -41 37 -83 40 -29 3 -62 -1 -81 -10z m95 -58 c17 -17 15 -123 -3 -138 -37 -31 -79 18 -71 83 7 60 43 86 74 55z" style={{ fill: "rgb(95, 117, 255)" }} />
                    </g>
                </svg>
                <h1>LinksBook</h1>
            </div>
            <nav>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#credits">Credits</a>
            </nav>
            <Button type="success">
                Take Action
            </Button>
        </header>
    )
}

export default Header;