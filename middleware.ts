import { NextRequest, NextResponse } from 'next/server'

const username = process.env.PROTECTED_USERNAME || 'default'
const password = process.env.PROTECTED_PASSWORD
export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  const response = NextResponse.next()

  if (!username || !password) {
    return response
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === username && pwd === password) {
      return response
    }
  }

  url.pathname = '/api/unauthorized'

  return NextResponse.rewrite(url)
}
