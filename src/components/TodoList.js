import {
  HStack,
  VStack,
  Text,
  Flex,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

function TodoList({ todos, deleteTodo, editTodo }) {
  const [todo, setTodo] = useState("");
  const [modalValue, setModalValue] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function onClose() {
    setIsEditOpen(false);
    setIsDeleteOpen(false);
  }

  function handleEditClick(todo) {
    setIsEditOpen(true);
    setModalValue(todo);
  }

  function handleDeleteClick(todo) {
    setIsDeleteOpen(true);
    setModalValue(todo);
  }

  function handleEditInputChange(e) {
    setModalValue({ ...modalValue, text: e.target.value });
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    editTodo(modalValue.id, modalValue);
    setModalValue("");
    setIsEditOpen(false);
  }

  function handleDeleteSubmit() {
    deleteTodo(modalValue.id);
    setModalValue("");
    setIsDeleteOpen(false);
  }

  return !todos.length ? (
    <Badge colorScheme="purple" variant="outline" borderRadius="4" p="4" m="5">
      No todos for Today!!
    </Badge>
  ) : (
    <VStack>
      {todos.map((todo) => (
        <HStack spacing="24px" w="320px" key={todo.id}>
          <Flex p={6} w="300px" h="50px" justifyContent="space-between">
            <Text>{todo.text}</Text>

            <Flex w="10px">
              <DeleteIcon
                color="red.500"
                mr="2"
                onClick={() => handleDeleteClick(todo)}
              />
              <EditIcon onClick={() => handleEditClick(todo)} />
            </Flex>

            {/* modal for editing a todo */}
            <Modal isOpen={isEditOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Your Todo</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleEditSubmit}>
                  <ModalBody>
                    <Input
                      value={modalValue.text}
                      key={modalValue.id}
                      variant="outline"
                      type="text"
                      placeholder="Update your todo..."
                      onChange={handleEditInputChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button type="submit" colorScheme="teal" mr={3}>
                      Update
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* modal for deleting a todo */}
            <Modal isOpen={isDeleteOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Your Todo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this todo?
                  <Text mt={2} fontWeight="bold">
                    {modalValue.text}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleDeleteSubmit}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </HStack>
      ))}
    </VStack>
  );
}

export default TodoList;
