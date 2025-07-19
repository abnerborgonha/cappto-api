import XLSX from 'xlsx';

export function xlsxToJson<T>(buffer: Buffer<ArrayBuffer>): T[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

  return jsonData as T[];
}
