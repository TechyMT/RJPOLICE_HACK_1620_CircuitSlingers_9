class ReportStatusDto {
  final int trackId;
  final String currentStatus;
  final String city;
  final bool pending;

  ReportStatusDto({required this.city, required this.pending, required this.trackId, required this.currentStatus,});
}
