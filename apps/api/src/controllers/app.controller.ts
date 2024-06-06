import { Controller, Get, Redirect } from "@nestjs/common"

/** Handles API-wide endpoints. */
@Controller()
export class AppController {
    /** Hello, World! */
    @Get("/")
    getRoot() {
        return "Hello, World!"
    }

    /** Healthcheck endpoint for automated deployment. */
    @Get("health")
    getHealth() {}

    /** Big Rat dot Monster. */
    @Get("bigrat")
    @Redirect("https://bigrat.monster")
    getBigRat() {}
}
