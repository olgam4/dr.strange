import { NavLink } from "solid-app-router"
import { RiSystemTimerFlashFill } from 'solid-icons/ri'
import { CgToday } from 'solid-icons/cg'

export default () => {
  return (
    <div class="absolute flex flex-col left-0 w-16 bottom-0 top-0 p-2 bg-stone-300 space-y-2">
      <NavLink href="/pomodoro" class="flex items-center justify-center w-12 h-12 rounded-md bg-stone-700" activeClass="bg-stone-500">
        <RiSystemTimerFlashFill size="36"/>
      </NavLink>
      <NavLink href="/timeblock" class="flex items-center justify-center w-12 h-12 rounded-md bg-stone-700" activeClass="bg-stone-500">
        <CgToday size="36"/>
      </NavLink>
    </div>
  )
}
