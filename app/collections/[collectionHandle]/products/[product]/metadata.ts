import { Product } from '@/generated/graphql';
import { toSlug } from '@/utils';

export const getMetadata = (name: string, data: Product) => {
  const collection = data.collections.edges[0];
  const brandName = 'Perperstone';
  const priceCurrency = data.priceRange?.minVariantPrice.currencyCode || 'USD';
  const price = data.priceRange?.minVariantPrice.amount || '0';
  const totalInventory = data.totalInventory || 0;
  const availability =
    totalInventory > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';
  const images =
    data.images?.edges
      ?.map((edge) => edge.node?.url)
      .filter((url): url is string => !!url) || [];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: data.description,
    name: data.title,
    image: images,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency,
      price,
      availability,
      url: `https://perperstone.com/collections/${toSlug(collection.node.handle)}/products/${name}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: brandName,
      },
    },
  });
};
