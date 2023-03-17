import * as XLSX from 'xlsx';

export const downloadExcel = (json: any[]) => {
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "chess-players.xlsx");
};
