'use client';

import { Card, CardBody } from '@nextui-org/card';
import { Edit, Pencil } from 'lucide-react';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';

import { form } from './config';

import { getFetcher, putFetcher } from '@/utils/request/fetcher';
import Description from '@/components/description';
import DescriptionItem from '@/components/description/item';
import { useModal } from '@/hooks/useModal';

const AccountProfile = () => {
  const { openModal } = useModal('default');
  const { data, mutate: getUserProfile } = useSWR<User>(
    '/user/profile',
    getFetcher,
  );
  const { trigger: updateUser } = useSWRMutation<User>(
    '/user/profile',
    putFetcher,
  );

  const openEditModal = () => {
    openModal({
      title: 'Profile',
      payload: data,
      props: { size: 'xl' },
      form,
      onConfirm(values) {
        return updateUser(values).then(getUserProfile);
      },
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
    </div>
  );
};

export default AccountProfile;
