'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Edit, Edit2, Pencil, Plus } from 'lucide-react';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import React from 'react';
import { Button } from '@nextui-org/button';

import { addressForm, form } from './config';

import {
  deleteFetcher,
  getFetcher,
  postFetcher,
  putFetcher,
} from '@/utils/request/fetcher';
import Description from '@/components/description';
import DescriptionItem from '@/components/description/item';
import { useConfirmModal } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';
import clsx from 'clsx';

const AccountProfile = () => {
  const { openModal } = useModal('default');
  const { openConfirm } = useConfirmModal();

  const { data, mutate: getUserProfile } = useSWR<User>(
    '/user/profile',
    getFetcher,
  );
  const { trigger: updateUser } = useSWRMutation<User>(
    '/user/profile',
    putFetcher,
  );

  const { trigger: addAddress } = useSWRMutation<User>(
    '/user/address',
    postFetcher,
  );

  const { trigger: updateAddress } = useSWRMutation<User>(
    '/user/address',
    putFetcher,
  );

  const { trigger: deleteAddress } = useSWRMutation<User>(
    '/user/address',
    deleteFetcher,
  );

  const { data: addresses, mutate: getAddressList } = useSWR<Address[]>(
    '/user/address/list',
    getFetcher,
  );

  const { trigger: updateDefaultAddress } = useSWRMutation(
    '/user/default/address',
    putFetcher,
  );

  const openEditModal = () => {
    openModal({
      title: 'Profile',
      payload: data,
      props: { size: 'xl' },
      form,
      onConfirm(values) {
        return updateUser(values).then(() => {
          getUserProfile();
        });
      },
    });
  };

  const openAddressModal = (data?: Address) => () => {
    openModal({
      title: `${data ? 'Update' : 'Add'} address`,
      props: { size: '3xl' },
      payload: data || {
        line1: 'ADI Global Distribution - North Charleston',
        city: 'North Charleston',
        country: 'US',
        state: 'SC',
        postalCode: '29418',
      },
      form: addressForm,
      async onConfirm(values) {
        const handler = data
          ? updateAddress({ ...values, id: data.id })
          : addAddress(values);

        return handler.then(() => getAddressList());
      },
    });
  };

  const confirmDeleteAddress = (id: number) => () => {
    openConfirm({
      title: 'Delete address?',
      content: 'Existing orders are not affected.',
      onConfirm() {
        return deleteAddress(id).then(() => getAddressList());
      },
    });
  };

  const handleItemClick = (id: number) => () => {
    updateDefaultAddress({ id }).then(() => {
      getUserProfile();
    });
  };

  return (
    <div className="w-full px-10 py-10 grid grid-cols-1 gap-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Edit Profile</h1>
      </div>
      <Card>
        <CardBody className="gap-4 px-5 py-5">
          <p className="flex gap-4 items-center">
            <span className="text-sm">
              {data?.firstName} {data?.lastName}
            </span>
            {data && (
              <Pencil
                className="text-primary cursor-pointer"
                size={14}
                onClick={openEditModal}
              />
            )}
          </p>
          <Description>
            <DescriptionItem label="Email" value={data?.email} />
          </Description>
        </CardBody>
      </Card>
      <Card>
        <CardBody className="gap-4 px-5 py-5">
          <p className="flex gap-4 items-center">
            <span className="text-sm font-semibold">Addresses</span>
            {data && (
              <span
                onClick={openAddressModal()}
                className="inline-flex items-center cursor-pointer text-primary font-semibold">
                <Plus className="" size={14} />
                &nbsp;
                <span className="text-sm">Add</span>
              </span>
            )}
          </p>
          <div className="grid grid-cols-3 gap-5">
            {addresses?.map((item) => (
              <div
                key={item.id}
                className={clsx(
                  'flex-col bg-content1 hover:bg-content2 items-center justify-between relative',
                  'flex-row-reverse cursor-pointer rounded-lg gap-4 p-2 border-2  hover:border-primary',
                  'transition-all duration-300',
                  data?.defaultAddress.id === item.id
                    ? 'border-primary'
                    : 'border-transparent',
                )}
                onClick={handleItemClick(item.id)}>
                <p className="text-foreground-500 text-sm">Default address</p>
                <div className="text-sm mt-2">
                  <p>{item.line1}</p>
                  <p>
                    {item.city} {item.state}
                  </p>
                  <p>{item.postalCode}</p>
                  <p>{item.country}</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    color="primary"
                    size="sm"
                    onClick={openAddressModal(item)}>
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={confirmDeleteAddress(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* <RadioGroup orientation="horizontal">
            {addresses?.map((item) => (
              <Radio
                key={item.id}
                classNames={{
                  base: clsx(
                    'flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                    'flex-row-reverse cursor-pointer rounded-lg gap-4 p-2 border-2 border-transparent',
                    'data-[selected=true]:border-primary',
                  ),
                }}
                value={`addr_${item.id}`}>
                <div className="w-60">
                  <p className="text-foreground-500 text-sm">Default address</p>
                  <address>
                    <p>{item.line1}</p>
                    <p>
                      {item.city} {item.state}
                    </p>
                  </address>
                </div>
              </Radio>
            ))}
          </RadioGroup> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default AccountProfile;
