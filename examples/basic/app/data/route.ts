import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    if (action === 'nuke') {
        console.log('Nuking');
        // revalidatePath('/[[...segment]]', 'page');
        revalidateTag('all');
        return NextResponse.json({ message: 'Nuked', timestamp: new Date() });
    } else if (action === 'revalidatepath') {
        const path = searchParams.get('path') || ''
        console.log('Revalidating', path);
        revalidatePath(path);
        return NextResponse.json({ message: `Revalidated ${path}`, timestamp: new Date() });
    } else if (action === 'tag') {
        const tag = searchParams.get('tag') ?? '';
        console.log('revalidateTag', tag);
        revalidateTag(tag);
        return NextResponse.json({ message: `revalidateTag(${tag})`, timestamp: new Date() });
    }

    return new Response(undefined, { status: 400 });
}