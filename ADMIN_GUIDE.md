# Metfold Admin Dashboard - Product Management

## How to Use

1. **Login** as admin:
   - Email: `admin@metfold.com`
   - Password: `metfold123`

2. **Access Admin Dashboard**:
   - After login, click "Admin Dashboard" card
   - Or navigate to `/admin`

3. **Upload Products**:
   - Click "Download Template" to get the Excel format
   - Fill in your product data
   - Click "Upload Excel File" to import

## Excel Format

Your Excel file should have these columns:

| Column | Description | Example |
|--------|-------------|---------|
| ProductID | Unique product identifier | `5-rib-sheet` |
| Name | Product name | `5-Rib Sheet` |
| Category | Product category | `Roof Sheets` |
| Price | Price in dollars | `25.50` |
| Size | Product dimensions | `0.42mm x 762mm` |
| Color | Available color | `Surfmist` |
| Thickness | Material thickness | `0.42 BMT` |
| Description | Product description | `Premium 5-rib roofing profile` |
| Image | Image URL/path | `/assets/5-rib.jpg` |

## Features

- ✅ Upload Excel files (.xlsx, .xls)
- ✅ Download template with sample data
- ✅ Export current products to Excel
- ✅ View product statistics (total, avg price, categories)
- ✅ Preview uploaded products in table
- ✅ Data persists in browser localStorage
- ✅ Clear all products option

## Notes

- Products are stored in browser localStorage
- Maximum 20 products shown in preview table
- All columns are case-insensitive (ProductID, productId, product_id all work)
- Invalid prices default to $0.00
