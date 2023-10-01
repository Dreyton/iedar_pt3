import { Box, Flex, Heading, Select, Table as ChakaraTable, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Pagination } from "@/components/Pagination";
import { useApi } from "@/context/api-context";
import { useEffect, useState } from "react";

export const Table = () => {
  const { fetchAssociationsRules, apiData, rules } = useApi();
  const [selectedRule, setSelectedRule] = useState('');

  const handleRuleChange = (event: any) => {
    setSelectedRule(event.target.value);
  }

  const getNumberInPercentage = (number: number) => {
    const decimalNumber = number
    const numberInPercentage = decimalNumber * 100;
    return `${numberInPercentage.toFixed(0)}%`;
  }

  useEffect(() => {
    const fetchData = async () => {
     await fetchAssociationsRules(selectedRule);
    };
    if (selectedRule) fetchData();
  }, [selectedRule]);

  return (
    <Box borderRadius={8} bg={"gray.800"} p={"8"} mt={"4"}>
      <Flex mb={"8"} justify={"space-between"} align={"center"}>
        <Heading size={"lg"} fontWeight={"normal"}>Associações</Heading>
        <Select
          width={240}
          fontSize={"sm"}
          value={selectedRule}
          onChange={handleRuleChange}
          >
          {rules.data.map(rule => (
            <option key={rule} value={rule}>{rule}</option>
          ))}
        </Select>
      </Flex>
      <ChakaraTable colorScheme={"whiteAlpha"}>
        <Thead>
          <Tr>
            <Th>Produto antecedente</Th>
            <Th>Produto consequente</Th>
            <Th>Data de geração</Th>
            <Th>Confiança</Th>
            <Th width={"8"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          { apiData?.data.map((data, index) => {
            return (
              <Tr key={index}>
                <Td>
                  <Box>
                    <Box fontWeight={"bold"}>{data.antecedents}</Box>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Box fontWeight={"bold"}>{data.consequents}</Box>
                  </Box>
                </Td>
                <Td>{Intl.DateTimeFormat('pt-BR').format(new Date())}</Td>
                <Td>{getNumberInPercentage(data.confidence)}</Td>
              </Tr>
            )})}
        </Tbody>
      </ChakaraTable>
      <Pagination />
    </Box>
  )
}