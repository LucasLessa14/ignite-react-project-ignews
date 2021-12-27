import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter()

  let className: string;
  
  if (asPath === rest.href
   || rest.href === '/posts' && asPath.includes('/posts')) {
    className = activeClassName
  } else {
    className = ''
  }
  
  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  )
}