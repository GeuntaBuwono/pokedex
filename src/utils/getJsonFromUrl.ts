import {z} from 'zod';

const Schema = z.object({
  url: z.string().url(),
});

function getJsonFromUrl<T extends z.infer<typeof Schema>>({url}: T) {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params: unknown = {};

  let match;

  while ((match = regex.exec(url))) {
    // @ts-expect-error unknown url
    // eslint-disable-next-line prefer-destructuring
    params[match[1]] = match[2];
  }

  return params;
}

export default getJsonFromUrl;
