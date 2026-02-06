/* 포풀 팝업 */
let portfolio = document.querySelector('.portfolio-wrap');
let portfolioBtn = document.getElementById('portfolioX');
let overlay2 = document.querySelector('.overlay2');
portfolioBtn.addEventListener('click', function(){
  portfolio.style.display = 'none';
  overlay2.classList.add('active');
})
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
//팝업창
let overlay = document.querySelector('.overlay');
let popup = document.querySelector('.popup-wrap');
let popupBtn = document.getElementById('popupBtn');   // 일반 닫기 버튼
let popupBtn2 = document.querySelector('.popup-btn'); // [오늘 하루 보지 않기] 버튼

// 1. 쿠키 설정 함수
function setCookie(name, value, days) {
  const date = new Date();
  // 24시간을 밀리초로 계산하여 설정
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 2. 쿠키 가져오기 함수
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// [일반 닫기] 버튼 클릭 시
popupBtn.addEventListener('click', function () {
  popup.style.display = 'none';
  overlay.classList.remove('active');
});

// [오늘 하루 보지 않기] 버튼 클릭 시
popupBtn2.addEventListener('click', function () {
  setCookie("mainPopup", "done", 1); // 'mainPopup'이라는 이름으로 1일간 쿠키 저장
  popup.style.display = 'none';
  overlay.classList.remove('active');
});

// 3. 페이지 로드 시 실행 (팝업 노출 여부 결정)
window.onload = function() {
  const isHide = getCookie("mainPopup");
  
  if (isHide !== "done") {
    // 쿠키가 없으면 팝업을 보여줌
    popup.style.display = 'block';
    popupOver();
  } else {
    // 쿠키가 있으면 팝업을 숨김
    popup.style.display = 'none';
    overlay.classList.remove('active');
  }
};

function popupOver() {
  if (window.getComputedStyle(popup).display === 'block') {
    overlay.classList.add('active');
  }
}
popupOver()
//팝업 슬라이드
var mypopup = new Swiper(".mypopup", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  centeredSlides: false,
  navigation: {
    nextEl: ".mypopup-button-next",
    prevEl: ".mypopup-button-prev",
  },
  keyboard: {
    enabled: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
  },
});

