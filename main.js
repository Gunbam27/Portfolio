'use strict';
// 스크롤시 한 섹션씩 이동
window.onload = function(){
  const section = document.querySelectorAll('.section');
  const sectionCount = section.length;
  section.forEach(function(item, index){
    item.addEventListener('mousewheel', function(e){
      e.preventDefault();
      let delta = 0;
      
      if (e.wheelDelta) {
          delta = e.wheelDelta / 120;
      }
          
      
      let moveTop = window.scrollY;
      let sectionSelector = section[index];
      
      // wheel down : 다음 섹션으로 이동
      if (delta < 0){
        if (sectionSelector !== sectionCount-1){
          moveTop = window.pageYOffset + sectionSelector.nextElementSibling.getBoundingClientRect().top;
        }
      }
      
      // wheel up : 이전 섹션으로 이동
      else{
        if (sectionSelector !== 0){
            moveTop = window.pageYOffset + sectionSelector.previousElementSibling.getBoundingClientRect().top;
          }
      }
      window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
    });
  });
}

//스크롤시 네비게이션바 투명하게 만들기
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//네비게이션 클릭시 해당 섹션으로 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

//네비게이션바 햄버거버튼 클릭시 메뉴보이는 토글 버튼
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

//홈섹션의 See My Work 클릭시 Work섹션으로 이동
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#work');
});

//스크롤시 위로 버튼 보이기
const arrowUp = document.querySelector('.arrow-up');
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

//위로 버튼누르면 홈섹션으로 가기
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});
// 이동기능
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
