import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, Flex, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { RiUpload2Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi } from "@/context/api-context";
import { Slider } from "@/components/Form/Slider";
import { useRouter } from "next/navigation";
import { Input } from '@/components/Form/Input'
import { InfoIcon } from '@chakra-ui/icons'

const validationSchema = Yup.object().shape({
  dataset: Yup.mixed().required("Arquivo de dados é obrigatório"),
  rule_name: Yup.string().required("Nome da regra é obrigatório"),
});

interface FormData {
  dataset: File;
  rule_name: string;
  min_support: number;
  confiance: number;
}

export default function Dropzone() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [changeConfianceValueSlider, setChangeConfianceValueSlider] = useState(50);
  const [changeSupportValueSlider, setChangeSupportValueSlider] = useState(50);
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });
  const { fetchData, rules, setRules } = useApi();
  const toast = useToast()
  const { push } = useRouter()
  const watchFields = watch(["rule_name"]) // you can also target specific fields by their names

  const { acceptedFiles, getInputProps, getRootProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: any) => {
      const file = acceptedFiles[0];
      setValue('dataset', file);
    }, [setValue])
  })


  useEffect(() => {
    setSelectedFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  const onSubmit = async (data: FormData) => {
    try {
      await fetchData({
        dataset: selectedFile!,
        rule_name: data.rule_name,
        min_support: handleSupportValueChange(),
        confiance: handleConfianceValueChange()
      });
      toast({
        status: "success",
        title: "Regras geradas com sucesso!",
      })
      setRules({
        data: [...rules.data, data.rule_name]
      })
      setSelectedFile(undefined);
      setTimeout(() => {
        push('/dashboard');
      }, 3000);
    } catch (error: any) {
      toast({
        status: "error",
        title: error.message,
      })
    }
  };

  const changeValueConfianceSlider = (value: number) => {
    setChangeConfianceValueSlider(value);
  }
  const changeValueSupportSlider = (value: number) => {
    setChangeSupportValueSlider(value);
  }

  const handleSupportValueChange = (): number => {
    const value = changeSupportValueSlider
    if (value <= 50) {
      return 0.02
    }
    if (value > 50) {
      return 0.03
    }
    return 0.02
  }

  const handleConfianceValueChange = (): number => {
    return changeConfianceValueSlider / 100
  }

  return (
    <Box>
      <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" height="100%">
          <Sidebar />
          <Box flex={1}>
            <form onSubmit={handleSubmit(onSubmit)} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '64px'
            }}>
              <Box
                bg="gray.800"
                width="100%"
                maxW="500px"
                h={"100%"}
                border={ selectedFile ? '2px dashed #FF008E' : '2px dashed #666' }
                borderRadius="5px"
                padding="20px"
                textAlign="center"
                cursor="pointer"
                transition="all 0.3s ease-in-out"
                _hover={{
                  background: "rgba(255, 255, 255, 0.1)",
                }}
                {...getRootProps()}
              >
                <input
                  type="file"
                  {...register("dataset")}
                  {...getInputProps()}
                />
                <p>{selectedFile ? selectedFile.name : 'Carregar arquivo...'}</p>
                <RiUpload2Line
                  style={{
                    display: "block",
                    margin: "20px auto 0",
                  }}
                />
              </Box>
              { errors.dataset && (
                <Box mt="16px" color="red" fontSize="14px">
                  {errors.dataset?.message}
                </Box>
              )}
               <Stack
                w={"100%"}
                maxW={500}
                mt={"2"}
               >
                <Input
                  label="Nome da regra"
                  bg="gray.800"
                  width="100%"
                  maxW={500}
                  error={errors.rule_name}
                  {...register("rule_name")}
                />
               </Stack>

              <Button
                type="submit"
                mt={4}
                colorScheme="pink"
                size={'lg'}
                isLoading={isSubmitting}
                isDisabled={!selectedFile || watchFields[0].length <= 0}
              >
                Enviar
              </Button>
            </form>

            <Box
              borderRadius={8}
              bg={"gray.800"}
              p={"8"}
              mt={"4"}
            >
            <Flex
              mb={"8"}
              justify={"space-between"}
              align={"center"}
            >
              <Heading
                size={"lg"}
                fontWeight={"normal"}
              >
                Configurações
              </Heading>
            </Flex>

            <Box w={"100%"} maxW={"420px"}>
              <Flex alignItems={'center'} gap={'2'}>
                <p>confiança</p>
                <Popover>
                  <PopoverTrigger>
                    <InfoIcon
                      cursor={'pointer'}
                      _hover={{
                        color: 'pink.500'
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    bg={'gray.800'}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Informações</PopoverHeader>
                    <PopoverBody>
                      A confiança é a probabilidade de que uma regra seja verdadeira, dado que o antecedente é verdadeiro.
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              <Slider
                value={changeConfianceValueSlider}
                onChange={changeValueConfianceSlider}
              />
              <Flex alignItems={'center'} gap={'2'}>
                <p>Suporte</p>
                <Popover>
                  <PopoverTrigger>
                    <InfoIcon
                      cursor={'pointer'}
                      _hover={{
                        color: 'pink.500'
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    bg={'gray.800'}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Informações</PopoverHeader>
                    <PopoverBody>
                      O suporte é a probabilidade de que uma regra seja verdadeira.
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              <Slider
                value={changeSupportValueSlider}
                onChange={changeValueSupportSlider}
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}