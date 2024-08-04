import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Delete } from '../../utils/Icons';
import { useDeleteTransactionMutation } from '../../features/api/apiSlices/transactionApiSlice';
import {
  closeModal,
  setRefetch,
} from '../../features/TransactionModals/deleteModal';
import { updateLoader } from '../../features/loader/loaderSlice';

const TransactionDeleteModal = () => {
  const data = useSelector((state) => state.deleteTransactionModal);
  const { isOpen, id, title, type } = data;
  const dispatch = useDispatch();

  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const res = await deleteTransaction(id).unwrap();

      dispatch(updateLoader(60));
      await dispatch(setRefetch(true));
      await dispatch(closeModal());
      toast.success(
        type === 'debit'
          ? 'Income deleted successfully!'
          : 'Expense deleted successfully!'
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || 'Unexpected Internal Server Error!');
    } finally {
      await dispatch(setRefetch(false));
      dispatch(updateLoader(100));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <>
          <ModalHeader>
            <h4 className="text-xl text-error tracking-relaxed">
              Are you sure you want to delete {title}?
            </h4>
          </ModalHeader>
          <ModalBody>
            <p className="text-sm">
              Confirm deletion: This action permanently removes the selected{' '}
              {type} entry. Once deleted, it cannot be recovered. Cancel to
              retain the {type} entry.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => dispatch(closeModal())}
              className="text-base"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleDelete}
              isLoading={isLoading}
              className="text-base"
              endContent={<Delete />}
            >
              Delete
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDeleteModal;
