import React, { PropsWithChildren, ReactElement } from 'react';

export default async function Layout({
    children,
}: PropsWithChildren<unknown>): Promise<ReactElement> {
    const timestamp = new Date();
    return (
        <div>
            <div>Layout {timestamp.toISOString()}</div>
            <div>
                {children}
            </div>
        </div>
    );
}
