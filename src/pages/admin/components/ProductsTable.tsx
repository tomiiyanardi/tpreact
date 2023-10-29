import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import Product from "../../../types/product";
import DataLayer from '../../../lib/data-layer';

const DeleteProductModal = React.lazy(() => import('./DeleteProductModal'));
const SaveProductModal = React.lazy(() => import('./SaveProductModal'));

type ProductsTableProps = {
  products: Product[];
};

const emptyProduct: Product = {
  category: '',
  description: '',
  id: 0,
  image: '',
  price: 0,
  title: '',
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedProducts, setListedProducts] = React.useState<Product[]>(products);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedProduct) {
      setShowDeleteModal(false);
      setLoading(true);
      DataLayer.delete.product(selectedProduct.id!)
        .then(() => setListedProducts((prevState: Product[]) => prevState.filter((item: Product) => item.id !== selectedProduct.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedProduct, setShowDeleteModal, setListedProducts, setLoading]);
  const onSave = React.useCallback((p: Product) => {
    if (selectedProduct) {
      setShowSaveModal(false);
      setLoading(true);
      if (p.id) {
        DataLayer.update.product(p)
          .then((editedProduct: Product) => setListedProducts((prevState: Product[]) => prevState.map((item: Product) => item.id === editedProduct.id ? editedProduct : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete p.id;

        DataLayer.create.product(p)
          .then((createdProduct: Product) => {
            setListedProducts((prevState: Product[]) => [...prevState, createdProduct]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedProduct, setShowSaveModal, setListedProducts, setLoading]);
  const onShowDeleteModal = React.useCallback((p: Product) => {
    setSelectedProduct(p);
    setShowDeleteModal(true);
  }, [setSelectedProduct, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((p?: Product) => {
    setSelectedProduct(p ?? emptyProduct);
    setShowSaveModal(true);
  }, [setSelectedProduct, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
              <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10 }} variant="primary">Create Product</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedProducts.map((p: Product) => (
                      <tr key={p.id}>
                        <td width='2%'>{p.id}</td>
                        <td width='23%'>{p.title}</td>
                        <td width='45%'>{p.description}</td>
                        <td width='10%'>{p.category}</td>
                        <td width='5%'>{p.price}</td>
                        <td width='5%'><img alt={p.title} src={p.image} style={{ height: 30, width: 30 }} /></td>
                        <td width='10%'>
                          <Button onClick={() => onShowSaveModal(p)} variant="link">Edit</Button>
                          <Button onClick={() => onShowDeleteModal(p)} variant="link">Delete</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }
      <DeleteProductModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        product={selectedProduct}
        show={showDeleteModal}
      />
      <SaveProductModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        product={selectedProduct}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default ProductsTable;
