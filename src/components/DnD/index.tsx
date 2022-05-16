import * as SDD from 'solid-dnd-directive'

interface DnDProps {
  items: any
  onConsider: (event: any) => void
  onFinalize: (event: any) => void
  children?: any
}

export default ({ children, items, onConsider, onFinalize }: DnDProps) => {
  const dndzone = SDD.dndzone
  return (
    <div use:dndzone={{ items }} on:consider={onConsider} on:finalize={onFinalize}>
      {children}
    </div>
  )
}
