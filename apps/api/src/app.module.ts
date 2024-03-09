import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { ConfigModule } from "@nestjs/config"
import { PrometheusService } from "./prometheus.service"

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env.local"],
        }),
    ],
    controllers: [AppController],
    providers: [PrometheusService],
})
export class AppModule {}
