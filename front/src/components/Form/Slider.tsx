import { Box, Slider as ChakraSlider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react"

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const Slider = ({ value, onChange }: SliderProps) => {
  return (
    <Box pt={6} pb={2}>
      <ChakraSlider aria-label='slider-ex-6' onChange={onChange}>
        <SliderMark
          value={value}
          textAlign='center'
          bg='pink.500'
          color='white'
          mt='-10'
          ml='-5'
          w='12'
        >
          {value}%
        </SliderMark>
        <SliderTrack w='100%'>
          <SliderFilledTrack bg='pink.500' />
        </SliderTrack>
        <SliderThumb />
      </ChakraSlider>
    </Box>
  )
}