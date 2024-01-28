import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-right: 20px;
`;

const MenuItem = styled.div`
  padding: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  gap: 10px;
  opacity: 0.85;
  svg {
    width: 30px;
    fill: white;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
  &:hover {
    opacity: 1;
  }
`;

const NoneLineLink = styled(Link)`
  text-decoration: none;
`;

const MenuName = styled.span`
  color: white;
  font-size: 14px;
`;

const Logo = styled.span`
  svg {
    width: 100px;
    height: 100px;
    color: white;
    margin-bottom: 30px;
  }
`;

function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const checkLogOut = confirm("로그아웃을 하실 건가요?");
    if (checkLogOut) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <Menu>
        <NoneLineLink to="/">
          <Logo>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
              <path
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </Logo>
        </NoneLineLink>
        <NoneLineLink to="/">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
            <MenuName>Home</MenuName>
          </MenuItem>
        </NoneLineLink>
        <NoneLineLink to="/profile">
          <MenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <MenuName>Profile</MenuName>
          </MenuItem>
        </NoneLineLink>
        <MenuItem onClick={onLogOut} className="log-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          <MenuName>Logout</MenuName>
        </MenuItem>
      </Menu>
      <Outlet />
    </Wrapper>
  );
}

export default Layout;
