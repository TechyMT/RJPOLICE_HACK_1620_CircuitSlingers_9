package com.example.demo.dto;

public class ReportTemplate {

    public String templateContent = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "    <title>User Information</title>\n" +
            "    <style>\n" +

            "        h1 {\n" +
            "            text-align: center;\n" +
            "            display: flex;\n" +
            "            align-items: center;\n" +
            "            justify-content: center;\n" +
            "            margin-bottom: 20px;\n" +
            "        }\n" +
            "        .user-image {\n" +
            "            width: 50px; \n" +
            "            margin-right: 10px; \n" +
            "        }\n" +
            "        .container {\n" +
            "            max-width: 800px;\n" +
            "            margin: 0 auto;\n" +
            "        }\n" +
            "        table {\n" +
            "            width: 100%;\n" +
            "            border-collapse: collapse;\n" +
            "            margin-top: 20px;\n" +
            "        }\n" +
            "        table, th, td {\n" +
            "            border: 1px solid #ddd;\n" +
            "        }\n" +
            "        th, td {\n" +
            "            padding: 10px;\n" +
            "            text-align: left;\n" +
            "        }\n" +
            "    </style>\n" +
            "</head>\n" +
            "<body>\n" +
            "\n" +
            "<div class=\"container\">\n" +
            "    <h1>  <img src=\"src/main/resources/static/police-logo.png\" alt=\"Rajasthan Police Logo\" class=\"user-image\">\n" +
            "        E-COPY OF E-FIR</h1>\n" +
            "    <table>\n" +
            "        <tr>\n" +
            "            <th>User Identification</th>\n" +
            "            <td>${userId}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Full Name</th>\n" +
            "            <td>${fullName}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Date of Birth</th>\n" +
            "            <td>${dateOfBirth}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Aadhar Card No.</th>\n" +
            "            <td>${aadharNumber}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Incident Description</th>\n" +
            "            <td>${incidentDescription}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Is Bank Involved?</th>\n" +
            "            <td>${isBankAccInvolved}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Phone Number</th>\n" +
            "            <td>${phoneNumber}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Date of Crime</th>\n" +
            "            <td>${dateOfCrime}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>User Account Info</th>\n" +
            "            <td>\n" +
            "                <ul>\n" +
            "                    <li>\n" +
            "                        <strong>Bank Name :</strong> ${bankName}\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Amount Lost :</strong> ${amountLost}\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Date of Transaction :</strong> ${dateOfTransaction}\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Transaction :</strong> ${transaction}\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Account Number :</strong> ${accountNumber}\n" +
            "                    </li>\n" +
            "                </ul>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Suspect Account Info</th>\n" +
            "            <td>\n" +
            "                <ul>\n" +
            "                    <li>\n" +
            "                        <strong>Suspect Bank Name :</strong> ${suspectBankName}\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Suspect Phone No. :</strong> ${suspectPhoneNumber}\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Suspect Account No. :</strong> ${suspectAccountNumber}\n" +
            "                    </li>\n" +
            "                </ul>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Date of Report</th>\n" +
            "            <td>${dateOfReport}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Pincode</th>\n" +
            "            <td>${pincode}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Evidence URL</th>\n" +
            "            <td>${evidencesURL}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>City</th>\n" +
            "            <td>${city}</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Questionnaire</th>\n" +
            "            <td>\n" +
            "                <ul>\n" +
            "                    <li>${questionnaire}</li>\n" +
            "                </ul>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "    </table>\n" +
            "\n" +
            "</div>\n" +
            "\n" +
            "</body>\n" +
            "</html>";
}
