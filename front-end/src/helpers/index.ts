// Para formatear fechas
export const formatCurrency = ( price: string | number ) => Number(price).toLocaleString( 'en-US', { style: 'currency', currency: 'USD' } ); 