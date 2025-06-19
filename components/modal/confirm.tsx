// 'use client';

// import { Button } from '@nextui-org/button';
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from '@nextui-org/modal';
// import React from 'react';

// import { useConfirmStore } from '@/store/confirm';

// const ConfirmModal = () => {
//   const {
//     isOpen,
//     title,
//     content,
//     onCancel,
//     close,
//     onConfirm,
//     cancelText,
//     okText,
//   } = useConfirmStore();
//   const [isLoading, setisLoading] = React.useState(false);

//   const handleConfirm = () => {
//     const handler = onConfirm?.();

//     if (handler instanceof Promise) {
//       setisLoading(true);
//       handler.finally(() => {
//         setisLoading(false);
//         close();
//       });
//     } else {
//       close();
//     }
//   };

//   const handleCancel = () => {
//     onCancel?.();
//     close();
//   };

//   return (
//     <Modal isOpen={isOpen} hideCloseButton>
//       <ModalContent>
//         {() => (
//           <React.Fragment>
//             <ModalHeader>{title}</ModalHeader>
//             <ModalBody>{content}</ModalBody>
//             <ModalFooter>
//               <Button
//                 color="danger"
//                 variant="light"
//                 onPress={handleCancel}
//                 isDisabled={isLoading}>
//                 {cancelText}
//               </Button>
//               <Button
//                 color="primary"
//                 onPress={handleConfirm}
//                 isLoading={isLoading}>
//                 {okText}
//               </Button>
//             </ModalFooter>
//           </React.Fragment>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

// export default ConfirmModal;
