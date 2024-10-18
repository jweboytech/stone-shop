import { getFetcher } from '@/utils/request/fetcher';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { User } from '@nextui-org/user';
import { ShoppingBag, UserRound } from 'lucide-react';
import useSWR from 'swr';

{
  /* <Link aria-label="cart" href="/user">
  <UserRound className="text-default-500" />
</Link>; */
}

const UserMenu = () => {
  //   return <UserRound className="text-default-500" />;
  const { data } = useSWR<User>('/user/profile', getFetcher);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="user">
          <div className="flex gap-3 items-center">
            <User
              avatarProps={{
                size: 'sm',
                src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
              }}
              classNames={{
                name: 'text-default-600',
                description: 'text-default-500',
              }}
              description={data?.email}
              name={`${data?.firstName || ''} ${data?.lastName || ''}`}
            />
          </div>
        </DropdownItem>
        <DropdownItem key="profile" className="py-2" href="/account/profile">
          Profile
        </DropdownItem>
        <DropdownItem key="orders" className="py-2" href="/account/orders">
          Orders
        </DropdownItem>
        <DropdownItem key="logOut" className="py-2" href="/">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
