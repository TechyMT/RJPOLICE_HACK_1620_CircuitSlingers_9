import React, { useEffect, useState } from "react";
import { WindupChildren } from "windups";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Spinner,
} from "@nextui-org/react";
import { publicUrl } from "@/app/utils/publicURL";
import useAuthStore from "@/app/utils/auth";

const ModalSuggestions: React.FC<any> = ({ suggestions }) => {
  const caseDetails = useAuthStore(
    (state: { caseDetails: any }) => state.caseDetails
  );

  const fetchData = async () => {
    try {
      const suggestions = await fetch(`${publicUrl()}/report/getInformation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackId: caseDetails.trackId,
          category: caseDetails.category,
          description: caseDetails.description,
        }),
      });
      console.log("text", suggestions);
      setText(await suggestions.json());
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const [isOpen, setOpen] = React.useState(false);
  const handleOpen = () => {
    setLoading(true);
    setOpen(true);
    if (!suggestions) {
      fetchData();
    } else {
      setText(suggestions);
      setLoading(false);
    }
  };
  const handleClose = () => setOpen(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  console.log("caseDetails", caseDetails);
  // keeping for production
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const suggestions = await fetch(
  //         `${publicUrl()}/report/getInformation`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             trackId: caseDetails.trackId,
  //             // category: caseDetails.category,
  //             description: caseDetails.description,
  //           }),
  //         }
  //       );

  //       console.log("text", suggestions);
  //       setText(await suggestions.json());
  //     } catch (error) {
  //       console.error("Error fetching suggestions:", error);
  //     } finally {
  //       setLoading(false); // Set loading to false once data is fetched
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Split the text based on newline characters
  let suggestionLines: any[] = [];
  if (text) {
    suggestionLines = text.split("\n");
  }

  return (
    <>
      <Button onClick={handleOpen} color="primary" size="lg">
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
            {loading ? (
              <Spinner size="lg" />
            ) : (
              // Map over the array of lines and create a div for each

              <WindupChildren>
                <div style={{ whiteSpace: "pre-line" }}>{text}</div>
              </WindupChildren>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSuggestions;
