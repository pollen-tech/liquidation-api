import { SetMetadata } from '@nestjs/common';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

// ref: https://gist.github.com/anchan828/9e569f076e7bc18daf21c652f7c3d012
// eslint-disable-next-line @typescript-eslint/ban-types
export function CustomRepository(entity: Function): ClassDecorator {
    return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
