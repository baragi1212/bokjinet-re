
//네비게이션 서브메뉴
let menuItems = document.querySelectorAll('.menu-item');
let submenu = document.querySelectorAll('.submenu');
let submenuWrap = document.querySelector('.submenu-wrap');
let header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});
menuItems.forEach(function (item) {
  item.addEventListener('mouseenter', function () {
    submenu.forEach(sub => sub.classList.remove('active'));
    let targetId = this.dataset.target;
    let targetSubmenu = document.getElementById(targetId);
    if (targetId) {
      targetSubmenu.classList.add('active');
      header.classList.add('active');
    }
  })
})
submenuWrap.addEventListener('mouseleave', function () {
  submenu.forEach(sub => sub.classList.remove('active'));

  if (window.scrollY < 100) {
    header.classList.remove('active');
  }


});
//전체메뉴 클릭
let menu = document.querySelector('.menu');
let menuWrap = document.querySelector('.menu-wrap');
let backBtn = document.querySelector('.back-btn');

menu.addEventListener('click', function () {
  menuWrap.classList.add('active');
  over()
})
backBtn.addEventListener('click', function () {
  // 전체 메뉴 닫기
  menuWrap.classList.remove('active');
  
  // 열려있는 모든 아코디언 내용(links)과 헤더의 active 클래스 제거
  menuAccordionItem.forEach(i => i.classList.remove('active'));
  menuAccordion.forEach(m => m.classList.remove('active'));

  over();
});
//반응형 아코디언 메뉴
const menuAccordion = document.querySelectorAll('.menu-accordion');
const menuAccordionItem = document.querySelectorAll('.menu-links');

menuAccordion.forEach(menu => {
  menu.addEventListener('click', function () {
    const targetId = this.dataset.target;
    const targetItem = document.getElementById(targetId);
    if (!targetItem) return;

    const isActive = targetItem.classList.contains('active');

    // 모든 메뉴 닫기
    menuAccordionItem.forEach(i => i.classList.remove('active'));
    menuAccordion.forEach(m => m.classList.remove('active')); // 헤더도 닫기

    // 클릭한 메뉴가 닫혀 있었으면 열기
    if (!isActive) {
      targetItem.classList.add('active');
      this.classList.add('active'); // 헤더에 active 추가
    }
  });
});

