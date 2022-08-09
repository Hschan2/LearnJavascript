import { useEffect, useState } from 'react';

// 버튼 클릭 시, 페이지의 맨 위로 이동
export default function ToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) setShowButton(true);
            else setShowButton(false);
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            {showButton && (
                <button onClick={scrollToTop} className="toTop">
                    &#8679;
                </button>
            )}

            <style jsx>{`
                .toTop {
                    position: fixed;
                    bottom: 50px;
                    right: 50px;
                    font-size: 30px;
                    background: tomato;
                    color: white;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    border: none;
                    box-shadow: 0 5px 10px #ccc;
                }
            `}</style>
        </div>
    )
}