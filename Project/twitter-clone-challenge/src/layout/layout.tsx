import { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router";
import {
  Logo,
  Menu,
  MenuItem,
  NoneLineLink,
  Wrapper,
  Avatar,
  NotificationBadge,
  MobileTopMenuWrapper,
  WebMenuWrapper,
} from "./styles/screen-components";
import DarkModeButton from "./components/darkMode-button";
import { auth, dataBase } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { addFirestoreUnsubscribe } from "../lib/firestoreSubscriptions";
import { useAvatar } from "../shared/hook/useAvatar";

function useAuthUser() {
  const user = auth.currentUser;
  const { avatar } = useAvatar({
    user,
    enableUpload: false,
  });

  return { userId: user?.uid, avatar };
}

function useUnreadNotification(userId: string | undefined) {
  const [hasUnreadNotification, setHasUnreadNotification] =
    useState<boolean>(false);

  useEffect(() => {
    if (!userId) return;

    const notificationQuery = query(
      collection(dataBase, "notifications"),
      where("recipientId", "==", userId),
      where("isRead", "==", false)
    );

    const unsubscribe = onSnapshot(notificationQuery, (snapshot) => {
      setHasUnreadNotification(!snapshot.empty);
    });

    addFirestoreUnsubscribe(unsubscribe);

    return () => unsubscribe();
  }, [userId]);

  return hasUnreadNotification;
}

function useMenuList(
  avatar?: string | null | undefined,
  hasUnreadNotification?: boolean
) {
  return useMemo(
    () => [
      { link: "/hot", icon: (active: boolean) => <HotIcon active={active} /> },
      { link: "/search", icon: () => <SearchIcon /> },
      {
        link: "/like",
        icon: (active: boolean) => <LikeIcon active={active} />,
      },
      {
        link: "/write",
        icon: (active: boolean) => <WriteIcon active={active} />,
      },
      {
        link: "/profile",
        icon: () => <ProfileIcon avatar={avatar} />,
      },
      {
        link: "/notification",
        icon: (active: boolean) => (
          <>
            <NotificationIcon active={active} />
            {hasUnreadNotification && <NotificationBadge>●</NotificationBadge>}
          </>
        ),
      },
      {
        link: "/settings",
        icon: (active: boolean) => <SettingIcon active={active} />,
      },
    ],
    [avatar, hasUnreadNotification]
  );
}

function Layout() {
  const location = useLocation();
  const { userId, avatar } = useAuthUser();
  const hasUnreadNotification = useUnreadNotification(userId);
  const MENU_LIST = useMenuList(avatar, hasUnreadNotification);

  return (
    <Wrapper>
      <Menu>
        <NoneLineLink to="/">
          <LogoComponent />
        </NoneLineLink>
        <WebMenuWrapper>
          {MENU_LIST.map(({ link, icon }) => (
            <MenuLink key={link} to={link} active={location.pathname === link}>
              {icon(location.pathname === link)}
            </MenuLink>
          ))}
          <DarkModeButton />
        </WebMenuWrapper>
        <MobileTopMenuWrapper>
          <MenuLink
            to="/notification"
            active={location.pathname === "/notification"}
          >
            <NotificationIcon active={location.pathname === "/notification"} />
            {hasUnreadNotification && <NotificationBadge>●</NotificationBadge>}
          </MenuLink>
          <DarkModeButton />
        </MobileTopMenuWrapper>
      </Menu>
      <Outlet />
    </Wrapper>
  );
}

export default Layout;

const LogoComponent = () => {
  return (
    <Logo>
      <label hidden>Yoop</label>
      <svg
        width="420"
        height="240"
        viewBox="0 0 420 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M112.85 194.3C108.55 197 104.7 198.7 101.3 199.4C98 200.2 94.4 200.6 90.5 200.6C86.6 200.6 83.25 199.45 80.45 197.15C77.75 194.85 76.4 191.8 76.4 188C76.4 184.2 77.65 180.75 80.15 177.65C82.75 174.55 85.85 172.1 89.45 170.3C96.75 166.5 103.4 164 109.4 162.8L113.3 162.05C113.4 161.65 114 159.65 115.1 156.05C116.2 152.45 117 149.65 117.5 147.65C104.8 155.25 94.35 159.05 86.15 159.05C81.25 159.05 77.2 157.5 74 154.4C70.8 151.2 69.2 146.7 69.2 140.9C69.2 135 71.1 124.45 74.9 109.25C78.7 93.95 80.6 83.75 80.6 78.65C80.6 75.35 79.1 71.6 76.1 67.4L74.6 65.3L75.05 63.05C81.05 61.35 90.3 60.5 102.8 60.5C104.2 63.5 104.9 67.55 104.9 72.65C104.9 77.75 103 88.55 99.2 105.05C95.4 121.45 93.5 130.95 93.5 133.55C93.5 138.85 95.3 141.5 98.9 141.5C105.7 141.5 112.95 139.55 120.65 135.65C126.75 110.55 130.9 86.85 133.1 64.55C138.2 61.95 145.2 60.65 154.1 60.65H156.95C156.95 65.95 156.05 73.3 154.25 82.7C151.95 94.6 148.4 112.6 143.6 136.7C141.5 147.5 138.75 156.95 135.35 165.05C131.95 173.05 128.45 179.25 124.85 183.65C121.25 188.05 117.25 191.6 112.85 194.3ZM90.5 190.55C94 190.55 97.65 188.6 101.45 184.7C105.25 180.9 108.35 176.35 110.75 171.05C106.05 171.55 100.75 173.35 94.85 176.45C89.05 179.65 86.15 182.9 86.15 186.2C86.15 187.4 86.55 188.4 87.35 189.2C88.25 190.1 89.3 190.55 90.5 190.55ZM180.594 168.8C173.694 168.8 168.294 166.4 164.394 161.6C160.494 156.7 158.544 149.9 158.544 141.2C158.544 130.1 161.494 120.55 167.394 112.55C173.394 104.55 181.644 100.55 192.144 100.55L197.544 100.85C199.244 99.95 201.144 99.5 203.244 99.5C211.144 99.5 215.094 106.95 215.094 121.85C219.194 121.65 223.344 121.1 227.544 120.2L229.944 119.6L230.844 125.45C227.544 126.85 223.094 128.1 217.494 129.2L214.494 129.8C212.594 140.3 208.744 149.45 202.944 157.25C197.144 164.95 189.694 168.8 180.594 168.8ZM188.694 155.9C192.894 155.9 196.644 153.2 199.944 147.8C203.344 142.4 205.694 136.7 206.994 130.7C196.294 130.7 190.944 126.7 190.944 118.7C190.944 115.5 191.594 112.5 192.894 109.7L193.644 108.2C193.244 108 192.744 107.9 192.144 107.9C191.544 107.9 191.094 108 190.794 108.2C188.294 109.8 185.944 113.55 183.744 119.45C181.544 125.35 180.444 132.1 180.444 139.7C180.444 150.5 183.194 155.9 188.694 155.9ZM243.436 168.8C236.536 168.8 231.136 166.4 227.236 161.6C223.336 156.7 221.386 149.9 221.386 141.2C221.386 130.1 224.336 120.55 230.236 112.55C236.236 104.55 244.486 100.55 254.986 100.55L260.386 100.85C262.086 99.95 263.986 99.5 266.086 99.5C273.986 99.5 277.936 106.95 277.936 121.85C282.036 121.65 286.186 121.1 290.386 120.2L292.786 119.6L293.686 125.45C290.386 126.85 285.936 128.1 280.336 129.2L277.336 129.8C275.436 140.3 271.586 149.45 265.786 157.25C259.986 164.95 252.536 168.8 243.436 168.8ZM251.536 155.9C255.736 155.9 259.486 153.2 262.786 147.8C266.186 142.4 268.536 136.7 269.836 130.7C259.136 130.7 253.786 126.7 253.786 118.7C253.786 115.5 254.436 112.5 255.736 109.7L256.486 108.2C256.086 108 255.586 107.9 254.986 107.9C254.386 107.9 253.936 108 253.636 108.2C251.136 109.8 248.786 113.55 246.586 119.45C244.386 125.35 243.286 132.1 243.286 139.7C243.286 150.5 246.036 155.9 251.536 155.9ZM322.813 125.45C320.113 125.45 318.063 125.4 316.663 125.3C312.363 144.1 309.963 157.15 309.463 164.45C305.163 166.55 298.613 167.6 289.813 167.6C287.913 167.6 286.613 167.55 285.913 167.45C286.613 161.55 289.613 146.75 294.913 123.05C300.213 99.25 302.863 84.25 302.863 78.05C302.863 76.85 302.163 75.3 300.763 73.4C299.463 71.4 298.113 69.75 296.713 68.45L294.763 66.5L295.213 64.25C312.013 61.75 325.613 60.5 336.013 60.5C356.613 60.5 366.913 68.9 366.913 85.7C366.913 96.9 363.213 106.35 355.813 114.05C348.413 121.65 337.413 125.45 322.813 125.45ZM320.413 115.4C328.113 115.4 333.913 112.5 337.813 106.7C341.813 100.9 343.813 93.15 343.813 83.45C343.813 79.45 343.063 76.2 341.563 73.7C340.063 71.1 337.863 69.8 334.963 69.8C333.063 69.8 330.713 70.15 327.913 70.85C326.313 81.35 323.313 96.2 318.912 115.4H320.413Z"
          fill="#FF6347"
        />
        <circle cx="333.5" cy="93.5" r="7.5" fill="#FF6347" />
      </svg>
    </Logo>
  );
};

function MenuLink({
  to,
  active,
  children,
}: {
  to: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <NoneLineLink to={to}>
      <MenuItem active={active}>{children}</MenuItem>
    </NoneLineLink>
  );
}

function HotIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
      />
    </svg>
  );
}

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
};

function LikeIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

function WriteIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

const ProfileIcon = ({ avatar }: { avatar: string | null | undefined }) => {
  return <MenuItem>{avatar && <Avatar src={avatar} alt="Profile" />}</MenuItem>;
};

function NotificationIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  );
}

function SettingIcon({ active }: { active: boolean }) {
  return active ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
