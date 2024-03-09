import { Injectable } from "@nestjs/common"
import { QueryRangeResponse, QueryResponse } from "types/prometheus"

type SearchParams =
    | string
    | Record<string, string>
    | string[][]
    | URLSearchParams

@Injectable()
export class PrometheusService {
    private async request(endpoint: string, body: SearchParams) {
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

    async query(query: string): Promise<QueryResponse<number, string>> {
        return await this.request("query", {
            query: query,
        })
    }

    async queryRange(
        query: string,
        start: string,
        step: string,
    ): Promise<QueryRangeResponse<number, string>> {
        return await this.request("query_range", {
            query: query,
            start: start,
            step: step,
        })
    }
}
