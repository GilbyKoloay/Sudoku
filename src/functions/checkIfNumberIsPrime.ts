export default function (value: number): boolean {
    for (let number = 2; number < value; number++) {
        if (value % number === 0) return false;
    }

    return true;
}
