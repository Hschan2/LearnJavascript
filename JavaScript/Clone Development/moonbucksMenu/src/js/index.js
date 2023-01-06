// TODO localStorage Read & Write
// - [x] localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [x] 메뉴를 수정할 때
//  - [x] 메뉴를 삭제할 때
// - [x] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// - 에스프레소 메뉴판 관리
// - 프라푸치노 메뉴판 관리
// - 블렌디드 메뉴판 관리
// - 티바나 메뉴판 관리
// - 디저트 메뉴판 관리

// TODO 페이지 접근 시 최초 데이터 Read & Rendering
// - 페이지에 최초로 접근할 때 localStorage에 에스프레소 메뉴들을 읽어온다.
// - 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - 품절 버튼을 추가한다.
// - 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - click event에서 가장 가까운 li 태그 class 속성 값에 sold-out을 추가한다.
import { $ } from './utils/dom.js';
import store from './store/index.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListener();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class='menu-list-item d-flex items-center py-2'>
        <span class='w-100 pl-2 menu-name ${
          menuItem.soldOut ? 'sold-out' : ''
        }'>${menuItem.name}</span>
        <button
          type='button'
          class='bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button'>
          품절
        </button>
        <button
          type='button'
          class='bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button'>
          수정
        </button>
        <button
          type='button'
          class='bg-gray-50 text-gray-500 text-sm menu-remove-button'>
          삭제
        </button>
      </li>`;
      })
      .join('');
    $('#menu-list').innerHTML = template;
    updateMenuCount();
  };

  // 메뉴 총 갯수 count
  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($('#menu-name').value === '') {
      alert('값을 입력해주세요!');
      return;
    }
    const espressoMenuName = $('#menu-name').value;
    this.menu[this.currentCategory].push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    render();
    // input 빈값 초기화 (코드의 순서대로 실행되기때문에 가능)
    $('#menu-name').value = '';
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요!', $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const initEventListener = () => {
    $('#menu-list').addEventListener('click', (e) => {
      // 메뉴수정기능
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return;
      }

      // 메뉴 삭제
      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
        return;
      }

      // 메뉴 품절
      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e);
        return;
      }
    });

    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // 확인버튼 이벤트
    $('#menu-submit-button').addEventListener('click', addMenuName);

    // 메뉴의 이름을 입력받기
    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      addMenuName();
    });

    // nav 버튼 클릭시 이벤트(탭메뉴)
    $('nav').addEventListener('click', (e) => {
      const isCategoryBtn = e.target.classList.contains('cafe-category-name');
      if (isCategoryBtn) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
      }
      render();
    });
  };
}
const app = new App();
app.init();
