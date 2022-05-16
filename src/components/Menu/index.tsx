import { NavLink } from "solid-app-router"
import { RiSystemTimerFlashFill } from 'solid-icons/ri'
import { CgToday } from 'solid-icons/cg'

const NavLinkWithIcon = (props: any) => {
  return (
      <NavLink
        href={props.to}
        class="menu-button"
      >
        <div
          class="icon transition-all flex items-center justify-center w-12 h-12 bg-stone-700"
        >
        {props.children}
        </div>
      </NavLink>
      
  )
}

export default () => {
  return (
    <div class="absolute flex flex-col left-0 w-16 bottom-0 top-0 p-2 bg-stone-300 space-y-2">
      <NavLinkWithIcon to="/pomodoro">
        <RiSystemTimerFlashFill size="36" />
      </NavLinkWithIcon>
      <NavLinkWithIcon to="/timeblock">
        <CgToday size="36"/>
      </NavLinkWithIcon>
    </div>
  )
}
