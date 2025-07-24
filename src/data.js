export const SAMdata = [
  ["", "ACT", "COM", "FAC", "HOU", "GOV", "S-I", "INCTAX", "FACTAX", "IMPTAX", "COMTAX", "ROW", "TOTAL"],
  ["ACT", "", 4318.8, "", "", "", "", "", "", "", "", "", 4318.8],
  ["COM", 1772.4, 324.4, "", 2028.5, 368.1, 1577, "", "", "", "", 304.1, 6374.4],
  ["FAC", 2546.5, "", "", "", "", "", "", "", "", "", "", 2546.5],
  ["HOU", "", "", 2567.1, 460.4, 22.3, "", "", "", "", 976, "", 4025.9],
  ["GOV", "", "", "", "", "", 148.5, 5.2, 75.7, 190.5, 30, "", 450.1],
  ["S-I", "", "", "", 1388.6, 59.8, "", "", "", "", 129, "", 1577],
  ["INCTAX", "", "", "", 148.5, "", "", "", "", "", "", "", 148.5],
  ["FACTAX", "", "", 5.2, "", "", "", "", "", "", "", "", 5.2],
  ["IMPTAX", "", 75.7, "", "", "", "", "", "", "", "", "", 75.7],
  ["COMTAX", "", 190.5, "", "", "", "", "", "", "", "", "", 190.5],
  ["ROW", "", 1465, -25.9, "", "", "", "", "", "", "", "", 1439.1],
  ["TOTAL", 4318.8, 6374.4, 2546.5, 4025.9, 450.1, 1577, 148.5, 5.2, 75.7, 190.5, 1439.1, ""]
];

export const IOdataReal = [
  ["", "Agriculture", "Manufacturing", "Construction", "Wholesale", "Transport", "Finance", "Education", "Health", "Public Admin", "Other Services", "TOTAL"],
  ["Agriculture", "", 150.5, 120.0, 60.2, 30.5, 20.0, 10.0, 5.0, 2.0, 8.0, 406.2],
  ["Manufacturing", 200.0, "", 100.0, 150.5, 70.0, 40.0, 25.0, 10.0, 5.0, 15.0, 615.5],
  ["Construction", 80.0, 90.0, "", 75.0, 25.0, 15.0, 8.0, 4.0, 1.0, 5.0, 303.0],
  ["Wholesale", 50.0, 70.0, 60.0, "", 40.0, 20.0, 15.0, 10.0, 3.0, 6.0, 274.0],
  ["Transport", 30.0, 40.0, 25.0, 45.0, "", 30.0, 20.0, 10.0, 5.0, 5.0, 205.0],
  ["Finance", 10.0, 15.0, 10.0, 20.0, 25.0, "", 18.0, 10.0, 4.0, 7.0, 99.0],
  ["Education", 5.0, 10.0, 8.0, 12.0, 15.0, 20.0, "", 15.0, 8.0, 5.0, 98.0],
  ["Health", 3.0, 5.0, 4.0, 6.0, 8.0, 10.0, 15.0, "", 10.0, 5.0, 66.0],
  ["Public Admin", 2.0, 3.0, 2.0, 4.0, 5.0, 6.0, 8.0, 10.0, "", 4.0, 44.0],
  ["Other Services", 5.0, 7.0, 5.0, 8.0, 10.0, 12.0, 15.0, 10.0, 5.0, "", 77.0],
  ["TOTAL", 385.0, 465.5, 349.0, 375.7, 233.5, 153.0, 134.0, 74.0, 43.0, 60.0, ""],
];

export const GovAccountData = [
  ["", "Tax Revenue", "Non-Tax Revenue", "Foreign Grants", "Total Revenue"],
  ["Current Expenditure", 400, 50, "", 450],
  ["Capital Expenditure", 100, 20, 80, 200],
  ["Debt Service", 30, "", "", 30],
  ["TOTAL", 530, 70, 80, ""],
];


export const ExternalSectorData = [
  ["", "Goods", "Services", "Income", "Transfers", "TOTAL"],
  ["Exports", 1200, 300, 50, "", 1550],
  ["Imports", -1000, -250, -30, "", -1280],
  ["Remittances", "", "", "", 700, 700],
  ["Aid", "", "", "", 100, 100],
  ["TOTAL", 200, 50, 20, 800, ""],
];


export const FactorIncomeData = [
  ["", "Agriculture", "Industry", "Services", "TOTAL"],
  ["Labor", 300, 500, 800, 1600],
  ["Capital", 150, 700, 400, 1250],
  ["TOTAL", 450, 1200, 1200, ""],
];


export const HouseholdAccountsData = [
  ["", "Labor Income", "Capital Income", "Transfers", "TOTAL INCOME"],
  ["Consumption", 1000, "", "", 1000],
  ["Savings", 200, "", "", 200],
  ["Taxes", 100, "", "", 100],
  ["TOTAL", 1300, "", "", ""],
];


export const InstitutionalTransfersData = [
  ["", "Households", "Firms", "Government", "ROW", "TOTAL"],
  ["Households", "", 100, 50, 80, 230],
  ["Firms", 120, "", 40, 30, 190],
  ["Government", 200, 60, "", 70, 330],
  ["ROW", 50, 30, 100, "", 180],
  ["TOTAL", 370, 190, 190, 180, ""],
];

