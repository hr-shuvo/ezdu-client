import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function RenderMath({ html }: { html: string }) {
    const ref = useRef<any>(null);

    useEffect(() => {
        if (!ref.current) return;

        const mathSpans = ref.current.querySelectorAll('span[data-latex]');
        mathSpans.forEach((span:any) => {
            const latex = span.getAttribute('data-latex') || '';
            const displayMode = span.getAttribute('data-type') === 'block-math';
            katex.render(latex, span, { throwOnError: false, displayMode });
        });
    }, [html]);

    return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
