import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ResponseUploadMeasureDto } from 'src/dto/measure-upload.dto';

@Injectable()
export class GeminiService {
  private readonly genAI = new GoogleGenerativeAI(process.env.API_KEY);

  async fileToGenerativePart(image, mimeType) {
    return {
      inlineData: {
        data: image,
        mimeType,
      },
    };
  }

  async analyzeImage(image: string) {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = `
      Você vai receber uma imagem contendo um recibo ou fatura. Sua tarefa é:

      1. **Extrair o valor da conta** da imagem (o valor monetário que aparece no recibo).
      2. **Gerar um link valido para a imagem**, para que ela possa ser visualizada posteriormente.
      3. **Retornar um objeto JSON** no seguinte formato:

      { 
          "image_url": { "type": "string" },
          "measure_value: {"type": "float" }
      };

      ### Observações:

      - **Não altere o formato do JSON.**
      - **Extraia apenas o valor monetário principal da conta, sem códigos adicionais.**
      - **Assegure-se de que o link gerado para a imagem seja acessível.**
      `;

    const imageParts = await this.fileToGenerativePart(
      image,
      'image/jpeg' || 'image/jpg',
    );

    const result = await model.generateContent([prompt, imageParts]);
    const text = result.response.text();

    const ResponseUploadMeasureDto: ResponseUploadMeasureDto = JSON.parse(text);

    console.log(ResponseUploadMeasureDto);
    return ResponseUploadMeasureDto;
  }
}
