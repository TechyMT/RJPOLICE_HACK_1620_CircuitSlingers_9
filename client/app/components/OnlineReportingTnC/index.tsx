import React from "react";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const CybercrimeReportingSystem = () => {
  return (
    <div className="text-lg flex flex-col max-w-6xl mx-auto p-4 gap-6 py-12">
      <div>
        <Heading>
          Welcome to the Rajasthan Police Cybercrime Reporting System.
        </Heading>
      </div>
      <div>
        <div className="flex-col flex justify-center gap-2">
          <SubHeading>
            If this is an Emergency, please call{" "}
            <span className="text-red-600 font-bold">&nbsp;1430</span>.
          </SubHeading>

          <SubHeading>
            Crimes that can be reported online generally do not require an
            immediate in-person police response.
          </SubHeading>
        </div>
        <div>
          <p className="mt-4 text-lg">
            If you can answer{" "}
            <span className="underline decoration-2 underline-offset-4 font-semibold">
              yes to all of the following
            </span>
            , you may proceed to file a cybercrime report online. Ensure that
            your pop-up blocking software is disabled before initiating the
            report.
          </p>

          <ul className="list-disc list-inside mt-4 text-lg">
            <li>This is not an Emergency.</li>
            <li>
              The cybercrime incident occurred within the jurisdiction of the
              Rajasthan Police.
            </li>
            <li>
              There are no known suspects (description and/or name) or
              suspect-related details.
            </li>
            <li>There is no physical evidence to collect or process.</li>
            <li>
              The incident does not involve the theft or loss of ID and/or
              identification documents (passports, consular ID) issued by
              foreign governments.
            </li>
            <li>Theft of a firearm is not involved.</li>
            <li>Theft or loss of prescription medication is not involved.</li>
          </ul>
          <p className="mt-4 text-lg">
            Using the Rajasthan Police Cybercrime Reporting System, you can
            report incidents such as:
          </p>

          <ul className="list-disc list-inside mt-4 text-lg">
            <li>
              Identity Fraud: Use of individual or business information for
              financial crimes.
            </li>
            <li>
              Criminal Trespass: Unauthorized access or damage to digital
              property.
            </li>
            <li>
              Criminal Damage to Property in the Second Degree: Damage exceeding
              a defined threshold.
            </li>
            <li>Lost or Compromised Digital Assets</li>
            <li>Cyber Threats or Harassment</li>
          </ul>

          <p className="mt-4 text-lg">
            Please review the entire list with definitions and examples on the
            following page. If your incident doesn't fall under the provided
            categories, contact the Rajasthan Police Department (Emergency:{" "}
            <span className="text-red-600 font-bold">&nbsp;1430</span>) to file
            your report.
          </p>

          <p className="mt-4">
            Upon completion of the report process, you will:
          </p>

          <ul className="list-disc list-inside mt-4">
            <li>
              Receive a confirmation message stating, "Your online cybercrime
              report has been submitted."
            </li>
            <li>
              Be provided with a temporary case number. This serves as
              confirmation but is not your official report number.
            </li>
            <li>
              Have the option to print a copy of the report for your records.
            </li>
          </ul>

          <p className="mt-4">Please Note:</p>

          <ul className="list-disc list-inside mt-4">
            <li>
              All cases submitted through the Cybercrime Reporting System will
              undergo review.
            </li>
            <li>Your report may be approved or denied after review.</li>
            <li>If further investigation is required, you may be contacted.</li>
            <li>Filing a false cybercrime report is a criminal offense.</li>
          </ul>
        </div>
        <div className="flex justify-start mt-16">
          <Link href={"/signin"}>
            <Button color="primary" size="lg">
              Report a crime
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CybercrimeReportingSystem;
