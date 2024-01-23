import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { banks } from "../../data/constants";
const SuspectForm = ({ formData, onChange }: any) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6 items-center">
        <Select
          label="Bank/ (Wallet/ PG/ PA) /Merchan/शंका जनक बैंक का नाम"
          placeholder="--Select--"
          size="lg"
          labelPlacement="outside"
          isRequired
          variant="bordered"
          classNames={{
            trigger: "bg-white",
          }}
          onChange={(value) => onChange("suspectBank", value.target.value)}
          selectedKeys={new Set([formData.suspectBank])}
          disabledKeys={new Set(["--Select--"])}
          items={banks}
        >
          {(bank) => <SelectItem key={bank.value}>{bank.name}</SelectItem>}
        </Select>
      </div>
      <div className="flex flex-col md:flex-row md:gap-6 gap-12">
        <Input
          label="Account No./Wallet Id/Merchant Id/UPI Id/शंका जनक खाता संख्या"
          placeholder="Enter account number"
          type="number"
          value={formData.suspectAccountNumber}
          onChange={(e) => onChange("suspectAccountNumber", e.target.value)}
          isRequired
          variant="bordered"
          color="primary"
          labelPlacement="outside"
          size="lg"
        />
        <Input
          label="Transaction ID / UTR Number as (12 Digit number. Ex 109265321525)."
          placeholder="Enter transaction ID"
          type="number"
          value={formData.suspectTransactionId}
          onChange={(e) => onChange("suspectTransactionId", e.target.value)}
          isRequired
          variant="bordered"
          color="primary"
          labelPlacement="outside"
          size="lg"
        />
      </div>

      <div className="flex gap-6 md:w-1/2">
        <Input
          label="Suspect Phone Number"
          placeholder="Enter suspect phone number"
          type="number"
          value={formData.suspectPhoneNumber}
          onChange={(e) => onChange("suspectPhoneNumber", e.target.value)}
          isRequired
          variant="bordered"
          color="primary"
          labelPlacement="outside"
          size="lg"
        />
      </div>
    </div>
  );
};

export default SuspectForm;
