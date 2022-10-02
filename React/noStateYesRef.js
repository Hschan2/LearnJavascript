import React, { useRef, useState } from 'react'

/**
 * State를 생성해서 파라미터로 전달하는 것보다 useRef 사용하기
 * 이유는 더 작고 더 짧고 확인하기 쉽다. 그리고 생성과 변경하기 전보다 쉽다.
 * 로그인 폼에 입력한 데이터를 확인하는 결과값은 같다.
 */
export const noStateYesRef = () => {
    /*
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function updateFormData(newData) {
        setFormData(prev => {
            return { ...prev, ...newData}
        })
    }
    */

    function onSubmit(formData) {
        console.log(formData);
    }

    return (
        <LoginForm onSubmit={onSubmit} />
        /*
        <LoginForm
            data={formData}
            updateData={updateFormData}
            onSubmit={onSubmit}
        />
        */
    )

}

// ({ onSubmit, data, updateData }) => ({ onSubmit })
export const LoginForm = ({ onSubmit }) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    /*
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }
    */

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="email" id="email" />
            {/* <input ref={emailRef} type="email" id="email" value={data.email} onChange={e => updateData({ email: e.target.value })} /> */}
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} type="password" id="password" />
            {/* <input ref={passwordRef} type="password" id="password" value={data.password} onChange={e => updateData({ email: e.target.value })} /> */}
            <button type="submit">Submit</button>
        </form>
    )
}