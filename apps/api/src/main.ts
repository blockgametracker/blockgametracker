import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("BlockGameTracker API")
        .setDescription(
            "Interacts with the BlockGameTracker VictoriaMetrics instance",
        )
        .setVersion("1.0")
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("docs", app, document)

    await app.listen(8080)
}
bootstrap()