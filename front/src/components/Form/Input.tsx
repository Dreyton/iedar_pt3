import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export const InputBase: ForwardRefRenderFunction<FieldValues, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor="password">{label}</FormLabel> }
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor={"gray.900"}
        variant={"filled"}
        _hover={{
          bgColor: "gray.900"
        }}
        size={"lg"}
        ref={ref}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message as string}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)