type SkuAttribute = {
  id: string;
  title: string;
  image: {
    url: string;
  };
};

type Product = {
  id: string;
  title: string;
  handle: string;
  featuredImage: {
    url: string;
  };
  images: {
    nodes: {
      url: string;
      id: string;
    }[];
  };
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: SkuAttribute[];
  };
};

type Collection = {
  collections: {
    edges: {
      node: {
        id: string;
        title: string;
        image: {
          url: string;
        };
        products: {
          edges: {
            node: Product;
          }[];
        };
      };
    }[];
  };
};
