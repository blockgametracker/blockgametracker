import { Injectable, NotFoundException } from "@nestjs/common"
import { QueryRangeResponse, QueryResponse } from "../types/prometheus"
import { DataSourceService } from "./ds.service"

/** Interacts with our Prometheus-based VictoriaMetrics instance via the DataSource API. */
@Injectable()
export class PrometheusService {
    constructor(private readonly dataSourceService: DataSourceService) {}

    /** Sends a request to a given endpoint with a record-based request body, returning the JSON-formatted response. */
    private async request(endpoint: string, body: Record<string, string>) {
        return await this.dataSourceService.request(
            `api/v1/${endpoint}`,
            "POST",
            body,
        )
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
        end: string,
    ): Promise<QueryRangeResponse<Metric, number, string>> {
        const res: QueryRangeResponse<Metric, number, string> =
            await this.request("query_range", {
                query: query,
                start: start,
                step: step,
                end: end,
            })

        if (res.data.result.length === 0) throw new NotFoundException()

        return res
    }
}
