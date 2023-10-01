import { Stack } from "@chakra-ui/react";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { RiUpload2Line, RiDashboardLine } from "react-icons/ri";

export function SidebarNav() {
  return (
    <Stack spacing={"12"} align={"flex-start"}>
      <NavSection title={"Geral"}>
        <NavLink href={"/dashboard"} icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink href={"/carregar-dados"} icon={RiUpload2Line}>Carregar arquivo</NavLink>
      </NavSection>
    </Stack>
  )
}