import { Box, Button, Modal as ChakraModal, CircularProgress, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { Table } from "../Table/Table"
import { useApi } from "@/context/api-context";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ModalProperties {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose }: ModalProperties) => {
  const { fetchSaveAssociationRules, apiData } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit } = useForm<FormData>();
  const toast = useToast()
  const { push } = useRouter()

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await fetchSaveAssociationRules(apiData.data);
      setTimeout(() => {
        setIsLoading(false);
        push('/dashboard');
        onClose();
        toast({
          status: "success",
          title: "Regras salvas com sucesso!",
        })
      }, 2000);
    } catch (error: any) {
      toast({
        status: "error",
        title: error.message,
      })
    }
  };

  return (
    <ChakraModal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Regras geradas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        </ModalBody>
        {isLoading
          ? <Box borderRadius={8} bg={"gray.800"} p={"8"} mt={"4"} flex={1} position={"relative"}>
              <CircularProgress isIndeterminate color='pink.400' size='100px' position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)' zIndex={1} />
              <Table isModal={true} style={true} />
            </Box>
          : <Table isModal={true} />}
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Descartar
          </Button>
          <Button type="submit" colorScheme='pink' onClick={handleSubmit(onSubmit)}>Salvar</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}