import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const ModalSuggestions: React.FC<any> = ({ text }) => {
  const [isOpen, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Split the text based on newline characters
  const suggestionLines = text.split("\n");

  return (
    <>
      <Button onClick={handleOpen} color="primary">
        See AI Suggested Steps.
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleClose}
        scrollBehavior="inside"
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>
            Your personalised AI Suggestions that will help you in your case
          </ModalHeader>
          <ModalBody>
            {/* Map over the array of lines and create a div for each */}
            {suggestionLines.map(
              (
                line:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <div key={index}>{line}</div>
              )
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSuggestions;
