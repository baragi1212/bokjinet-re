
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
//서브페이지 아이디찾기 탭전환
let findIdTab = document.querySelectorAll('.findid-tab');
let cardinp = document.querySelectorAll('.card-inp');
findIdTab.forEach(function (Tab) {
  Tab.addEventListener('click', function () {
    findIdTab.forEach(t => t.classList.remove('active'));
    Tab.classList.add('active');
    cardinp.forEach(item => item.classList.remove('active'));
    let targetId = this.dataset.target;
    let targetcardinp = document.getElementById(targetId);
    if (targetId) {
      targetcardinp.classList.add('active');
    }

  })
})
//서브페이지 비밀번호찾기 탭전환
let ForgotPasswordTab = document.querySelectorAll('.ForgotPassword-tab');
let ForgotPasswordItem = document.querySelectorAll('.ForgotPassword-card-inp');
ForgotPasswordTab.forEach(function (Tab) {
  Tab.addEventListener('click', function () {
    ForgotPasswordTab.forEach(t => t.classList.remove('active'));
    Tab.classList.add('active');
    ForgotPasswordItem.forEach(item => item.classList.remove('active'));
    let targetId = this.dataset.target;
    let targetForgotPasswordTab = document.getElementById(targetId);
    if (targetId) {
      targetForgotPasswordTab.classList.add('active');
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