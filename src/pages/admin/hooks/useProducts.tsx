import * as React from 'react';

import DataLayer from '../../../lib/data-layer';
import Product from "../../../types/product";

type UseProductsState = {
  data: Product[];
  error: any;
  loading: boolean;
};

const initialState: UseProductsState = {
  data: [],
  error: null,
  loading: true,
};

const useProducts = () => {
  // State
  const [state, setState] = React.useState<UseProductsState>(initialState);

  // Effects
  React.useEffect(function fetchProducts() {
    DataLayer.fetch.products()
      .then((data: Product[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default useProducts;
