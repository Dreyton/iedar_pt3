import { Button, Modal as ChakraModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { Table } from "../Table/Table"

interface ModalProperties {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose }: ModalProperties) => {
  return (
    <ChakraModal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Regras geradas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        </ModalBody>
          <Table
            isModal={true}
          />
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Descartar
          </Button>
          <Button colorScheme='pink' >Salvar</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}