// 메인 비주얼 슬라이드
var myvisual = new Swiper(".myvisual", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  centeredSlides: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  keyboard: {
    enabled: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
  },

});
//복지소식 슬라이드
var Tidings = new Swiper(".myTidings", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".arrow-right",
    prevEl: ".arrow-left",
  },
  pagination: {
    el: ".myTidings-pagination",
    clickable: true,
  },
  keyboard: {
    enabled: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
  },
  breakpoints: {
    // when window width is >= 480
    0: {
      slidesPerView: 1,
      spaceBetween: 20,

    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  }
});
//참여 슬라이드
var join = new Swiper(".join-slide", {
  observer: true,
  observeParents: true,
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  keyboard: {
    enabled: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
  },
  navigation: {
    nextEl: ".join-arrow-right",
    prevEl: ".join-arrow-left",
  },
  pagination: {
    el: ".join-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  },



});

window.addEventListener('load', function () {
  join.update();
});
//참여 탭 전환
let joinTab = document.querySelectorAll('.join-tab');
let joinItem = document.querySelectorAll('.join-slide');
joinTab.forEach(function (Tab) {
  Tab.addEventListener('click', function () {
    joinTab.forEach(t => t.classList.remove('active'));
    Tab.classList.add('active');
    joinItem.forEach(item => item.classList.remove('active'));
    let targetId = this.dataset.target;
    let targetJoinItem = document.getElementById(targetId);
    if (targetId) {
      targetJoinItem.classList.add('active');
    }
    join.update();       // 꼭 호출
    join.slideTo(0);     // 슬라이드 초기 위치로
  })
})
//이벤트 슬라이드
var myEvent = new Swiper(".myEvent", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  keyboard: {
    enabled: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
  },
  pagination: {
    el: ".event-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".event-arrow-right",
    prevEl: ".event-arrow-left",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});
let eventStop = document.querySelector('.event-stop');
let eventPlay = document.querySelector('.event-play');

eventStop.addEventListener('click', function () {
  myEvent.autoplay.stop();
  eventStop.style.display = 'none';
  eventPlay.style.display = 'block';
})
eventPlay.addEventListener('click', function () {
  myEvent.autoplay.start();
  eventStop.style.display = 'block';
  eventPlay.style.display = 'none';
})
//복지한눈에 슬라이드
var myWelfare = new Swiper(".myWelfare", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  keyboard: {
    enabled: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
  },
  pagination: {
    el: ".welfare-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".welfare-arrow-right",
    prevEl: ".welfare-arrow-left",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
      grid: {
        rows: 2,
      },
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
      grid: {
        rows: 1,
      },
    }
  }
});
//복지한눈에 탭전환
let welfareTab = document.querySelectorAll('.welfare-tab');
let myWelfareItem = document.querySelectorAll('.myWelfare');
welfareTab.forEach(function (Tab) {
  Tab.addEventListener('click', function () {
    welfareTab.forEach(t => t.classList.remove('active'));
    Tab.classList.add('active');
    myWelfareItem.forEach(item => item.classList.remove('active'));
    let targetId = this.dataset.target;
    let targetmyWelfare = document.getElementById(targetId);
    if (targetId) {
      targetmyWelfare.classList.add('active');
    }

  })
  //복지한눈에 반응형 탭
  let tabSelect = document.querySelector('.welfare-tab-select');
  let tabSelectTabs = document.querySelector('.welfare-tabs');
  let icon = document.querySelector('.fa-chevron-down')
  tabSelect.addEventListener('click', function () {
    tabSelectTabs.classList.add('active');
  })
  welfareTab.forEach(t => {
    t.addEventListener('click', function () {
      tabSelectTabs.classList.remove('active');
      tabSelect.textContent = t.textContent;

    })
  })
})
//일자리 슬라이드
var myJob = new Swiper(".myJob", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".job-pagination",
    clickable: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
  },
  navigation: {
    nextEl: ".job-arrow-right",
    prevEl: ".job-arrow-left",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});
//일자리 정규직 계약직 색바꾸기
let jobLeft = document.querySelectorAll('.job-top-left');
jobLeft.forEach(job => {
  if (job.innerText === '정규직') {
    job.style.color = '#E64F46';
  } else if (job.innerText === '계약직') {
    job.style.color = '#3A5DB6'; // 계약직일 경우 파란색 예시
  }
})
//일자리 탭전환
let jobTab = document.querySelectorAll('.job-tab');
let myJobItem = document.querySelectorAll('.myJob');
jobTab.forEach(function (Tab) {
  Tab.addEventListener('click', function () {
    jobTab.forEach(t => t.classList.remove('active'));
    Tab.classList.add('active');
    myJobItem.forEach(item => item.classList.remove('active'));
    let targetId = this.dataset.target;
    let targetmyJob = document.getElementById(targetId);
    if (targetId) {
      targetmyJob.classList.add('active');
    }

  })
})
//시도협의회 사이트mySite
var mySite = new Swiper(".mySite", {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    firstSlideMessage: '첫 번째 슬라이드입니다',
    lastSlideMessage: '마지막 슬라이드입니다',
    notificationClass: 'swiper-notification',
  },
  navigation: {
    nextEl: ".site-arrow-right",
    prevEl: ".site-arrow-left",
  }, breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }

});
let siteStop = document.querySelector('.site-stop');
let sitePlay = document.querySelector('.site-play');

siteStop.addEventListener('click', function () {
  mySite.autoplay.stop();
  siteStop.style.display = 'none';
  sitePlay.style.display = 'block';
});
sitePlay.addEventListener('click', function () {
  mySite.autoplay.start();
  siteStop.style.display = 'block';
  sitePlay.style.display = 'none';
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