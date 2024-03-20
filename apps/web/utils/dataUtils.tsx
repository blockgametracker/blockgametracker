import {
    ApiQuery,
    MinecraftEdition,
    QueryStart,
    QueryStep,
    getEnsembledBreakdownInRange,
} from "@repo/gateway"

export const getEnsembled = async (
    edition: MinecraftEdition,
    start: QueryStart,
    step: QueryStep,
) => {
    const onlineInRange = await getEnsembledBreakdownInRange(
        edition,
        start,
        step,
    )

    return onlineInRange.data.map((server) => {
        return {
            id: server.server_name,
            data: convertTime(server.data)
        }
    })
}

export const convertTime = (server: ApiQuery[]) => (
    server.map((data) => {
        let time = new Date(data.x * 1000)
        const hrs = time.getHours()
        const mins = time.getMinutes()
        let timeFormatted =
            (hrs < 10 ? "0" + hrs : hrs) +
            ":" +
            (mins < 10 ? "0" + mins : mins)

        return {
            x: timeFormatted,
            y: data.y,
        }
    })
)

export function calculateAverage(data: ApiQuery[]): number {
    const total = data.reduce((acc, curr) => acc + curr.y, 0);
    return total / data.length;
}

export function getPeak(data: ApiQuery[]): number {
    let peak = Number.MIN_SAFE_INTEGER;
    data.forEach(point => {
        if (point.y > peak) {
            peak = point.y;
        }
    });
    return peak;
}

export function calculatePercentageChange(data: ApiQuery[]): number {
    if (data.length < 2) {
        throw new Error("Data array must contain at least two elements");
    }

    const firstValue = data[0].y;
    const lastValue = data[data.length - 1].y;

    const percentageChange = Math.round(((lastValue - firstValue) / firstValue) * 100)
    return percentageChange;
}