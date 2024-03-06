import { useRouter } from 'next/router';
import { FC } from 'react';
import { SiteLanguageEnum } from '@/enums/common';

interface IDynamicMessage<T = any> {
   data: T;
   prop: string;
}

const DynamicMessage: FC<IDynamicMessage> = ({ data, prop }): string => {
   const { locale = SiteLanguageEnum.en } = useRouter();

   return locale === SiteLanguageEnum.am && data[`${prop}Am}`]
      ? data[`${prop}Am`]
      : data[`${prop}En`];
};

export default DynamicMessage;
