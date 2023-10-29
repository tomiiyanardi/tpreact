import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import Product from '../../../types/product';

type DeleteProductModalProps = {
  onHide: () => void;
  onSave: (p: Product) => void;
  product: Product | null;
  show: boolean;
};

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ onSave, onHide, product, show }) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    const data = Object.fromEntries(new FormData(form));
    onSave({ ...product!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{product?.id === 0 ? 'Create' : 'Edit'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                defaultValue={product?.title}
                name="title"
                placeholder="Title"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                defaultValue={product?.description}
                name="description"
                placeholder="Description"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                defaultValue={product?.category}
                name="category"
                placeholder="Category"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                defaultValue={product?.image}
                name="image"
                placeholder="Image"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                defaultValue={product?.price}
                name="price"
                placeholder="Price"
                required
                type="text"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteProductModal;
