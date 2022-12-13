/**
 * Code Splitting으로 React App 속도 올리기
 */

// Function Splitting
// sum.js 파일이라는 가정
export function sum(a, b) {
    return a + b;
}

function Home() {
    return (
        <>
            <button onClick={() => {
                import('./sum.js').then(module => {
                    alert(module.sum(2, 2));
                })
            }}>2 + 2 더하기</button>
        </>
    )
}

// 컴포넌트 Splitting
// 기존 방법
import Sum from './components/Sum';

// Splitting 방법
import React, { lazy, Suspense, useState } from 'react';
const Sum = lazy(() => import('./components/Sum'));
const SumWait = lazy(() => wait(1000).then(import('./components/Sum'))); // 1초 뒤 import

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

function NavWrapper() {
    return (
        <>
            {/* 처음 실행 시 다운로드 후 다음부터는 다운로드 X(처음만 로딩 필요), fallback은 다운로드 실패 시 출력 */}
            <Suspense fallback={<h1>로딩중...</h1>}>
                <Outlet />
            </Suspense>
        </>
    )
}

// default export가 아닌 export일 경우
export function About() {
    return (
        <div>About</div>
    )
}

// 아래처럼 import
const About = lazy(() => import('./components/About').then(module => {
    return { default: module.About };
}));

// Conditional Splitting, Advanced Code Splitting
import React, { lazy, Suspense, useState, useTransition } from 'react';
const AdminData = lazy(() => import('./AdminData').then(module => {
    return { default: module.AdminData };
}));

function Home() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPending, startTransition] = useTransition(); // 급하지 않는 업데이트를 정할 때. 즉, 업데이트 순서로는 뒷순서로 급한 업데이트가 발생할 경우 정지

    return (
        <>
            <button onClick={() => {
                startTransition(() => {
                    setIsAdmin(prev => !prev)
                })
            }}>토글</button>
            <Suspense fallback={<h2>로딩중...</h2>}>
                {isAdmin ? <AdminData /> : <h2>Not Admin</h2>}
            </Suspense>
        </>
    )
}

// Lazy 로드를 위한 컴포넌트를 제작하기
function lazyLoad(path, namedExport) {
    return lazy(() => {
        const promise = import(path);
        if (namedExport == null) {
            return promise;
        } else {
            return promise.then(module => ({
                default: module[namedExport]
            }))
        }
    })
}

// 실제 사용
const LazyAdminData = lazyLoad('./components/About', 'About');