//오버레이
function over() {
  let overlay = document.querySelector('.overlay');
  if (menuWrap.classList.contains('active')) {
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
}

//서브페이지 탭기능
let visualTab = document.querySelectorAll('.visual-tab');
let mainTab = document.querySelectorAll('.main-tab');
visualTab.forEach(function (Tab) {
  Tab.addEventListener('click', function () {
    visualTab.forEach(t => t.classList.remove('active'));
    Tab.classList.add('active');
    mainTab.forEach(item => item.classList.remove('active'));
    let targetId = this.dataset.target;
    let targetmainTab = document.getElementById(targetId);
    if (targetId) {
      targetmainTab.classList.add('active');
    }

  })
})

//반응형 탭
  let tabSelect = document.querySelector('.visual-tab-select');
  let tabSelectTabs = document.querySelector('.visual-tabs');
  let icon = document.querySelector('.fa-chevron-down')
  tabSelect.addEventListener('click', function () {
    tabSelectTabs.classList.add('active');
  })
  visualTab.forEach(t => {
    t.addEventListener('click', function () {
      tabSelectTabs.classList.remove('active');
      tabSelect.textContent = t.textContent;

    })
  })
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#main1'); // 컨테이너 범위

  // --- 검색조건 요소 ---
  const facilitiesIcon = container.querySelectorAll('.facilities-icon');
  const region = container.querySelector('.region-tab');
  const regionBox = container.querySelector('.region-tab-boxs');
  const regionTabBox = container.querySelectorAll('.region-tab-box');
  const form = container.querySelector('.form-tab');
  const formBox = container.querySelector('.form-tab-boxs');
  const formTabBox = container.querySelectorAll('.form-tab-box');
  const period = container.querySelectorAll('.period-tab');
  const personal = container.querySelector('.personal-tab');
  const personalBox = container.querySelector('.personal-tab-boxs');
  const personalTabBox = container.querySelectorAll('.personal-tab-box');
  const searchChk = container.querySelectorAll('.search-chkbox');
  const searchInput = container.querySelector('#searchInput');
  const searchBtn = container.querySelector('#searchBtn');
  const resetBtn = container.querySelector('.condition-reset');
  const condition = container.querySelector('.condition-content1');
  const tbody = container.querySelector('tbody');
  const noResultEl = container.querySelector('#noResult');
  const tableRows = Array.from(tbody.querySelectorAll('tr'));

  const numbers = container.querySelector('#noticeNumbers');
  const firstPageBtn = container.querySelector('.fa-angles-left');
  const prevPageBtn = container.querySelector('.fa-chevron-left');
  const nextPageBtn = container.querySelector('.fa-chevron-right');
  const lastPageBtn = container.querySelector('.fa-angles-right');

  let currentPage = 0;
  const rowsPerPage = 10;
  const maxPageNum = 5;
  let filteredRows = [...tableRows];

  // --- 검색필터 초기화 ---
  const searchFilter = {
    facilities: "", area: "", type: "", order: "",
    career: "", title: "", windpipe: "", search: ""
  };

  // --- 렌더링 조건 ---
  function renderCondition() {
    const activeConditions = Object.values(searchFilter)
      .filter(v => v.trim() !== "")
      .map(v => `<p>${v}</p>`).join("");
    
    if (!activeConditions) {
      condition.innerHTML = `<span>검색조건이 없습니다.</span>`;
      return;
    }
    const count = (activeConditions.match(/<p>/g) || []).length;
    condition.innerHTML = `<span>검색조건 ${count}건</span> ${activeConditions}`;
  }

  // --- 필터링 ---
  function updateFilteredRows() {
    filteredRows = tableRows.filter(row => {
      const category = row.cells[0].textContent;
      const title = row.querySelector('.notice-title').textContent;
      const area = row.cells[2].textContent;
      const type = row.cells[3].textContent;
      const career = row.cells[4].textContent;

      const matchFacilities = !searchFilter.facilities || searchFilter.facilities === "전체" || category.includes(searchFilter.facilities);
      const matchArea = !searchFilter.area || searchFilter.area === "전체" || area.includes(searchFilter.area);
      const matchType = !searchFilter.type || searchFilter.type === "전체" || type.includes(searchFilter.type);
      const matchCareer = !searchFilter.career || searchFilter.career === "전체" || career.includes(searchFilter.career);
      const matchSearch = !searchFilter.search || title.includes(searchFilter.search);

      return matchFacilities && matchArea && matchType && matchCareer && matchSearch;
    });
     // --- 정렬 로직 (등록순 / 마감임박) ---
  if (searchFilter.order === "등록순" || searchFilter.order === "마감임박") {
    filteredRows.sort((a, b) => {
      const dateA = a.cells[5].textContent.split('~');
      const dateB = b.cells[5].textContent.split('~');

      if (searchFilter.order === "마감임박") {
        // 마감일 기준 오름차순
        return new Date(dateA[1].trim()) - new Date(dateB[1].trim());
      } else if (searchFilter.order === "등록순") {
        // 등록일 기준 내림차순
        return new Date(dateB[0].trim()) - new Date(dateA[0].trim());
      }
      return 0;
    });
  }
    displayRow(0);
  }

  // --- 테이블 행 표시 ---
  function displayRow(idx) {
    const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
    currentPage = Math.max(0, Math.min(idx, pageCount - 1));

    tableRows.forEach(row => row.style.display = 'none');
    filteredRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
      .forEach(row => row.style.display = '');

    noResultEl.style.display = filteredRows.length === 0 ? 'block' : 'none';

    renderPagination();
  }

  // --- 페이지네이션 ---
  function renderPagination() {
    const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
    numbers.innerHTML = '';
    const currentGroup = Math.floor(currentPage / maxPageNum);
    const startPage = currentGroup * maxPageNum;
    const endPage = Math.min(startPage + maxPageNum, pageCount);

    for (let i = startPage; i < endPage; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#none" class="${i === currentPage ? 'active' : ''}">${i + 1}</a>`;
      li.querySelector('a').addEventListener('click', e => {
        e.preventDefault();
        displayRow(i);
      });
      numbers.appendChild(li);
    }

    prevPageBtn.style.display = startPage > 0 ? 'inline-block' : 'none';
    nextPageBtn.style.display = endPage < pageCount ? 'inline-block' : 'none';
    firstPageBtn.style.display = currentPage > 0 ? 'inline-block' : 'none';
    lastPageBtn.style.display = currentPage < pageCount - 1 ? 'inline-block' : 'none';
  }

  prevPageBtn.addEventListener('click', e => {
    e.preventDefault();
    const prevGroupStart = (Math.floor(currentPage / maxPageNum) - 1) * maxPageNum;
    displayRow(Math.max(prevGroupStart, 0));
  });

  nextPageBtn.addEventListener('click', e => {
    e.preventDefault();
    const nextGroupStart = (Math.floor(currentPage / maxPageNum) + 1) * maxPageNum;
    displayRow(Math.min(nextGroupStart, Math.ceil(filteredRows.length / rowsPerPage) - 1));
  });

  firstPageBtn.addEventListener('click', e => { e.preventDefault(); displayRow(0); });
  lastPageBtn.addEventListener('click', e => { e.preventDefault(); displayRow(Math.ceil(filteredRows.length / rowsPerPage) - 1); });

  // --- 검색조건 이벤트 ---
  facilitiesIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      facilitiesIcon.forEach(e => e.classList.remove('active'));
      icon.classList.add('active');
      searchFilter.facilities = icon.querySelector('span').textContent;
      renderCondition();
    });
  });

  region.addEventListener('click', () => regionBox.classList.add('active'));
  regionTabBox.forEach(b => {
    b.addEventListener('click', () => {
      regionTabBox.forEach(box => box.classList.remove('active'));
      b.classList.add('active');
      region.textContent = b.textContent;
      regionBox.classList.remove('active');
      searchFilter.area = b.textContent;
      renderCondition();
    });
  });

  form.addEventListener('click', () => formBox.classList.add('active'));
  formTabBox.forEach(b => {
    b.addEventListener('click', () => {
      formTabBox.forEach(box => box.classList.remove('active'));
      b.classList.add('active');
      form.textContent = b.textContent;
      formBox.classList.remove('active');
      searchFilter.type = b.textContent;
      renderCondition();
    });
  });

  period.forEach(f => {
    f.addEventListener('click', () => {
      period.forEach(i => i.classList.remove('active'));
      f.classList.add('active');
      searchFilter.order = f.textContent;
      renderCondition();
    });
  });

  personal.addEventListener('click', () => personalBox.classList.add('active'));
  personalTabBox.forEach(b => {
    b.addEventListener('click', () => {
      personalTabBox.forEach(box => box.classList.remove('active'));
      b.classList.add('active');
      personal.textContent = b.textContent;
      personalBox.classList.remove('active');
      searchFilter.career = b.textContent;
      renderCondition();
    });
  });

  searchChk.forEach(e => {
    e.addEventListener('click', () => {
      const target = e.querySelector('.search-chkbox-chk');
      target.classList.toggle('active');
    });
  });

  // --- 검색 버튼 ---
  searchBtn.addEventListener('click', () => {
    searchFilter.search = searchInput.value.trim();
    renderCondition();
    updateFilteredRows();
  });

  // --- 초기화 버튼 ---
  resetBtn.addEventListener('click', () => {
    for (let key in searchFilter) searchFilter[key] = "";
    region.textContent = "근무지역"; regionTabBox.forEach((r, i) => { r.classList.remove('active'); if (i === 0) r.classList.add('active'); });
    form.textContent = "근무형태"; formTabBox.forEach((f, i) => { f.classList.remove('active'); if (i === 0) f.classList.add('active'); });
    personal.textContent = "경력"; personalTabBox.forEach((p, i) => { p.classList.remove('active'); if (i === 0) p.classList.add('active'); });
    facilitiesIcon.forEach((icon, i) => { icon.classList.remove('active'); if (i === 0) icon.classList.add('active'); });
    period.forEach((peri, i) => { peri.classList.remove('active'); if (i === 0) peri.classList.add('active'); });
    searchChk.forEach(e => e.querySelector('.search-chkbox-chk').classList.remove('active'));

    renderCondition();
    updateFilteredRows();
  });

  // 초기 실행
  renderCondition();
  updateFilteredRows();
});
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#main2'); // 컨테이너 범위

  // --- 검색조건 요소 ---
  const facilitiesIcon = container.querySelectorAll('.facilities-icon');
  const region = container.querySelector('.region-tab');
  const regionBox = container.querySelector('.region-tab-boxs');
  const regionTabBox = container.querySelectorAll('.region-tab-box');
  const form = container.querySelector('.form-tab');
  const formBox = container.querySelector('.form-tab-boxs');
  const formTabBox = container.querySelectorAll('.form-tab-box');
  const period = container.querySelectorAll('.period-tab');
  const personal = container.querySelector('.personal-tab');
  const personalBox = container.querySelector('.personal-tab-boxs');
  const personalTabBox = container.querySelectorAll('.personal-tab-box');
  const searchChk = container.querySelectorAll('.search-chkbox');
  const searchInput = container.querySelector('#searchInput');
  const searchBtn = container.querySelector('#searchBtn');
  const resetBtn = container.querySelector('.condition-reset');
  const condition = container.querySelector('.condition-content1');
  const tbody = container.querySelector('tbody');
  const noResultEl = container.querySelector('#noResult');
  const tableRows = Array.from(tbody.querySelectorAll('tr'));

  const numbers = container.querySelector('#noticeNumbers');
  const firstPageBtn = container.querySelector('.fa-angles-left');
  const prevPageBtn = container.querySelector('.fa-chevron-left');
  const nextPageBtn = container.querySelector('.fa-chevron-right');
  const lastPageBtn = container.querySelector('.fa-angles-right');

  let currentPage = 0;
  const rowsPerPage = 10;
  const maxPageNum = 5;
  let filteredRows = [...tableRows];

  // --- 검색필터 초기화 ---
  const searchFilter = {
    facilities: "", area: "", type: "", order: "",
    career: "", title: "", windpipe: "", search: ""
  };

  // --- 렌더링 조건 ---
  function renderCondition() {
    const activeConditions = Object.values(searchFilter)
      .filter(v => v.trim() !== "")
      .map(v => `<p>${v}</p>`).join("");
    
    if (!activeConditions) {
      condition.innerHTML = `<span>검색조건이 없습니다.</span>`;
      return;
    }
    const count = (activeConditions.match(/<p>/g) || []).length;
    condition.innerHTML = `<span>검색조건 ${count}건</span> ${activeConditions}`;
  }

  // --- 필터링 ---
  function updateFilteredRows() {
    filteredRows = tableRows.filter(row => {
      const category = row.cells[0].textContent;
      const title = row.querySelector('.notice-title').textContent;
      const area = row.cells[2].textContent;
      const type = row.cells[3].textContent;
      const career = row.cells[4].textContent;

      const matchFacilities = !searchFilter.facilities || searchFilter.facilities === "전체" || category.includes(searchFilter.facilities);
      const matchArea = !searchFilter.area || searchFilter.area === "전체" || area.includes(searchFilter.area);
      const matchType = !searchFilter.type || searchFilter.type === "전체" || type.includes(searchFilter.type);
      const matchCareer = !searchFilter.career || searchFilter.career === "전체" || career.includes(searchFilter.career);
      const matchSearch = !searchFilter.search || title.includes(searchFilter.search);

      return matchFacilities && matchArea && matchType && matchCareer && matchSearch;
    });
if (searchFilter.order === "최신순" || searchFilter.order === "오래된순") {
  filteredRows.sort((a, b) => {
    const dateA = new Date(a.cells[5].textContent.split('~')[0].trim()); // 등록일
    const dateB = new Date(b.cells[5].textContent.split('~')[0].trim()); // 등록일

    if (searchFilter.order === "최신순") {
      // 등록일이 최근일수록 앞으로
      return dateB - dateA;
    } else if (searchFilter.order === "오래된순") {
      // 등록일이 오래된 순서대로
      return dateA - dateB;
    }
    return 0;
  });
}
    displayRow(0);
  }

  // --- 테이블 행 표시 ---
  function displayRow(idx) {
    const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
    currentPage = Math.max(0, Math.min(idx, pageCount - 1));

    tableRows.forEach(row => row.style.display = 'none');
    filteredRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
      .forEach(row => row.style.display = '');

    noResultEl.style.display = filteredRows.length === 0 ? 'block' : 'none';

    renderPagination();
  }

  // --- 페이지네이션 ---
  function renderPagination() {
    const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
    numbers.innerHTML = '';
    const currentGroup = Math.floor(currentPage / maxPageNum);
    const startPage = currentGroup * maxPageNum;
    const endPage = Math.min(startPage + maxPageNum, pageCount);

    for (let i = startPage; i < endPage; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#none" class="${i === currentPage ? 'active' : ''}">${i + 1}</a>`;
      li.querySelector('a').addEventListener('click', e => {
        e.preventDefault();
        displayRow(i);
      });
      numbers.appendChild(li);
    }

    prevPageBtn.style.display = startPage > 0 ? 'inline-block' : 'none';
    nextPageBtn.style.display = endPage < pageCount ? 'inline-block' : 'none';
    firstPageBtn.style.display = currentPage > 0 ? 'inline-block' : 'none';
    lastPageBtn.style.display = currentPage < pageCount - 1 ? 'inline-block' : 'none';
  }

  prevPageBtn.addEventListener('click', e => {
    e.preventDefault();
    const prevGroupStart = (Math.floor(currentPage / maxPageNum) - 1) * maxPageNum;
    displayRow(Math.max(prevGroupStart, 0));
  });

  nextPageBtn.addEventListener('click', e => {
    e.preventDefault();
    const nextGroupStart = (Math.floor(currentPage / maxPageNum) + 1) * maxPageNum;
    displayRow(Math.min(nextGroupStart, Math.ceil(filteredRows.length / rowsPerPage) - 1));
  });

  firstPageBtn.addEventListener('click', e => { e.preventDefault(); displayRow(0); });
  lastPageBtn.addEventListener('click', e => { e.preventDefault(); displayRow(Math.ceil(filteredRows.length / rowsPerPage) - 1); });

  // --- 검색조건 이벤트 ---
  facilitiesIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      facilitiesIcon.forEach(e => e.classList.remove('active'));
      icon.classList.add('active');
      searchFilter.facilities = icon.querySelector('span').textContent;
      renderCondition();
    });
  });

  region.addEventListener('click', () => regionBox.classList.add('active'));
  regionTabBox.forEach(b => {
    b.addEventListener('click', () => {
      regionTabBox.forEach(box => box.classList.remove('active'));
      b.classList.add('active');
      region.textContent = b.textContent;
      regionBox.classList.remove('active');
      searchFilter.area = b.textContent;
      renderCondition();
    });
  });

  form.addEventListener('click', () => formBox.classList.add('active'));
  formTabBox.forEach(b => {
    b.addEventListener('click', () => {
      formTabBox.forEach(box => box.classList.remove('active'));
      b.classList.add('active');
      form.textContent = b.textContent;
      formBox.classList.remove('active');
      searchFilter.type = b.textContent;
      renderCondition();
    });
  });

  period.forEach(f => {
    f.addEventListener('click', () => {
      period.forEach(i => i.classList.remove('active'));
      f.classList.add('active');
      searchFilter.order = f.textContent;
      renderCondition();
    });
  });

  personal.addEventListener('click', () => personalBox.classList.add('active'));
  personalTabBox.forEach(b => {
    b.addEventListener('click', () => {
      personalTabBox.forEach(box => box.classList.remove('active'));
      b.classList.add('active');
      personal.textContent = b.textContent;
      personalBox.classList.remove('active');
      searchFilter.career = b.textContent;
      renderCondition();
    });
  });

  searchChk.forEach(e => {
    e.addEventListener('click', () => {
      const target = e.querySelector('.search-chkbox-chk');
      target.classList.toggle('active');
    });
  });

  // --- 검색 버튼 ---
  searchBtn.addEventListener('click', () => {
    searchFilter.search = searchInput.value.trim();
    renderCondition();
    updateFilteredRows();
  });

  // --- 초기화 버튼 ---
  resetBtn.addEventListener('click', () => {
    for (let key in searchFilter) searchFilter[key] = "";
    region.textContent = "근무지역"; regionTabBox.forEach((r, i) => { r.classList.remove('active'); if (i === 0) r.classList.add('active'); });
    form.textContent = "근무형태"; formTabBox.forEach((f, i) => { f.classList.remove('active'); if (i === 0) f.classList.add('active'); });
    personal.textContent = "경력"; personalTabBox.forEach((p, i) => { p.classList.remove('active'); if (i === 0) p.classList.add('active'); });
    facilitiesIcon.forEach((icon, i) => { icon.classList.remove('active'); if (i === 0) icon.classList.add('active'); });
    period.forEach((peri, i) => { peri.classList.remove('active'); if (i === 0) peri.classList.add('active'); });
    searchChk.forEach(e => e.querySelector('.search-chkbox-chk').classList.remove('active'));

    renderCondition();
    updateFilteredRows();
  });

  // 초기 실행
  renderCondition();
  updateFilteredRows();
});
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#main3'); // 컨테이너 범위

  // --- 검색조건 요소 ---
  const facilitiesIcon = container.querySelectorAll('.facilities-icon');
  const region = container.querySelector('.region-tab');
  const regionBox = container.querySelector('.region-tab-boxs');
  const regionTabBox = container.querySelectorAll('.region-tab-box');
  const period = container.querySelectorAll('.period-tab');
  const searchChk = container.querySelectorAll('.search-chkbox');
  const searchInput = container.querySelector('#searchInput');
  const searchBtn = container.querySelector('#searchBtn');
  const resetBtn = container.querySelector('.condition-reset');
  const condition = container.querySelector('.condition-content1');
  const tbody = container.querySelector('tbody');
  const noResultEl = container.querySelector('#noResult');
  const tableRows = Array.from(tbody.querySelectorAll('tr'));

  const numbers = container.querySelector('#noticeNumbers');
  const firstPageBtn = container.querySelector('.fa-angles-left');
  const prevPageBtn = container.querySelector('.fa-chevron-left');
  const nextPageBtn = container.querySelector('.fa-chevron-right');
  const lastPageBtn = container.querySelector('.fa-angles-right');

  let currentPage = 0;
  const rowsPerPage = 10;
  const maxPageNum = 5;
  let filteredRows = [...tableRows];

  // --- 검색필터 초기화 ---
  const searchFilter = {
    facilities: "", area: "", type: "", order: "",
    career: "", title: "", windpipe: "", search: ""
  };

  // --- 렌더링 조건 ---
  function renderCondition() {
    const activeConditions = Object.values(searchFilter)
      .filter(v => v.trim() !== "")
      .map(v => `<p>${v}</p>`).join("");
    
    if (!activeConditions) {
      condition.innerHTML = `<span>검색조건이 없습니다.</span>`;
      return;
    }
    const count = (activeConditions.match(/<p>/g) || []).length;
    condition.innerHTML = `<span>검색조건 ${count}건</span> ${activeConditions}`;
  }

  // --- 필터링 ---
  function updateFilteredRows() {
    filteredRows = tableRows.filter(row => {
      const category = row.cells[0].textContent;
      const title = row.querySelector('.notice-title').textContent;
      const area = row.cells[2].textContent;
      const type = row.cells[3].textContent;
      const career = row.cells[4].textContent;

      const matchFacilities = !searchFilter.facilities || searchFilter.facilities === "전체" || category.includes(searchFilter.facilities);
      const matchArea = !searchFilter.area || searchFilter.area === "전체" || area.includes(searchFilter.area);
      const matchType = !searchFilter.type || searchFilter.type === "전체" || type.includes(searchFilter.type);
      const matchCareer = !searchFilter.career || searchFilter.career === "전체" || career.includes(searchFilter.career);
      const matchSearch = !searchFilter.search || title.includes(searchFilter.search);

      return matchFacilities && matchArea && matchType && matchCareer && matchSearch;
    });
if (searchFilter.order === "최신순" || searchFilter.order === "오래된순") {
  filteredRows.sort((a, b) => {
    const dateA = new Date(a.cells[5].textContent.split('~')[0].trim()); // 등록일
    const dateB = new Date(b.cells[5].textContent.split('~')[0].trim()); // 등록일

    if (searchFilter.order === "최신순") {
      // 등록일이 최근일수록 앞으로
      return dateB - dateA;
    } else if (searchFilter.order === "오래된순") {
      // 등록일이 오래된 순서대로
      return dateA - dateB;
    }
    return 0;
  });
}
    displayRow(0);
  }

  // --- 테이블 행 표시 ---
  function displayRow(idx) {
    const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
    currentPage = Math.max(0, Math.min(idx, pageCount - 1));

    tableRows.forEach(row => row.style.display = 'none');
    filteredRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
      .forEach(row => row.style.display = '');

    noResultEl.style.display = filteredRows.length === 0 ? 'block' : 'none';

    renderPagination();
  }

  // --- 페이지네이션 ---
  function renderPagination() {
    const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
    numbers.innerHTML = '';
    const currentGroup = Math.floor(currentPage / maxPageNum);
    const startPage = currentGroup * maxPageNum;
    const endPage = Math.min(startPage + maxPageNum, pageCount);

    for (let i = startPage; i < endPage; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#none" class="${i === currentPage ? 'active' : ''}">${i + 1}</a>`;
      li.querySelector('a').addEventListener('click', e => {
        e.preventDefault();
        displayRow(i);
      });
      numbers.appendChild(li);
    }

    prevPageBtn.style.display = startPage > 0 ? 'inline-block' : 'none';
    nextPageBtn.style.display = endPage < pageCount ? 'inline-block' : 'none';
    firstPageBtn.style.display = currentPage > 0 ? 'inline-block' : 'none';
    lastPageBtn.style.display = currentPage < pageCount - 1 ? 'inline-block' : 'none';
  }

  prevPageBtn.addEventListener('click', e => {
    e.preventDefault();
    const prevGroupStart = (Math.floor(currentPage / maxPageNum) - 1) * maxPageNum;
    displayRow(Math.max(prevGroupStart, 0));
  });

  nextPageBtn.addEventListener('click', e => {
    e.preventDefault();
    const nextGroupStart = (Math.floor(currentPage / maxPageNum) + 1) * maxPageNum;
    displayRow(Math.min(nextGroupStart, Math.ceil(filteredRows.length / rowsPerPage) - 1));
  });

  firstPageBtn.addEventListener('click', e => { e.preventDefault(); displayRow(0); });
  lastPageBtn.addEventListener('click', e => { e.preventDefault(); displayRow(Math.ceil(filteredRows.length / rowsPerPage) - 1); });

  // --- 검색조건 이벤트 ---
  facilitiesIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      facilitiesIcon.forEach(e => e.classList.remove('active'));
      icon.classList.add('active');
      searchFilter.facilities = icon.querySelector('span').textContent;
      renderCondition();
    });
  });

  region.addEventListener('click', () => regionBox.classList.add('active'));
  regionTabBox.forEach(b => {
    b.addEventListener('click', () => {
      regionTabBox.forEach(box => box.classList.remove('active'));
      b.classList.add('active');
      region.textContent = b.textContent;
      regionBox.classList.remove('active');
      searchFilter.area = b.textContent;
      renderCondition();
    });
  });



  period.forEach(f => {
    f.addEventListener('click', () => {
      period.forEach(i => i.classList.remove('active'));
      f.classList.add('active');
      searchFilter.order = f.textContent;
      renderCondition();
    });
  });



  searchChk.forEach(e => {
    e.addEventListener('click', () => {
      const target = e.querySelector('.search-chkbox-chk');
      target.classList.toggle('active');
    });
  });

  // --- 검색 버튼 ---
  searchBtn.addEventListener('click', () => {
    searchFilter.search = searchInput.value.trim();
    renderCondition();
    updateFilteredRows();
  });

  // --- 초기화 버튼 ---
  resetBtn.addEventListener('click', () => {
    for (let key in searchFilter) searchFilter[key] = "";
    region.textContent = "근무지역"; regionTabBox.forEach((r, i) => { r.classList.remove('active'); if (i === 0) r.classList.add('active'); });
   
    facilitiesIcon.forEach((icon, i) => { icon.classList.remove('active'); if (i === 0) icon.classList.add('active'); });
    period.forEach((peri, i) => { peri.classList.remove('active'); if (i === 0) peri.classList.add('active'); });
    searchChk.forEach(e => e.querySelector('.search-chkbox-chk').classList.remove('active'));

    renderCondition();
    updateFilteredRows();
  });

  // 초기 실행
  renderCondition();
  updateFilteredRows();
});

//반응형 아이콘 탭
document.querySelectorAll('.main-tab').forEach(tab => {
  const cardTabSelect = tab.querySelector('.card-tab-select');
  const facilitiesIcons = tab.querySelector('.facilities-icons');
  const facilitiesIcon = tab.querySelectorAll('.facilities-icon');

  cardTabSelect.addEventListener('click', () => {
    facilitiesIcons.classList.add('active');
  });

  facilitiesIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      facilitiesIcons.classList.remove('active');
      cardTabSelect.textContent = icon.textContent;
    });
  });
});
//푸터 관련사이트
let siteBox = document.querySelector('.footer-site-box');
let site = document.getElementById('site');

siteBox.addEventListener('click', function () {
  site.classList.toggle('active');
  siteBox.classList.toggle('active');
})
    AOS.init({
      startEvent: 'DOMContentLoaded',
      duration: 1000,
      delay: 300,
    });