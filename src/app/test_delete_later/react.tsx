"use client";
import { useState } from "react";

// Типизация пропсов для Header
interface HeaderProps {
    title: string[];
}

function Header(props: HeaderProps) {
    const { title } = props
    return (
        <>
            <h5>Вариант вывода с точечной нотацией {props.title}</h5>
            <h5> Вариант вывода с шаблонным литералом {` ${title}`}</h5>
            <h5> Вариант вывода с .join
                {title.join(', ')}
            </h5>
        </>
    );
}


export default function About() {
    //В TypeScript угловые скобки < > используются для указания типа (generic type)
    //В React хуках (useState, useContext, useReducer и др.) они используются для строгой типизации.
    const [title, setTitle] = useState<string[]>(['Develop', 'Preview', 'Ship', 'Whatever']);
    
    function handleClick() {
        setTitle([...title, 'Click'])
    }
    return (
        <>
            <Header title={title} />
            <ul>
                {title.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
            А это просто текст
            <button onClick={handleClick}>Like</button>

        </>
    );
}