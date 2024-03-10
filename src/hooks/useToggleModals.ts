import { useDispatch, useSelector } from "react-redux";

import {
  getModalData,
  getPinModal,
  getReadonlyModal,
  onModalData,
  onShowPinModal,
  onShowReadonlyModal,
} from "../features/modalSlice";
function useToggleModals() {
  /**
   *shows and hides modals depending on the global modal state
   * four functions in total (open / close) for each modal
   */

  const dispatch = useDispatch();

  //functions to manipulate modal states
  function showPinModal() {
    dispatch(onShowPinModal(true));
  }

  function hidePinModal() {
    dispatch(onShowPinModal(false));
  }

  function showReadonlyModal() {
    dispatch(onShowReadonlyModal(true));
  }

  function hideReadonlyModal() {
    dispatch(onShowReadonlyModal(false));
  }

  function setModalData(modalData: string) {
    dispatch(onModalData(modalData));
  }

  //modal states
  const openPinModal = useSelector(getPinModal);
  const openReadonlyModal = useSelector(getReadonlyModal);
  const modalData = useSelector(getModalData);

  return {
    showPinModal,
    hidePinModal,
    showReadonlyModal,
    hideReadonlyModal,
    openPinModal,
    openReadonlyModal,
    modalData,
    setModalData,
  };
}

export { useToggleModals };
