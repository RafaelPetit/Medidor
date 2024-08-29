import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('medidor')
    .addBearerAuth()
    .setDescription(
      'Esta API oferece uma solução prática e eficiente para o controle de contas mensais de água e gás. Com ela, você pode cadastrar suas contas simplesmente fazendo o upload de uma foto. Nossa inteligência artificial escaneará automaticamente o valor da conta e registrará o pagamento, fornecendo um link da imagem da conta para que você possa acessar essas de qualquer lugar, a qualquer momento. Simplifique a gestão das suas contas com a nossa tecnologia inteligente e mantenha-se sempre atualizado sobre o status de pagamento',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
