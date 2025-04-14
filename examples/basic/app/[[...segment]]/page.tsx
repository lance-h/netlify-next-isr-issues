type Params = {
    segment: Array<string>;
}

type Props = {
    params: Params;
}

const getQuote = async (): Promise<string> => {
    const response = await fetch('https://nicolas-cage-quotes.onrender.com/quotes', {
        next: {
            tags: ['all']
        }
    });

    return (await response.json())[0];
}

export default async function Page({ params }: Props) {
    const url = `/${(params.segment || []).join('/')}`;
    const timestamp = new Date();
    const quote = await getQuote();
    console.log('Building Page.', { url, date: timestamp });

    return <><div id="test">{timestamp.toISOString()}</div><div id="quote">{quote}</div></>;
}

export async function generateStaticParams() {
    console.log('generateStaticParams');

    const pages = ['one', 'two', 'three'];

    return pages.map((segment) => ({
        segment: [segment]
    }));
}