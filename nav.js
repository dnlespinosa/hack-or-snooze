"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

function submitClick(evt){
  console.debug('submitClick', evt);
  hidePageComponents();
  $submitForm.show();
}

$navSubmit.on('click', submitClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function submitBtn(evt){
  console.debug('submitBtn', evt);
  evt.preventDefault();
  submitStory();
}

$submitBtn.on('click', submitBtn);

function selectFavorites(evt) {
  console.debug('selectFavorites', evt)
  let li = document.querySelectorAll('li');
  for(let item of li){
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList = 'checkbox';
    item.appendChild(checkbox);
  }
  const ol = document.getElementById('all-stories-list');
  let btn = document.createElement('button');
  btn.innerText = 'Submit Favorites';
  ol.append(btn);
  btn.addEventListener('click', saveFavorites);
  btn.addEventListener('click', localStoreFavorite);
  btn.addEventListener('click', () => {
    for (let item of li) {
      item.removeChild(item.lastElementChild);
    }
  })
}



$favorites.on('click', selectFavorites);


function saveFavorites(evt){
  console.debug('saveFavorites', evt);
  let li = document.querySelectorAll('li');
  for (let item of li){
    if (item.lastElementChild.checked) {
      $favoriteList.append(item);
      item.lastElementChild.remove();
    }
  }
  if (document.querySelector('h4').innerText !== 'Favorited Stories'){
  let h4 = document.createElement('h4');
  h4.innerText = 'Favorited Stories';
  let removeFav = document.createElement('a');
  removeFav.classList = 'nav-link';
  removeFav.innerText = 'Remove Favorite'
  h4.appendChild(removeFav);
  $favoriteList.prepend(h4);
  
  removeFav.addEventListener('click', () => {
    let lis = document.getElementById('favorited-stories').children;
    for (let i=1; i<lis.length; i++) {
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList = 'checkbox';
      lis[i].appendChild(checkbox);
    }
    const ol = document.getElementById('favorited-stories');
    let btn = document.createElement('button');
    btn.innerText = '          I dont like it anymore. UNFAVORITE';
    ol.append(btn);
    btn.addEventListener('click', localStorageFavRemove);
    btn.addEventListener('click', () => {
      for (let item of lis) {
        if (item.lastElementChild.checked) {
          item.remove();
        } 
      }
      if (ol.children.length <=2){
        ol.remove();
      }
    })
  })
  }
}

function localStoreFavorite() {
  console.debug("localStoreFavorite");
  let arr = document.getElementById('favorited-stories').children
  for (let i=1; i<arr.length; i++){
    localStorage.setItem(`favoriteList${i}`, arr[i].id);
  } 
}

function localStorageFavRemove() {
  console.debug('localStroageFavRemove');
  let arr = document.getElementById('favorited-stories').children;
  for (let i=1; i<arr.length; i++) {
     if (arr[i].lastElementChild.checked){
       localStorage.removeItem(`favoriteList${i}`);
     } 
  }
}


async function checkForFavStories() {
  console.debug('checkForFavStories');
  let arr = [];
  for (let i=0; i<localStorage.length; i++){
    if (localStorage.getItem(`favoriteList${i}`)){
      arr.push(localStorage.getItem(`favoriteList${i}`));
    } 
  }
  if (arr.length>=1){
    let h4 = document.createElement('h4');
    h4.innerText = 'Favorited Stories';
    let removeFav = document.createElement('a');
    removeFav.classList = 'nav-link';
    removeFav.innerText = 'Remove Favorite'
    h4.appendChild(removeFav);
    $favoriteList.append(h4)

    removeFav.addEventListener('click', () => {
      let lis = document.getElementById('favorited-stories').children;
      for (let i=1; i<lis.length; i++) {
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList = 'checkbox';
        lis[i].appendChild(checkbox);
      }
      const ol = document.getElementById('favorited-stories');
      let btn = document.createElement('button');
      btn.innerText = '          I dont like it anymore. UNFAVORITE';
      ol.append(btn);
      btn.addEventListener('click', localStorageFavRemove);
      btn.addEventListener('click', () => {
        for (let item of lis) {
          if (item.lastElementChild.checked) {
            item.remove();
          } 
        }
        if (ol.children.length <=2){
          ol.remove();
        }
      })
      
    })


  }
  for (let i=0; i<arr.length; i++){
    let li = document.querySelectorAll('li');
    for (let y=0; y<li.length; y++){
      if (li[y].id===arr[i]) {
        $favoriteList.append(li[y]);
      }
    }
  }
}

function removeStory(evt) {
  console.debug('remvoeStory', evt)
  let li = document.querySelectorAll('li');
  for(let item of li){
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList = 'checkbox';
    item.appendChild(checkbox);
  }
  const ol = document.getElementById('all-stories-list');
  let btn = document.createElement('button');
  btn.innerText = 'Remove Story';
  ol.append(btn);
  btn.addEventListener('click', () => {
    for (let item of li){
      if (item.lastElementChild.checked) {
        item.remove();
      }
    }
  })
  btn.addEventListener('click', () => {
    for (let item of li) {
      item.removeChild(item.lastElementChild);
    }
  })
}

$removeStories.on('click', removeStory);