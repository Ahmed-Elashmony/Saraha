import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class JoivalidationPipe implements PipeTransform {
  constructor(private readonly schema: object) {}
  transform(value: any, metadata: ArgumentMetadata) {
    // const validationResult
    if (this.schema[metadata.type]) {
      const validationResult = this.schema[metadata.type].validate(value, {
        abortEarly: false,
      });
      if (validationResult.error) {
        throw new BadRequestException(validationResult.error.details);
      }

      return value;
    }
    return value;
  }
}
