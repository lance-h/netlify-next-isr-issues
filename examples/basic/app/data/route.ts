import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    if (action === 'nuke') {
        console.log('Nuking');
        revalidateTag('all');
        return NextResponse.json({ message: 'Nuked', timestamp: new Date() });
    } else if (action === 'revalidatepath') {
        const path = searchParams.get('path') || ''
        const type = searchParams.get('type') ?? undefined;
        console.log('Revalidating', path);
        revalidatePath(path, type as any);
        return NextResponse.json({ message: `Revalidated ${path}`, timestamp: new Date() });
    } else if (action === 'tag') {
        const tag = searchParams.get('tag') ?? '';
        console.log('revalidateTag', tag);
        revalidateTag(tag);
        return NextResponse.json({ message: `revalidateTag(${tag})`, timestamp: new Date() });
    }

    return new Response(undefined, { status: 400 });
}