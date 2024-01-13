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
            "            <td>zBwRffRwdANSB1jsTgbee4zfF392</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Full Name</th>\n" +
            "            <td>John Doe</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Date of Birth</th>\n" +
            "            <td>1234567</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Aadhar Card No.</th>\n" +
            "            <td>1234567</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Incident Description</th>\n" +
            "            <td>xyz</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Is Bank Involved?</th>\n" +
            "            <td>Yes</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Phone Number</th>\n" +
            "            <td>1234567890</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Date of Crime</th>\n" +
            "            <td>12-3-23</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>User Account Info</th>\n" +
            "            <td>\n" +
            "                <ul>\n" +
            "                    <li>\n" +
            "                        <strong>Bank Name :</strong> John\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Amount Lost :</strong> 25000\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Date of Transcation :</strong> NA\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Transaction :</strong> NA\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Account Number :</strong> NA\n" +
            "                    </li>\n" +
            "                </ul>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Suspect Account Info</th>\n" +
            "            <td>\n" +
            "                <ul>\n" +
            "                    <li>\n" +
            "                        <strong>Suspect Bank Name :</strong> John\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Suspect Phone No. :</strong> 123456789\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <strong>Suspect Account No. :</strong> 123456789987654\n" +
            "                    </li>\n" +
            "                </ul>\n" +
            "            </td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Date of Report</th>\n" +
            "            <td>4-4-23</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Pincode</th>\n" +
            "            <td>411043</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Evidence URL</th>\n" +
            "            <td>xyz</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Category</th>\n" +
            "            <td>Online Bank</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>City</th>\n" +
            "            <td>Pune</td>\n" +
            "        </tr>\n" +
            "        <tr>\n" +
            "            <th>Questionnaire</th>\n" +
            "            <td>\n" +
            "                <ul>\n" +
            "                    <li><strong>Clarify:</strong> Can you provide more details about the incident? - Additional details provided</li>\n" +
            "                    <li><strong>Specifics:</strong> What specific information do you have about the incident? - Specific information provided</li>\n" +
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
