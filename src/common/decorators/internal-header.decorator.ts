import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { HEADER_INTERNAL_KEY } from 'src/config/constants';

export const UseInternalHeader = () => {
    return applyDecorators(SetMetadata('internalHeader', HEADER_INTERNAL_KEY), ApiHeader({ name: HEADER_INTERNAL_KEY }));
};
