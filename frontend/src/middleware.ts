import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: Request) {
    console.log("middleware")
    const cookieStore = await cookies(); // Await here to get the cookie store
    const userToken = cookieStore.get('userToken');
    console.log(userToken)

    if (!userToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/patients', '/patients/:path*'],
};
