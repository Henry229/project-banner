const banner = document.getElementById('banner'); //배너 본체
const img = banner.getElementsByTagName('img'); // 스프라이트 이미지
const toggle = document.getElementById('toggle'); // 배너 토글 버튼
const sound_btn = document.getElementById('sound_btn'); // 사운드 토글 버튼

// 배너의 높이 값 변수
const banner_height = getComputedStyle(banner).height;
const cast = []; //풍선 객체

//풍선 객체 생성 함수
const set_ballon = (num) => {
  // 풍선의 속성 값을 랜덤으로 생성
  const x = Math.floor(Math.random() * (500 - 10) + 10),
        y = Math.floor(Math.random() * (400 - 120) + 120),
        size = Math.floor(Math.random() * (200 -100) + 100),
        angle = Math.floor(Math.random() * (360 - 0) + 0),
        speed = Math.random() * (2-0) + 0;
  // 풍선 객체
  cast[num] = {
    x:x,
    y:-y,
    size: size,
    angle: angle,
    speed: speed 
  }
}

//풍선 객체 초기화 함수
const ball_init = () => {
  for(let i = 0; i < img.length; i++){
    //풍선 객체들의 속성 초기화
    set_ballon(i);
    img[i].style.left = '-9999px'; //풍선의 x 좌표
    img[i].style.top = '-9999px'; //풍선의 y 좌표
  }
}

//풍선 에니메이션 함수
const animate_ballon = () => {
  for ( let i = 0; i < img.length; i++ ) {
    //풍선 속성 변경
    img[i].style.left = cast[i].x + 'px'; //x좌표
    img[i].style.top = cast[i].y + 'px'; //y좌표
    img[i].style.transform = 'rotate(' + cast[i].angle +'deg)'; //회전

    //풍선이 화면 안에 있으면
    if (cast[i].y < parseInt(banner_height)) {
      cast[i].y += 1 + cast[i].speed;
      cast[i].angle += cast[i].spped;
    } else { // 풍선이 밑으로 나가면 
      set_ballon(i);
    }
  }
}

const bgm_init = () => {
  const bgm = new Audio(); // 오디오 갳게 생성  
  bgm.src = 'images/bgm.mp3';
  bgm.loop = true;
  document.body.appendChild(bgm); //문서에 오디오 객체 추가
}

//main 
ball_init();
setInterval(function(){animate_ballon();},1000/30);
bgm_init();


//사운드 버튼 이벤트 핸들러
sound_btn.onclick = function(event) {
  const attr = sound_btn.getAttribute('class'); //사운드 버튼의 class 속성
  const bgm = document.getElementsByTagName('audio'); //오디오 객체

  if ( attr == 'active') {
    //사운드 off
    sound_btn.removeAttribute('class');
    sound_btn.setAttribute('src', 'images/sound_off.png'); //버튼 이미지 교체
    bgm[0].pause();
  } else {
    //사운드 on
    sound_btn.setAttribute('class', 'active');
    sound_btn.setAttribute('src', 'images/sound_on.png');
    bgm[0].play();
  }
  event.stopPropagation();
}

//배너 열기/닫기 버튼 이벤트 헨들러
toggle.onclick = function() {
  const attr = banner.getAttribute('class');

  if(attr == 'active') {
    //배너 닫기
    banner.removeAttribute('class');
    toggle.innerHTML = 'Open Banner';
    return false;
  } else {
    //배너 열기
    banner.setAttribute('class', 'active');
    toggle.innerHTML = 'Close Banner';
    return false;
  }
}

//배너 링크 처리
banner.onclick = function() {
  window.open('https://csslick.github.io/','_blank');
}