import { Module } from "@nestjs/common"
import { OnlineController } from "./controllers/online.controller"
import { ConfigModule } from "@nestjs/config"
import { PrometheusService } from "./services/prometheus.service"
import { AppController } from "./controllers/app.controller"
import { ServersController } from "./controllers/servers.controller"
import { EnsembleController } from "./controllers/ensemble.controller"
import { DataSourceService } from "./services/ds.service"

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env.local"],
        }),
    ],
    controllers: [
        AppController,
        EnsembleController,
        OnlineController,
        ServersController,
    ],
    providers: [DataSourceService, PrometheusService],
})
export class AppModule {}
