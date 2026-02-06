// ----------------------------
// 네비게이션 서브메뉴
// ----------------------------
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
  });
});

submenuWrap.addEventListener('mouseleave', function () {
  submenu.forEach(sub => sub.classList.remove('active'));
  if (window.scrollY < 100) {
    header.classList.remove('active');
  }
});

// ----------------------------
// 전체메뉴 클릭
// ----------------------------
let menu = document.querySelector('.menu');
let menuWrap = document.querySelector('.menu-wrap');
let backBtn = document.querySelector('.back-btn');

menu.addEventListener('click', function () {
  menuWrap.classList.add('active');
  toggleOverlay();
});

backBtn.addEventListener('click', function () {
  menuWrap.classList.remove('active');
  menuAccordionItem.forEach(i => i.classList.remove('active'));
  menuAccordion.forEach(m => m.classList.remove('active'));
  toggleOverlay();
});

// ----------------------------
// 반응형 아코디언 메뉴
// ----------------------------
const menuAccordion = document.querySelectorAll('.menu-accordion');
const menuAccordionItem = document.querySelectorAll('.menu-links');

menuAccordion.forEach(menu => {
  menu.addEventListener('click', function () {
    const targetId = this.dataset.target;
    const targetItem = document.getElementById(targetId);
    if (!targetItem) return;

    const isActive = targetItem.classList.contains('active');

    menuAccordionItem.forEach(i => i.classList.remove('active'));
    menuAccordion.forEach(m => m.classList.remove('active'));

    if (!isActive) {
      targetItem.classList.add('active');
      this.classList.add('active');
    }
  });
});

// ----------------------------
// 오버레이
// ----------------------------
function toggleOverlay() {
  let overlay = document.querySelector('.overlay');
  if (menuWrap.classList.contains('active')) {
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
}

//반응형 탭
let visualTab = document.querySelectorAll('.visual-tab');
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
// ----------------------------
// 서브페이지 탭 기능 (초기화 포함)
// ----------------------------

document.addEventListener('DOMContentLoaded', () => {
  let visualTab = document.querySelectorAll('.visual-tab');
  let mainTab = document.querySelectorAll('.main-tab');

  if (visualTab.length > 0 && mainTab.length > 0) {
    // 초기화: 첫 번째 탭만 활성화
    visualTab.forEach(t => t.classList.remove('active'));
    mainTab.forEach(m => m.classList.remove('active'));

    visualTab[0].classList.add('active');
    mainTab[0].classList.add('active');
  }

  // 클릭 이벤트
  visualTab.forEach(function (Tab) {
    Tab.addEventListener('click', function () {
      visualTab.forEach(t => t.classList.remove('active'));
      Tab.classList.add('active');

      mainTab.forEach(item => item.classList.remove('active'));
      let targetId = this.dataset.target;
      let targetmainTab = document.getElementById(targetId);
      if (targetId && targetmainTab) {
        targetmainTab.classList.add('active');
      }
    });
  });
});


// ----------------------------
// 공지사항 페이징 + 검색 기능 (main1, main2 동일 구조)
// ----------------------------
function setupNoticePagination(mainContainerId) {
  const mainContainer = document.getElementById(mainContainerId);
  if (!mainContainer) return;

  const rowsPerPage = 10;
  const pagesPerGroup = 5;

  const table = mainContainer.querySelector("#notice");
  const tbody = table.querySelector("tbody");
  const allRows = Array.from(tbody.querySelectorAll("tr"));
  const noResult = mainContainer.querySelector("#noResult");

  let filteredRows = [...allRows];
  const pagination = mainContainer.querySelector(".notice-pagination");
  const pageNumbers = mainContainer.querySelector("#noticeNumbers");
  const firstBtn = pagination.querySelector(".fa-angles-left");
  const prevBtn  = pagination.querySelector(".fa-chevron-left");
  const nextBtn  = pagination.querySelector(".fa-chevron-right");
  const lastBtn  = pagination.querySelector(".fa-angles-right");

  const searchInput = mainContainer.querySelector(".searchBox input");
  const searchBtn = mainContainer.querySelector(".searchBtn");

  let currentPage = 1;

  function totalPages() {
    return Math.ceil(filteredRows.length / rowsPerPage);
  }

  function showRows() {
    allRows.forEach(row => row.style.display = "none");

    if (filteredRows.length === 0) {
      noResult.style.display = "block";

      return;
    } else {
      noResult.style.display = "none";

    }

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const currentRows = filteredRows.slice(start, end);

    currentRows.forEach((row) => {
      row.style.display = "";

      const titleEl = row.querySelector(".notice-title");
      if (titleEl && !titleEl.dataset.hitEvent) {
        titleEl.addEventListener("click", () => {
          const hitCell = row.cells[4];
          hitCell.textContent = parseInt(hitCell.textContent || 0) + 1;
        });
        titleEl.dataset.hitEvent = "true";
      }
    });
  }

  function drawPagination() {
    pageNumbers.innerHTML = "";
    const total = totalPages();

    if (total <= 0) {
      pagination.style.display = "none";
      return;
    }

    pagination.style.display = "flex";
     if (currentPage === 1) {
    firstBtn.style.display = "none";
    prevBtn.style.display = "none";
  } else {
    firstBtn.style.display = "";
    prevBtn.style.display = "";
  }

  // 다음 / 마지막 버튼
  if (currentPage === total) {
    nextBtn.style.display = "none";
    lastBtn.style.display = "none";
  } else {
    nextBtn.style.display = "";
    lastBtn.style.display = "";
  }
    const group = Math.floor((currentPage - 1) / pagesPerGroup);
    const start = group * pagesPerGroup + 1;
    const end = Math.min(start + pagesPerGroup - 1, total);

    for (let i = start; i <= end; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#none";
      a.textContent = i;
      if (i === currentPage) a.classList.add("active");
      a.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        update();
      });
      li.appendChild(a);
      pageNumbers.appendChild(li);
    }
  }

  function handleSearch() {
    const keyword = searchInput.value.trim().toLowerCase();

    filteredRows = allRows.filter(row => {
      const title = row.cells[1].textContent.toLowerCase();
      return title.includes(keyword);
    });

    currentPage = 1;
    update();
  }

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  firstBtn.onclick = (e) => { e.preventDefault(); currentPage = 1; update(); };
  prevBtn.onclick = (e) => { 
    e.preventDefault(); 
    if (currentPage > 1) { currentPage--; update(); } 
  };
  nextBtn.onclick = (e) => { 
    e.preventDefault(); 
    if (currentPage < totalPages()) { currentPage++; update(); } 
  };
  lastBtn.onclick = (e) => { e.preventDefault(); currentPage = totalPages(); update(); };

  function update() {
    showRows();
    drawPagination();
  }

  update();
}

//공지사항 초기화
document.addEventListener("DOMContentLoaded", () => {
  setupNoticePagination("main1");
  setupNoticePagination("main2");
  setupNoticePagination("main3");
  setupNoticePagination("main4");
  setupNoticePagination("main5");
  setupNoticePagination("main6");
  setupNoticePagination("main7");
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