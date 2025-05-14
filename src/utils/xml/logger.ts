
/**
 * Helper function to log detailed parsing information
 */
export const logParsingDetails = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`XML Parser: ${message}`, data);
  }
};
