import 'dart:convert';

ReportStatusDto reportStatusDtoFromJson(String str) =>
    ReportStatusDto.fromJson(json.decode(str));

String reportStatusDtoToJson(ReportStatusDto data) =>
    json.encode(data.toJson());

class ReportStatusDto {
  int trackId;
  String currentStatus;
  String userId;
  String city;
  int flag;
  String reportUrl;
  String updatedDate;
  bool pending;
  String reportDate;
  String suggestions;

  ReportStatusDto({
    required this.trackId,
    required this.currentStatus,
    required this.userId,
    required this.city,
    required this.flag,
    required this.reportUrl,
    required this.updatedDate,
    required this.pending,
    required this.reportDate,
    required this.suggestions,
  });

  factory ReportStatusDto.fromJson(Map<String, dynamic> json) =>
      ReportStatusDto(
          trackId: json["trackId"],
          currentStatus: json["currentStatus"],
          userId: json["userId"],
          city: json["city"],
          flag: json["flag"],
          reportUrl: json["reportURL"],
          updatedDate: json["updatedDate"],
          pending: json["pending"],
          reportDate: json["reportDate"],
          suggestions: json["suggestions"]);

  Map<String, dynamic> toJson() => {
        "trackId": trackId,
        "currentStatus": currentStatus,
        "userId": userId,
        "city": city,
        "flag": flag,
        "reportURL": reportUrl,
        "updatedDate": updatedDate,
        "pending": pending,
        "reportDate": reportDate,
        "suggestions": suggestions
      };
}
