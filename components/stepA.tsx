"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { Progress } from "@nextui-org/react";

interface FormData {
  name: string;
  email: string;
  dob: string;
  aadhar: string;
  address: string;
  phone: string;
  apiName: string;
}

interface StepAProps {
  handleNextStep: () => void;
}

const initialState: FormData = {
  name: "",
  dob: "",
  aadhar: "",
  address: "",
  phone: "",
  email: "",
  apiName: "victim_details",
};
export const StepA: React.FC<StepAProps> = ({ handleNextStep }) => {
  const [serverData, setSeverData] = useState(null);
  const [formData, setFormData] = useState<FormData>(initialState);
  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("HMM");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <div className="flex justify-center max-w-3xl mx-auto mt-20">
        <Progress
          aria-label="Loading..."
          label="Step 1"
          value={0}
          className="max-w-md"
        />
      </div>
      <div className="flex justify-center items-center mt-8">
        <Card className="w-[700px] h-auto">
          <CardHeader className="flex justify-center">
            <p className="text-lg">Personal Details</p>
          </CardHeader>
          <form onSubmit={handleFormSubmit}>
            <CardBody>
              <div className="w-full flex flex-col gap-6 justify-center">
                <div>
                  <Input
                    size="md"
                    type="id"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    size="md"
                    type="id"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    size="md"
                    type="text"
                    label="Aadhar Number"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    type="phone"
                    label="Phone"
                    name="phone"
                    value={
                      formData.phone === "" ? "" : formData.phone.toString()
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    size="md"
                    type="text"
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="w-[135px]"
                    color="primary"
                    variant="shadow"
                    type="submit"
                    onClick={handleNextStep}
                  >
                    <p className="text-white">Next</p>
                  </Button>
                </div>
                {serverData && (
                  <div>
                    <h2>Server Response</h2>
                    <pre>{JSON.stringify(serverData, null, 2)}</pre>
                  </div>
                )}
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </div>
  );
};
