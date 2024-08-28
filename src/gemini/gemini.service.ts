import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ResponseMeasureDto } from 'src/dto/measure.dto';

@Injectable()
export class GeminiService {
  private readonly genAI = new GoogleGenerativeAI(process.env.API_KEY);

  // private readonly fs = require('fs');

  // async fileToGenerativePart(image, mimeType) {
  //   return {
  //     inlineData: {
  //       data: image,
  //       mimeType,
  //     },
  //   };
  // }

  async analyzeImage(image: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt =
      'I need you to extract the value and return as measurement_value and also create a temporary link for the image as imagem_url';

    // const  imageParts = await this.fileToGenerativePart(image, "image/png")

    const result = await model.generateContent([prompt, image]);
    const response = result.response;
    const text = response.text();
    console.log(text);

    const responseMeasureDto: ResponseMeasureDto = {
      image_url: 'asdas',
      measure_value: 23232.57,
    };

    return responseMeasureDto;
  }
}
