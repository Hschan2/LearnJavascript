import React from 'react'
import Head from 'next/head'

const Headinfo = ({title, keyword, content}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta keyword={keyword} />
            <meta content={content} />
        </Head>
    )
}

Headinfo.defaultProps = {
    title: "Next JS",
    keyword: "Start, Next JS",
    content: "Start, Next JS"
}

export default Headinfo
