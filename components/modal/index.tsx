// import React from 'react';
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
// } from '@nextui-org/modal';
// import { Button } from '@nextui-org/button';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import { ModalKey, useModalStore } from '../../store/modal';
// import InputField, { InputFieldProps } from '../form/input';
// import SelectField, { SelectFieldProps } from '../form/select';
// import CheckboxField, { CheckboxFieldProps } from '../form/checkbox';
// import clsx from 'clsx';

// export const ModalProvider = ({ children }: BaseProps) => {
//   const { closeModal, openModals, activeKey } = useModalStore();
//   const [isLoading, setIsLoading] = React.useState(false);
//   // 当前显示的弹窗配置
//   const current = activeKey ? openModals[activeKey] : null;
//   const { handleSubmit, control, reset, getValues, setValue } = useForm({
//     resolver: yupResolver(current.form?.schema),
//   });

//   React.useEffect(() => {
//     // 默认数据回填
//     if (current?.isOpen && current?.payload != null) {
//       const values = getValues();
//       const keys = Object.keys(values);

//       for (let i = 0; i < keys.length; i++) {
//         const key = keys[i];
//         const value = current.payload[key];

//         setValue(key, value);
//       }
//     }
//     // 关闭弹窗清空表单
//     if (!current?.isOpen) {
//       reset();
//     }
//   }, [current?.isOpen, current?.payload, reset, getValues, setValue]);

//   const submitForm = (onConfirm: Function, values: AnyObject) => {
//     if (typeof onConfirm === 'function') {
//       const handler = onConfirm!(values) as Promise<any>;

//       if (handler instanceof Promise) {
//         setIsLoading(true);
//         handler
//           .then(() => {
//             closeModal(activeKey);
//           })
//           .finally(() => {
//             setIsLoading(false);
//           });
//       }
//     }
//   };

//   const renderFormItem = (
//     type: 'input' | 'select' | 'checkbox' | 'textarea' | 'radioGroup',
//     props:
//       | InputFieldProps<AnyObject>
//       | SelectFieldProps<AnyObject>
//       | CheckboxFieldProps<AnyObject>,
//   ) => {
//     switch (type) {
//       case 'input':
//         return (
//           <InputField
//             key={props.name}
//             control={control}
//             {...(props as InputFieldProps<AnyObject>)}
//           />
//         );

//       case 'select':
//         return (
//           <SelectField
//             key={props.name}
//             control={control}
//             {...(props as SelectFieldProps<AnyObject>)}
//           />
//         );

//       case 'checkbox':
//         return (
//           <CheckboxField
//             key={props.name}
//             control={control}
//             {...(props as CheckboxFieldProps<AnyObject>)}
//           />
//         );

//       default:
//         break;
//     }
//   };

//   return (
//     <React.Fragment>
//       {children}
//       {Object.entries(openModals).map(
//         ([id, { isOpen, title, children, form, onConfirm, content }]) => {
//           const isFormModal = form != null;

//           return (
//             <Modal
//               {...current?.props}
//               key={id}
//               isOpen={isOpen}
//               onClose={closeModal.bind(null, id as ModalKey)}>
//               <ModalContent>
//                 {React.createElement(
//                   isFormModal ? 'form' : React.Fragment,
//                   // @ts-ignore
//                   {
//                     ...(isFormModal && {
//                       onSubmit: handleSubmit(submitForm.bind(null, onConfirm!)),
//                       className: 'grid grid-cols-1 gap-6',
//                     }),
//                   },
//                   <React.Fragment>
//                     <ModalHeader>{title}</ModalHeader>
//                     <ModalBody>
//                       {content}
//                       {isFormModal
//                         ? form.items?.map((item, index) => {
//                             const { component, ...restProps } = item;

//                             if (Array.isArray(item)) {
//                               return (
//                                 <div
//                                   key={index}
//                                   className={clsx(
//                                     'grid gap-6',
//                                     `grid-cols-${item.length}`,
//                                   )}>
//                                   {item.map(({ component, ...restProps }) => (
//                                     <React.Fragment key={restProps.name}>
//                                       {renderFormItem(component, restProps)}
//                                     </React.Fragment>
//                                   ))}
//                                 </div>
//                               );
//                             }

//                             return renderFormItem(component, restProps);
//                           })
//                         : children}
//                     </ModalBody>
//                     <ModalFooter>
//                       <Button
//                         color="danger"
//                         variant="light"
//                         onPress={closeModal.bind(null, id as ModalKey)}>
//                         Cancel
//                       </Button>
//                       <Button
//                         color="primary"
//                         type={isFormModal ? 'submit' : 'button'}
//                         isLoading={isLoading}>
//                         Save
//                       </Button>
//                     </ModalFooter>
//                   </React.Fragment>,
//                 )}
//               </ModalContent>
//             </Modal>
//           );
//         },
//       )}
//     </React.Fragment>
//   );
// };
