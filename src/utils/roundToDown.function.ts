function roundToDown(value: number, decimalPlaces = 0): number {
    const factor = 10 ** decimalPlaces;
    return Math.floor(value * factor) / factor;
}

export default roundToDown;