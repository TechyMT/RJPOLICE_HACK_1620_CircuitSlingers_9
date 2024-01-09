import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";

const VictimForm = ({ formData, onChange }: any) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex">
        <Select
          label="Bank/ (Wallet/ PG/ PA) /Merchant"
          placeholder="--Select--"
          size="lg"
          labelPlacement="outside-left"
          isRequired
          onChange={(e) => onChange("victimBank", e.target.value)}
          selectedKeys={new Set([formData.victimBank])}
          disabledKeys={new Set(["--Select--"])}
          classNames={{
            trigger: "bg-white",
          }}
        >
          <SelectItem key="--Select--" value={"hello"}>
            --Select--
          </SelectItem>
          <SelectItem key={1}>Hello</SelectItem>
        </Select>
      </div>
      <div className="flex gap-6">
        <Input
          label="Account No./Wallet Id/Merchant Id/UPI Id"
          placeholder="Enter account number"
          type="number"
          value={formData.victimAccountNumber}
          onChange={(e) => onChange("victimAccountNumber", e.target.value)}
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
          value={formData.victimTransactionId}
          onChange={(e) => onChange("victimTransactionId", e.target.value)}
          isRequired
          variant="bordered"
          color="primary"
          labelPlacement="outside"
          size="lg"
        />
      </div>
      <div className="flex gap-6">
        <Input
          label="Amount lost"
          placeholder="Enter amount lost"
          type="number"
          value={formData.victimAmountLost}
          onChange={(e) => onChange("victimAmountLost", e.target.value)}
          required
          variant="bordered"
          color="primary"
          labelPlacement="outside"
          size="lg"
        />
        <Input
          label="Transaction Date"
          placeholder="Enter transaction date"
          type="date"
          value={formData.transactionDate}
          onChange={(e) => onChange("transactionDate", e.target.value)}
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

export default VictimForm;
