import { NextRequest, NextResponse } from 'next/server'
import { FRONTEND_URL } from '@/constants/config'

export function middleware(request: NextRequest) {
   // const { url, cookies } = request
   //
   // if (request.nextUrl.pathname.startsWith('/admin') && !cookies.has('token')) {
   //    return NextResponse.rewrite(new URL('/admin/login', request.url))
   // }
   //
   // return NextResponse.redirect(`${FRONTEND_URL}/admin/login`)
}
