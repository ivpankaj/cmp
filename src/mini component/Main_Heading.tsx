import React from 'react'


interface Heading {
    text: string
    minitext?: string
    subtext?: string
}
const Main_Heading: React.FC<Heading> = ({ text, minitext, subtext }) => {


    return (
        <>
            <div >
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight text-center">
                    <span className="inline-block animate-fade-in-up">{text}</span>{' '}
                    <span className="inline-block animate-fade-in-up animation-delay-200">{minitext}</span>{' '}
                    <span className="inline-block animate-fade-in-up animation-delay-400">{subtext}</span>
                </h1>

            </div>
        </>
    )
}

export default Main_Heading