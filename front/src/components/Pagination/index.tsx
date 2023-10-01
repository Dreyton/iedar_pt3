import { Box, Stack } from "@chakra-ui/react";
import { PaginationItems } from "./PaginationItems";

export function Pagination() {
  return (
    <Stack
      direction={['column', 'row']}
      mt={"8"}
      justify={"space-between"}
      align={"center"}
      spacing={6}
    >

      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction={"row"} spacing={2}>
        <PaginationItems number={1} isCurrent={true} />
        <PaginationItems number={2} />
        <PaginationItems number={3} />
        <PaginationItems number={4} />
        <PaginationItems number={5} />
      </Stack>
    </Stack>
  )
}