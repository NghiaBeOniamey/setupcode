package com.portalevent.core.approver.eventwaitingapproval.exportconfig;

import com.portalevent.core.approver.eventwaitingapproval.model.respone.AewaParticipantLecturerExcelResponse;
import lombok.Getter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.util.List;

public class ExcelParticipantLecturerGenerator {

    @Getter
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    public ExcelParticipantLecturerGenerator() {
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Danh sách giảng viên");
    }

    public void writeHeader() {
        sheet = workbook.getSheetAt(0);
        Row headerRow = sheet.createRow(0);
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillBackgroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);

        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        for (int i = 0; i < 4; i++) {
            headerRow.createCell(i).setCellStyle(headerStyle);
        }
        headerRow.getCell(0).setCellValue("Học kỳ");
        headerRow.getCell(1).setCellValue("Tên sự kiện");
        headerRow.getCell(2).setCellValue("MSSV");
        headerRow.getCell(3).setCellValue("Họ tên");
        for (int i = 0; i < 4; i++) {
            sheet.autoSizeColumn(i);
        }

    }
    public void writeData(List<AewaParticipantLecturerExcelResponse> participants) {
        int rowCount = 1;
        for (AewaParticipantLecturerExcelResponse participantLecturerResponse : participants) {
            var row = sheet.createRow(rowCount++);
            row.createCell(0).setCellValue(participantLecturerResponse.getSemesterName());
            row.createCell(1).setCellValue(participantLecturerResponse.getEventName());
            row.createCell(2).setCellValue(participantLecturerResponse.getParticipantLecturerEmail());
            row.createCell(3).setCellValue(participantLecturerResponse.getParticipantLecturerName());
        }

        for (int i = 0; i < 16; i++) {
            sheet.autoSizeColumn(i);
        }

    }

}
