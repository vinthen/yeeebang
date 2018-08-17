// plugins
import Swiper from 'swiper';
import superagent from 'superagent';
import autosize from 'autosize';

const StarRating = require('star-rating.js');

// rating
import {
  ratingStarChart,
  showRating,  
  ratingSection,
  deleteReview
} from './rating';

// dialog
import {
  openModal,
  closeModal,
  loginModal,
  reviewModal
} from './dialog';

// user
import {
  userControl
} from './user';

// helper
// import {getParents} from './helper';


// Token
const csrfToken = document.head.querySelector("[name=csrf-token]").content;

/* ---------- swiper image gallery ---------- */
let gallery = new Swiper(".swiper-container", {

  loop: true,
  autoHeight: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  pagination: {
    el: '.swiper-pagination',
  }

});

/* ---------- APP download button for mobile ---------- */
let trigger = document.getElementById("hamburger");
let menu = document.querySelector(".download");
let overlay = document.getElementById("downloadOverlay");

trigger.addEventListener("click",toggleDownloadMenu,false);

overlay.addEventListener("click",hideDownloadMenu,false);

document.querySelectorAll(".download--btn").forEach(function(element){
  element.addEventListener("click",hideDownloadMenu,false);
});

// toggle download menu
function toggleDownloadMenu(){

  if(menu.classList.contains("open")){
    menu.classList.remove("open");
    trigger.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    menu.classList.add("open");
    trigger.classList.add("active");
    overlay.classList.add("active");
  }
}

// hide download menu
function hideDownloadMenu(){
  trigger.classList.remove("active");
  menu.classList.remove("open");
  overlay.classList.remove("active");
}

/* ---------- rating ---------- */
{
  // basic info: rating
  showRating(
    screviews,
    userinfo,
    document.querySelector('.basic-info ul'),
    'li'
  );

  // rating and review section
  ratingSection(screviews,document.querySelector('.main--content .centerwpr'));
}

document.querySelector('.star-container').addEventListener('click',() => {

  document.getElementById('reviewSection').scrollIntoView({ 
    behavior: 'smooth' 
  });

});

/* ---------- login ---------- */
loginModal(
  document.querySelector('.outerWpr'),
  logingroup
);

/* ---------- user rating and review  ---------- */
reviewModal(
  document.querySelector('.outerWpr'),
  campName,
  superagent,
  autosize,
  StarRating,
  csrfToken,
  screviews.myreview
);

// 開啟
document.querySelector('#ratingTrigger').addEventListener('click', (event) => {
  
  if(!userinfo){
    // 開啟 Login Modal
    openModal(document.getElementById('loginModal'));
  } else {
    // 開啟 Rating and review Modal
    openModal(document.getElementById('reviewModal'));
    // update textarea autosize
    autosize.update(document.getElementById('reviewModalInput'));
  }  
  
});

/* ---------- user ---------- */
userControl(
  document.querySelector('.download'),
  userinfo,
  logingroup
);

document.querySelector('#ucLoginbtn').addEventListener('click', () => {
  // 開啟 Login Modal  
  openModal(document.getElementById('loginModal'));
  
});

// 刪除評分與評論
document.querySelector('.reviewEntry--delete').addEventListener('click',(event) => {
  deleteReview(
    event,
    csrfToken,
    superagent
  );
});

// 編輯評論
document.querySelector('.reviewEntry--edit').addEventListener('click',(event) => {
  openModal(document.getElementById('reviewModal'));
  autosize.update(document.getElementById('reviewModalInput'));
});



// 刪除評論
/*
superagent
  .post('/summercamp/screview')                
  .set('X-CSRF-TOKEN', csrfToken)
  .send({
      sc_id: screviews['sc_id'],
      crud: 'd',
      screview_id: '14',
  })
  .then(res => {
      console.log(JSON.parse(res.text));
  })
  .catch(err => {
      console.log(err);                    
  });
  */