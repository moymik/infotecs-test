'use client';
import {useEffect, useState} from 'react';

type Heading = {
    id: string;
    text: string;
    level: number;
};

export default function HeadingNavigation() {
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        const selector = 'h2 > a[id], h3 > a[id], h4 > a[id]';
        const headingElements = Array.from(document.querySelectorAll(selector));

        const mapped: Heading[] = headingElements.map((a) => {
            const headingTag = a.parentElement as HTMLElement;
            return {
                id: a.id,
                text: headingTag.textContent?.trim() || '',
                level: parseInt(headingTag.tagName.slice(1), 10),
            };
        });

        setHeadings(mapped);
    }, []);

    return (
        <nav aria-label="Table of contents" className="space-y-2">
            <ul>
                {headings.map(({id, text, level}) => (
                    <li key={id} className={`ml-${(level - 2) * 4}`}>
                        <a href={`#${id}`} className="text-blue-600 hover:underline">
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
