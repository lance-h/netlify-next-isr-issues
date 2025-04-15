import React, { PropsWithChildren, ReactElement } from 'react';

const getQuote = async (): Promise<string> => {
    const response = await fetch('https://nicolas-cage-quotes.onrender.com/quotes?t=2', {
        next: {
            tags: ['layout', 'all']
        }
    });

    return (await response.json())[0];
}

export default async function Layout({
    children,
}: PropsWithChildren<unknown>): Promise<ReactElement> {
    //   const preview = previewMode();
    const quote = await getQuote();
    const timestamp = new Date();
    return (
        <div>
            <div>Layout {timestamp.toISOString()} {quote}</div>
            <div>
                {children}
            </div>
        </div>
    );
}
