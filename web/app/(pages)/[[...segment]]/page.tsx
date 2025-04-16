import { revalidatePath } from "next/cache";
import { draftMode } from "next/headers";

type Params = {
    segment: Array<string>;
}

type Props = {
    params: Params;
}

const getQuote = async (): Promise<string> => {
    const response = await fetch(
        'https://nicolas-cage-quotes.onrender.com/quotes?t=1',
        {
            next: {
                tags: ['page', 'all'],
            },
        }
    );

    return (await response.json())[0];
};

// export const revalidate = 30;

export default async function Page({ params }: Props) {
    const url = `/${(params.segment || []).join('/')}`;
    // Server Action
    async function refresh() {
        'use server'
    
        revalidatePath('/', 'layout');
    }
    const timestamp = new Date();
    const quote = await getQuote();
    const isDraftMode = draftMode().isEnabled;
    console.log('Rendering Page', { url, date: timestamp });

    return <>
        <div id="test">{timestamp.toISOString()}</div>
        <div id="quote">{quote}</div>
        <div id="preview">Draft Mode: {isDraftMode ? 'Yes' : 'No'}</div>
        <form action={refresh}>
            <button type="submit">Submit</button>
        </form>
    </>;
}

export async function generateStaticParams() {
    console.log('generateStaticParams');

    return [];
}