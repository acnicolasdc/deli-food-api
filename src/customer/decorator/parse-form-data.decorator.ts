import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParseFormData = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    return {
      ...body,
      amenities: JSON.parse(body.amenities),
      paymentMethods: JSON.parse(body.paymentMethods),
      productTypes: JSON.parse(body.productTypes),
      headquarters: JSON.parse(body.headquarters),
    };
  },
);
