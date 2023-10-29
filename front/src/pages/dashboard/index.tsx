import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Charts } from "@/components/Charts/Charts";
import { Table } from "@/components/Table/Table";
import RootLayout from "@/components/RootLayout";
import React from "react";

export default function Dashboard() {
  return (
    <RootLayout>
      <Flex direction={"column"} h={"100vh"}>
        <Header />
        <Flex w={'100%'} my={'6'} maxWidth={1480} mx={'auto'} px={'6'}>
          <Sidebar />
          <Flex flexDirection={'column'} w={"100%"}>
            <SimpleGrid flex='1' gap={"4"} minChildWidth={"320px"} alignItems={"flex-start"}>
              <Charts />
              <Charts />
            </SimpleGrid>
            <Table />
          </Flex>
        </Flex>
      </Flex>
    </RootLayout>
  )
}