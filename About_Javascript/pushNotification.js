/**
 * 웹에서 알람 푸시 적용하기
 */

const button = document.querySelector("button")

/**
 * Notification, 푸시할 수 있는 알람 API
 */
button.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            const notification = new Notification("푸시 알람 예시 제목", {
                body: "푸시 알람 테스트 내용",
                data: {
                    hello: "World"
                },
                icon: "./SPA/assets/icon-heart.svg",
                // 여러 번 푸시해도 한 번만 알람창이 뜨도록
                tag: "환영 메세지"
            })

            notification.addEventListener("error", e => {
                alert("error")
            })
        }
    })
})

/**
 * 새로운 탭으로 이동했을 경우 발생하는 알람
 */
let notification
let interval
let alert = false
    
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        const leaveTime = new Date()

        interval = setInterval(() => {
            notification = new Notification("기존 탭으로 이동 요청", {
                body: `기존 탭으로 되돌아가주세요. ${Math.round((new Date() - leaveTime) / 1000)}초 경과`,
                tag: "Please comeback previous tab",
            })

            document.title = alert ? "푸시 알람" : "(1) New Message"
            alert = !alert
        }, 100)
    } else {
        if (interval) clearInterval(interval)
        if (notification) notification.close();
        if (alert) alert = false
    }
})