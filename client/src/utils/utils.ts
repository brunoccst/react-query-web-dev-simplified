/**
 * Function to simulate artificial load time 
 * @param duration 
 * @returns 
 */
export const wait = (duration: number) => {
    return new Promise(resolve => setTimeout(resolve, duration));
}