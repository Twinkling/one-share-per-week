export default function reLayout(grid: any[] /* gapDiff: number, edge: any */) {
    const newGrid = grid
        .map((cell) => ({ ...cell }))
        .sort(
            (
                { $$pos: { $$top: t1, $$left: l1 } },
                { $$pos: { $$top: t2, $$left: l2 } },
            ) => t1 - t2 || l1 - l2,
        );
    const xMap = new Map();
    const yMap = new Map();
    newGrid.forEach((cell) => {
        const { $$top: t, $$left: l } = cell.$$pos;
        xMap.set(l, (xMap.get(l) || []).concat(cell));
        yMap.set(t, (yMap.get(t) || []).concat(cell));
    });
    // xMap.forEach((list, key) => {
    //     const { top, bottom } = edge;
    //     const height = bottom - top;
    //     // const oldHeight = list.reduce(l => )
    //     const newHeight = height - (list.length - 1) * gapDiff;
    // });
    return newGrid;
}
