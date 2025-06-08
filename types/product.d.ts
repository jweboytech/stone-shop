type Product = {
  id: string;
  title: string;
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
    nodes: {
      id: string;
      image: {
        url: string;
      };
    }[];
  };
};

type Collection = {
  collections: {
    edges: {
      node: {
        id: string;
        title: string;
        products: {
          edges: {
            node: Product;
          }[];
        };
      };
    }[];
  };
};
