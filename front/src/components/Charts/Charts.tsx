import { Box, Text, theme } from "@chakra-ui/react"
import { Props } from "react-apexcharts";
import dynamic from "next/dynamic"
const ChartsGraphic = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options: Props = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500],
  },
  stroke: {
    curve: 'straight'
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  },
};

const series = [
  {
    name: "series1",
    data: [31, 120, 10, 28]
  }
];

export const Charts = () => {
  return (
    <Box
      p={['6', '8']}
      bg='gray.800'
      borderRadius='8'
      pb='4'
      overflow={'hidden'}
    >
      <Text fontSize={"lg"} mb={"4"}>Nome referente ao gráfico</Text>
      <ChartsGraphic
        series={series}
        options={options}
        type="area"
        height={160}
      />
    </Box>
  )
}