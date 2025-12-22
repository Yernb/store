/**
 * Calculate tax/VAT based on country
 * @param subtotal - The subtotal amount before tax
 * @param country - The country name
 * @returns The tax amount
 */
export function calculateTax(subtotal: number, country: string): number {
  const taxRates: { [key: string]: number } = {
    'United Kingdom': 0.20, // VAT 20%
    'United States': 0.00, // Sales tax varies by state - set to 0 for now (can be enhanced)
    'Canada': 0.13, // HST/GST varies by province - using average 13%
    'Australia': 0.10, // GST 10%
  }
  const rate = taxRates[country] || 0
  return subtotal * rate
}

/**
 * Get tax rate label for display
 * @param country - The country name
 * @returns The tax label (e.g., "VAT (20%)", "GST (10%)")
 */
export function getTaxLabel(country: string): string {
  const labels: { [key: string]: string } = {
    'United Kingdom': 'VAT (20%)',
    'United States': 'Tax',
    'Canada': 'Tax (13%)',
    'Australia': 'GST (10%)',
  }
  return labels[country] || 'Tax'
}
