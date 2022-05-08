import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsKana(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isKana',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          if (value) {
            if (value.match(/^[ぁ-んー]*$/) || value.match(/^[ァ-ヶー]+$/)) {
              return true;
            } else {
              return false;
            }
          }
          return false;
        },
      },
    });
  };
}
