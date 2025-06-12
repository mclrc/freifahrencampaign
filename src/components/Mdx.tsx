import { MDXRemote } from 'next-mdx-remote/rsc'
import Counter from './Counter'
import CountingAnimation from './content/CountingAnimation'

const components = {
  Counter,
  CountingAnimation,
}

interface MdxProps {
  source: string
}

export function Mdx({ source }: MdxProps) {
  return <MDXRemote source={source} components={components} />
} 