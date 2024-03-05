export const shuffled = (list) => list.sort(() => Math.random() - 0.5);

export function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);

    return result;
}