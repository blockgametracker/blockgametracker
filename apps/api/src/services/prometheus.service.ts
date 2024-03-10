import { Injectable, NotFoundException } from "@nestjs/common"
import { QueryRangeResponse, QueryResponse } from "types/prometheus"

/** Interacts with our Prometheus-based VictoriaMetrics instance. */
@Injectable()
export class PrometheusService {
    /** Sends a request to a given endpoint with a record-based request body, returning the JSON-formatted response. */
    private async request(endpoint: string, body: Record<string, string>) {
        const res = await fetch(`${process.env.DSAPI_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(`${process.env.DSAPI_USER}:${process.env.DSAPI_PASS}`)}`,
            },
            body: new URLSearchParams(body),
        })

        return await res.json()
    }

    /** Sends a query for the current time. */
    async query<Metric>(
        query: string,
    ): Promise<QueryResponse<Metric, number, string>> {
        const res: QueryResponse<Metric, number, string> = await this.request(
            "query",
            {
                query: query,
            },
        )

        if (res.data.result.length === 0) throw new NotFoundException()

        return res
    }

    /** Sends a query across a given timeframe. */
    async queryRange<Metric>(
        query: string,
        start: string,
        step: string,
    ): Promise<QueryRangeResponse<Metric, number, string>> {
        const res: QueryRangeResponse<Metric, number, string> =
            await this.request("query_range", {
                query: query,
                start: start,
                step: step,
            })

        if (res.data.result.length === 0) throw new NotFoundException()

        return res
    }
}
