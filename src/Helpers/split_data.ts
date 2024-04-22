export const split_data = <T>(data: T[], limit: number, cursor?: number) => {
    const len = data.length;
    const s = cursor ?? 0;
    const e = s + limit;
    const sliced = data.slice(s, e);
    const prevCursor = s;
    const nextCursor = Math.min(e + 1, len);
    return { sliced, prevCursor, nextCursor }


};

