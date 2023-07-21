/**
 * INK function javascript
 * 마크업 단계에서 최대한의 작업을 하기 위한 라이브러리
 * 요소의 속성을 추가 적용하여 연결 명칭을 정의하는 방식으로 사용할 것.
 * 빠른 프로토타입 작업과 소규모 프로젝트를 수행하기에 적합.
 * 사용예시 ------------------------------------------------
 * <button func-name="aa" onclick="f_class('on')"></button>
 * <div func-name="aa"></div>
 * 
 * @version 1.0.0
 * @author INK
 * @since 2022.08
 * @copyright INK
 * @license This is open source
 */

// 모든 세팅 한 곳에 모으는 것을 권장(데이터 송수신할 경우 초기화 필요)
function functions_setting(){
  function_setting();
  // first_setting();
}


window.addEventListener('DOMContentLoaded', function() {
  // 기능 설정
  function_setting();
});

// 기능 세팅(돔 로드 외 별도 세팅 시 사용)
function function_setting() {
  // 기본값
  i_setting();
  // 헤더 기능
  header_setting();
  // 모달/팝업 초기화
  i_modal();
  // 스크롤 애니메이션 초기화
  f_scroll_animation_setting();
  // 스탠드 애니메이션 초기화
  f_stand_animation_setting();
}

// header functions 헤더 기능
function header_setting() {
  const header_wrap = document.getElementById('header_wrap');
  const header_gnb_wrap = document.querySelector('.gnb_wrap');
  const header_lnb_wrap = document.querySelector('.lnb_wrap');
  const header_unb_wrap = document.querySelector('.unb_wrap');
  const header_gnb_li = document.querySelectorAll('.gnb_wrap > ul > li');
  const header_lnb_li = document.querySelectorAll('.lnb_wrap > ul > li');
  const header_unb_li = document.querySelectorAll('.unb_wrap > ul > li');

  // gnb over 하위 메뉴 보이기
  for (var i = 0; i < header_gnb_li.length; i++) {
    header_gnb_li[i].addEventListener('mouseover', () => open_wrap('lnb_wrap'));
    header_gnb_li[i].addEventListener('mouseleave', () => close_wrap('lnb_wrap'));
  }

  // 헤더 - 하위 메뉴 열기
  function open_wrap(className) {
    if (event.currentTarget.f_findClass(className)) {
      event.currentTarget.f_findClass(className).show();
    }
  }
  // 헤더 - 하위 메뉴 닫기
  function close_wrap(className) {
    if (event.currentTarget.f_findClass(className)) {
      event.currentTarget.f_findClass(className).hide();
    }
  }

}

// ink utill find = ink 속성이 사용되는 기능 인식 및 검색
function i_find(attr, val) {
  let find_elements = val ? document.querySelectorAll('[' + attr + ']') : document.querySelectorAll('[' + attr + ']', val);
  // i-name 속성을 가진 요소 목록(배열) 반환
  return find_elements;
}

// 요소의 자식 중, ID 및 Class 값이 일치하는 요소를 반환
Element.prototype.f_findClass = function(class_name) {
  const el_list = this.children;

  // 요소 찾기
  if (el_list.length > 0) {
    for (var i = 0; i < el_list.length; i++) {
      // 찾기 class
      let class_list = el_list[i].classList;

      for (var j = 0; j < class_list.length; j++) {
        if (class_list[j] === class_name) {
          return el_list[i]; // 반환
        }
      }
    }
  } else {
    return;
  }
}

// 기본 설정
/**
 * 기본 설정 함수, 선언하는 것으로 현 페이지 내 i-name 속성을 갖고 있는 모든 요소를 찾아 속성에 맞게 기능부여.
 * 주의 : 컴포넌트 생성 단계에서 호출해줘야 한다.
 */
function i_setting() {
  let find_elements = i_find('i-name');
  // 기능 인식 및 이벤트 이식
  for (var i = 0; i < find_elements.length; i++) {
    // 트리거 확인
    // let trigger = find_elements[i].checkEvent();

    // 바인딩 - 입력 값
    find_elements[i].setListener('i-value', f_bind); // 입력값 자동 갱신 value
    find_elements[i].setListener('i-bind', f_bind); // 입력값 이벤트 트리거에 의한 갱신 bind
    // 클래스 토글
    find_elements[i].setListener('i-class', f_class);
    find_elements[i].setListener('i-class-add', f_class_add);
    find_elements[i].setListener('i-class-remove', f_class_remove);
    // 컴포넌트 추가
    find_elements[i].setListener('i-component-add', f_component_add);
    // 컴포넌트 삭제
    find_elements[i].setListener('i-component-remove', f_component_remove);
    // 컴포넌트 삭제 (그룹 = 순차적)
    find_elements[i].setListener('i-component-remove-group', f_component_remove_group);
    // 컴포넌트 삭제 (그룹 = 순차적)
    find_elements[i].setListener('i-component-remove-all', f_component_remove_all);
    // 토글(보이고 감추기)
    find_elements[i].setListener('i-toggle', f_toggle);
    // 보이기
    find_elements[i].setListener('i-show', f_show);
    // 감추기
    find_elements[i].setListener('i-hide', f_hide);
  }

  // 기능 인식 및 이벤트 이식 - i-name 없이 가능

  // 드래그앤드롭 기능
  let find_elements_drag_drops = i_find('i-drag-drop');
  // 기능 적용
  for (var i = 0; i < find_elements_drag_drops.length; i++) {
    find_elements_drag_drops[i].setListener('i-drag-drop', f_drag_drop);
  }

  // 메뉴 데이터 기능
  let find_elements_menu_datas = i_find('i-menu-data');
  // 기능 적용
  for (var i = 0; i < find_elements_menu_datas.length; i++) {
    find_elements_menu_datas[i].setListener('i-menu-data', f_menu_data);
  }

  // 탭기능 인식 및 이벤트 이식 - i-name 없이 가능
  let find_elements_tabs = i_find('i-tab');
  let find_elements_tab_wraps = i_find('i-tab-wrap');
  // 탭 기능
  for (var i = 0; i < find_elements_tabs.length; i++) {
    find_elements_tabs[i].setListener('i-tab', f_tab);
  }
  // 탭 초기화
  for (var i = 0; i < find_elements_tab_wraps.length; i++) {
    if (i === 0) {
      find_elements_tab_wraps[i].show(); // 보이기
    } else {
      find_elements_tab_wraps[i].hide(); // 감추기
    }
  }

  // 서밋 인식 및 이벤트 이식 - i-name 없이 가능
  let find_elements_btn_submit = i_find('i-submit');
  // 서밋 기능
  for (var i = 0; i < find_elements_btn_submit.length; i++) {
    find_elements_btn_submit[i].setListener('i-submit', f_form_submit);
  }
}

// 서밋 지정
function f_form_submit() {
  const submit_form = i_find('i-form');
  const submit_match_name = this.getAttribute('i-submit');
  const submit_mode = this.getAttribute('i-submit-mode');

  //i-data-mode
  // 현재 활성화된 탭 확인 - CSS 활용을 위한 적용 클래스
  for (var i = 0; i < submit_form.length; i++) {
    let submit_form_match_name = submit_form[i].getAttribute('i-form');
    let mode_val = submit_form[i].querySelector('input[name="mode"]');

    // 서밋 모드 설정
    if (submit_mode) {
      mode_val.value = submit_mode;
    }
    if (submit_form_match_name === submit_match_name) {
      // 체크 박스 무조건 POST 넘기기
      checkbox_POST(submit_form[i]);
      // 서밋
      return submit_form[i].submit();
    } else {
      return console.error('Not found i-form');
    }
  }

}

// 탭기능 설정
function f_tab() {
  const tab_list = i_find('i-tab');
  const tab_wrap_list = i_find('i-tab-wrap');
  const tab_match_name = this.getAttribute('i-tab');

  // 현재 활성화된 탭 확인 - CSS 활용을 위한 적용 클래스
  for (var i = 0; i < tab_list.length; i++) {
    tab_list[i].classList.remove('current');
  }
  this.classList.add('current');

  // 탭 매치에 따라 보이기
  for (var i = 0; i < tab_wrap_list.length; i++) {
    let tab_wrap_match_name = tab_wrap_list[i].getAttribute('i-tab-wrap');

    if (tab_wrap_match_name === tab_match_name) {
      tab_wrap_list[i].show(); // 보이기
      tab_wrap_list[i].classList.add('current');
    } else {
      tab_wrap_list[i].hide(); // 감추기
      tab_wrap_list[i].classList.remove('current');
    }
  }
}

// 모달/팝업 설정
function i_modal() {
  const modal_list = i_find('i-modal');

  for (var i = 0; i < modal_list.length; i++) {
    let modal_wrap = modal_list[i];
    let modal = modal_list[i].f_findClass('modal');
    let modal_close_btn = modal.f_findClass('title_wrap').f_findClass('modal_close');
    let modal_day_close_check = modal.f_findClass('close_wrap');

    // 팝업 쿠키 확인
    if (getCookie(modal_wrap.getAttribute('i-cookie')) != 'Y') {
      modal_wrap.classList.add('on');
    }
    let sfd = 123;
    // 모달창(팝업)
    modal_close_btn.addEventListener('click', function() {
      // 모달 닫기
      modal_wrap.classList.remove('on');
    });
    // 오늘 하루 열지 않음
    modal_day_close_check.addEventListener('click', function() {
      // 모달 닫기
      modal_wrap.classList.remove('on');
      setCookie(modal_wrap.getAttribute('i-cookie'), 'Y', 1);
    });
  }
};

// 24시간 기준 쿠키 설정하기
function setCookie(name, value, expiredays) {
  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';';
}

// 쿠키 가져오기
function getCookie(name) {
  var nameOfCookie = name + '=';
  var x = 0;
  while (x <= document.cookie.length) {
    var y = x + nameOfCookie.length;
    if (document.cookie.substring(x, y) == nameOfCookie) {
      if ((endOfCookie = document.cookie.indexOf(';', y)) == -1) endOfCookie = document.cookie.length;
      return unescape(document.cookie.substring(y, endOfCookie));
    }
    x = document.cookie.indexOf(' ', x) + 1;
    if (x == 0) break;
  }
  return '';
}

// 이용여부 확인
function check_used(e) {
  const wrap = document.getElementById('use_wrap');

  if (e.checked) {
    wrap.classList.add('on');
  } else {
    wrap.classList.remove('on');
  }
}

// 요소의 기능 확인 및 활성화
Element.prototype.setListener = function(func_attr, functions) {
  if (this.hasAttribute(func_attr)) {
    // 페이지 불러오기
    if (func_attr === 'i-page') {
      return this.addEventListener('click', f_page);
    }
    // let input_val = this.getAttribute(func_attr);
    // 입력값 실시간 출력
    if (func_attr === 'i-value') {
      this.addEventListener('keydown', f_bind);
      this.addEventListener('keyup', f_bind);
      return;
    }

    // input 타입 구분
    const func_input_types = ['radio', 'checkbox', 'select'];

    // input type에 의한 구분
    if (func_input_types.includes(this.getAttribute('type'))) {
      return this.addEventListener(this.checkEvent(), function() {
        // 체크 상태인지 확인 후 함수 실행
        if (this.checked) {
          functions();
        }
      });
    }

    // 드래그앤드롭 구분
    if (func_attr === 'i-drag-drop') {
      this.addEventListener('dragstart', functions);
      this.addEventListener('dragstart', function() {
          this.classList.add('dragging');
      });
      this.addEventListener('dragend', function() {
          this.classList.remove('dragging');
      });
      return;
    }
    // 메뉴 데이터 구분

    if (func_attr === 'i-menu-data') {
      return this.addEventListener('click', functions);
    }

    // 탭 구분
    if (func_attr === 'i-tab') {
      return this.addEventListener('click', functions);
    }
    // 서밋 구분
    if (func_attr === 'i-submit') {
      return this.addEventListener('click', functions);
    }

    // 기본 값
    return this.addEventListener(this.checkEvent(), functions);
  }
}

// 요소의 이벤트 트리거 확인 및 구분
Element.prototype.checkEvent = function() {
  // 이벤트 트리거 목록 = 비교 목록
  const func_event_list = [
    // 마우스
    'click', 'dbclick', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'mousemove', 'contextmenu', 'auxclick', 'wheel', 'mouseleave', 'mouseout', 'select', 'pointerlockchange', 'pointerlockerror',
    // 드래그 앤 드랍
    'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
    // 터치
    'touch', 'touchstart', 'touchmove', 'touchend',
    // 키보드
    'keydown', 'keyup', 'keypress',
    // 폼
    'focus', 'blur', 'change', 'submit', 'reset',
    // 로드 및 리소스, 기타
    'load', 'loadEnd', 'abort', 'beforeunload', 'unload', 'cached',

    // 웹소켓
    'open', 'message', 'error', 'close',
    // 세션 기록
    'pagehide', 'pageshow', 'popstate',
    // 네트워크
    'online', 'offline',

    // CSS 애니메이션
    'animationstart', 'animationend', 'anumationteration',
    // CSS 전이
    'transtionstart', 'transitioncancel', 'transitionend', 'transitionrun',

    // 프린트
    'beforeprint', 'afterprint',
    // 텍스트
    'compositionstart', 'compositionupdate', 'compositionend',

    // 뷰
    'fullscreenchange', 'fullscreenerror', 'resize', 'scroll',

    // 클립보드
    'cut', 'copy', 'paste',

    // 미디어
    'durationchange', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'ended', 'emptied', 'stalled', 'suspend', 'play', 'playing', 'pause', 'seeking', 'seeked', 'ratechange', 'timeupdate', 'volumechange', 'complete', 'audioprocess',
  ];

  for (var i = 0; i < func_event_list.length; i++) {
    // 이벤트 속성 여부 확인
    if (this.hasAttribute('@' + func_event_list[i])) {
      // 트리거 반환
      return func_event_list[i];
    }
  }
  return;
}

// 요소의 스크롤 애니메이션 확인
Element.prototype.setScrollAni = function(posY) {
  this.addEventListener('animationstart', function() {
    this.classList.add('interactive');
  });
  this.addEventListener('animationend', function() {
    this.classList.remove('interactive');
  });

  // 애니메이션 작동 인식
  if (!this.classList.contains('interactive')) {
    if (this.hasAttribute('i-scroll-ani')) {
      if (posY < window.innerHeight * 0.99 && !this.classList.add('interactive')) {
        return this.classList.add(this.getAttribute('i-scroll-ani'));
      } else {
        return this.classList.remove(this.getAttribute('i-scroll-ani'));
      }
    } else {
      return console.error('Not found attribute as i-scroll-ani');
    }
  }
  return;
}

// 스크롤 애니메이션 적용
function f_scroll_animation() {
  let find_elements_show_ani = i_find('i-scroll-ani');

  for (var i = 0; i < find_elements_show_ani.length; i++) {
    find_elements_show_ani[i].style.opacity = '0';
    find_elements_show_ani[i].setScrollAni(find_elements_show_ani[i].getBoundingClientRect().top);
  }
  // for (const e of find_elements_show_ani) {
  //   e.style.opacity = '0';
  //   e.setScrollAni(e.getBoundingClientRect().top);
  // }
  return;
}

// 스크롤 애니메이션 준비(초기화)
function f_scroll_animation_setting() {
  let find_elements_show_ani = i_find('i-scroll-ani');
  let find_elements_show_ani_wrap = i_find('i-scroll-wrap');

  // 요소 초기화
  for (var i = 0; i < find_elements_show_ani.length; i++) {
    find_elements_show_ani[i].style.opacity = '0';
  }

  // 스크롤 이벤트 적용
  if (find_elements_show_ani_wrap.length != 0) {
    for (var i = 0; i < find_elements_show_ani_wrap.length; i++) {
      // 로드
      find_elements_show_ani_wrap[i].addEventListener('load', function() {
        // let maxScrollValue = document.body.offsetHeight - window.innerHeight;
        f_scroll_animation();
      });
      // 스크롤
      find_elements_show_ani_wrap[i].addEventListener('scroll', function() {
        // let maxScrollValue = document.body.offsetHeight - window.innerHeight;
        f_scroll_animation();
      });
    }
  } else {
    // 로드
    window.addEventListener('load', function() {
      // let maxScrollValue = document.body.offsetHeight - window.innerHeight;
      f_scroll_animation();
    });
    // 스크롤
    window.addEventListener('scroll', function() {
      // let maxScrollValue = document.body.offsetHeight - window.innerHeight;
      f_scroll_animation();
    });
  }
}

// 요소의 스탠드 애니메이션 확인
Element.prototype.setStandAni = function() {
  if (this.hasAttribute('i-stand-ani')) {
    this.classList.add(this.getAttribute('i-stand-ani'));
  } else {
    console.error('Not found i-stand-ani');
  }
  return;
}

// 스탠드 애니메이션 적용
function f_stand_animation_setting() {
  let find_elements_show_ani = i_find('i-stand-ani');

  for (var i = 0; i < find_elements_show_ani.length; i++) {
    find_elements_show_ani[i].setStandAni();
  }
  return;
}

// A 에서 B를 찾기 (반환)
function findToObject(find_array, find, return_switch) {
  for (var i = 0; i < find_array.length; i++) {
    if (find_array[i] == find) {
      // 반환 스위치에 따라 값을 반환
      if (return_switch) {
        return find_array[i];
      } else {
        return true;
      }
    }
  }
  return false;
}

// 보이기
Element.prototype.show = function() {
  this.style.display = 'block';
  return;
}

// 감추기
Element.prototype.hide = function() {
  this.style.display = 'none';
  return;
}

// 보이고 감추기
function f_toggle() {
  let i_function = new ink_js();
  for (var i = 0; i < i_function.list.length; i++) {
    if (i_function.checkSwitch(i_function.list[i], 'toggle')) {
      if (this.getAttribute('i-toggle')) {
        i_function.list[i].classList.add(this.getAttribute('i-toggle'));
      }
      i_function.list[i].hide();
    } else {
      if (this.getAttribute('i-toggle')) {
        i_function.list[i].classList.remove(this.getAttribute('i-toggle'));
      }
      i_function.list[i].show();
    }
  }
  return;
}

// 보이기
function f_show() {
  let i_function = new ink_js();

  for (var i = 0; i < i_function.list.length; i++) {
    i_function.list[i].show();
  }
  return;
}

// 감추기
function f_hide() {
  let i_function = new ink_js();

  for (var i = 0; i < i_function.list.length; i++) {
    i_function.list[i].hide();
  }
  return;
}

// 해당 요소에 특정 문자열로 시작하는 속성 값 찾고 클래스와 함께 삭제
Element.prototype.classClear = function(func_attr_first_name) {
  let target_attr_list = this.attributes;

  for (var i = 0; i < target_attr_list.length; i++) {
    // 해당 기능으로 추가된 클래스 스위치 여부 확인
    if (target_attr_list[i].name.startsWith(func_attr_first_name)) {
      let remove_name = target_attr_list[i].name;

      // 스위치 삭제 (끄기)
      this.removeAttribute(remove_name);

      // 접두사 접미사 삭제 (클래스값 추출)
      remove_name = remove_name.replace(func_attr_first_name, '');
      remove_name = remove_name.replace('-switch', '');

      // 스위치에 의한 클래스 삭제
      // return this.classList.remove(findToObject(this.classList, remove_name));
      return this.classList.remove(remove_name);
    }
  }
}

// 수동 스위치 켜기
function manualSwitch(func_element, func_type, func_string) {
  func_element ? func_element : this.element;
  // 기능에 따라 스위치(속성) 명
  let _switch = 'i-' + func_element.functionName + '-switch';

  // 스위치명 변경
  _switch = 'i-' + func_type + '-' + func_string + '-switch';
  // 스위치 여부 반환
  return func_element.hasAttribute(_switch);
}

// 클래스 토글
function f_class() {
  let i_function = new ink_js();
  let e_target = i_function.target;

  // 클래스 클리어(해당 기능으로 적용된 모든 클래스 삭제)
  if (e_target) {
    e_target.classClear('i-class-');
    // 클리어
    manualSwitch(e_target, 'class', i_function.className);
  }

  for (var i = 0; i < i_function.list.length; i++) {
    if (i_function.checkSwitch(i_function.list[i], 'class', i_function.className) || e_target) {
      // 클래스 토글
      if (e_target) {
        e_target.classList.add(i_function.className);
      } else {
        i_function.list[i].classList.add(i_function.className);
      }
    } else {
      // 클래스 토글
      if (e_target) {
        e_target.classList.remove(i_function.className);
      } else {
        i_function.list[i].classList.remove(i_function.className);
      }
    }
  }

}

// 클래스 생성
function f_class_add() {
  let i_function = new ink_js();
  let e_target = i_function.target;

  for (var i = 0; i < i_function.list.length; i++) {
    i_function.list[i].classList.add(this.getAttribute('i-class-add'));
  }
  return;
}
// 클래스 삭제
function f_class_remove() {
  let i_function = new ink_js();
  let e_target = i_function.target;

  for (var i = 0; i < i_function.list.length; i++) {
    i_function.list[i].classList.remove(this.getAttribute('i-class-remove'));
  }
  return;
}

// 바인딩 입력값 표현
function f_bind() {
  let i_function = new ink_js();
  for (var i = 0; i < i_function.list.length; i++) {

    // bind 입출력 (= i-value)
    if (i_function.bindValue || !i_function.bindValue == '') {
      i_function.list[i].innerText = i_function.bindValue;
    } else {
      i_function.list[i].innerText = i_function.element.value;
    }
    // binder 입출력
    if (i_function.binderValue || !i_function.binderValue == '') {
      i_function.list[i].innerText = i_function.binderValue;
    } else {
      i_function.list[i].innerText = i_function.element.value;
    }
  }
}

// 컴포넌트 생성
function f_component_add() {
  let i_function = new ink_js();
  i_function.addComponent();
  i_setting();
}

// 컴포넌트 삭제 (그룹)
function f_component_remove_group() {
  let i_function = new ink_js();
  i_function.removeComponentGroup();
}

// 컴포넌트 삭제 (그룹)
function f_component_remove_all() {
  let i_function = new ink_js();
  i_function.removeComponentAll();
}

// 컴포넌트 삭제 (단일)
function f_component_remove() {
  let i_function = new ink_js();
  i_function.removeComponent();
}

// 해당 요소의 클래스 탐색 - 클래스 값 반환
Element.prototype.findClass = function(find_class_name) {
  if (!find_class_name) {
    console.error('Please input parameter');
  }
  for (var i = 0; i < this.classList.length; i++) {
    if (this.classList[i].startsWith(find_class_name)) {
      return this.classList[i];
    }
  }
}

// 해당 요소의 클래스 탐색 - 요소 반환
Element.prototype.findClassElement = function(find_class_name) {
  if (!find_class_name) {
    console.error('Please input parameter');
  }
  for (var i = 0; i < this.classList.length; i++) {
    if (this.classList[i].startsWith(find_class_name)) {
      return this;
    }
  }
}

// 해당 요소의 태그 일치 여부
Element.prototype.checkTagElement = function(check_tag_name) {
  if (!check_tag_name) {
    console.error('Please input parameter');
  }
  if (this.tagName == check_tag_name) {
    return true;
  } else {
    return false;
  }
}

// 0채워 넣기
Number.prototype.fillZero = function(width) {
  let n = String(this); //문자열 변환
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n; //남는 길이만큼 0으로 채움
}
String.prototype.fillZero = function(width) {
  return this.length >= width ? this : new Array(width - this.length + 1).join('0') + this; //남는 길이만큼 0으로 채움
}

/* CheckBox를 Hidden으로 바꿔주는 함수
 *    f : 폼이름
 *    ele : checkbox 이름
 */
function checkbox_POST(f) {
  var ele_h;
  var val;
  var ele = document.querySelectorAll('input[type="checkbox"]');
  if (typeof(ele.length) != "undefined") { // checkbox가 배열일경우
    for (var i = 0; i < ele.length; i++) {
      // hidden객체생성, 이름은 checkbox와 같게한다.
      ele_h = document.createElement("input");
      ele_h.setAttribute("type", "hidden");
      ele_h.setAttribute("name", ele[i].name);
      ele[i].checked ? val = ele[i].value : val = "";
      ele_h.setAttribute("value", val);
      f.appendChild(ele_h);

      // 기존 checkbox의 이름을 이름_dummy로 변경한후 checked = false해준다.
      ele[i].checked = false;
      ele[i].setAttribute("name", ele[i].name + "_dummy");
    }
  } else { // checkbox가 한개
    ele_h = document.createElement("input");
    ele_h.setAttribute("type", "hidden");
    ele_h.setAttribute("name", ele.name);
    ele.checked ? val = ele.value : val = "";
    ele_h.setAttribute("value", val);
    f.appendChild(ele_h);

    ele.checked = false;
    ele.setAttribute("name", ele.name + "_dummy");
  }
}

// 드래그 앤 드롭 - 랩 - 데이터 저장
function f_drag_drop_wrap(wrap){
  // var d = wrap.getAttribute('i-drag-drop-wrap');
  const dragdrop_wrap_list = i_find('i-drag-drop-wrap');
  dragdrop_wrap_list.forEach((el) => {
    // 드롭한 뎁스
    if (el.hasAttribute('i-depth')) {
      el.getAttribute('i-depth');
      console.log(el);
    }
  });

  var depth = wrap.getAttribute('i-depth');
  var menu_update = wrap.getAttribute('i-menu-update');

  var params = {
    depth: depth
  };

  // ajax 통신
  $.ajax({
    type: "GET", // HTTP method type(GET, POST) 형식이다.
    url: "./"+menu_update+".php", // 컨트롤러에서 대기중인 URL 주소이다.
    data: params, // Json 형식의 데이터이다.
    dataType: 'html',
    success: function(result, data, status, xhr) {
      // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
      // 이 콜백 함수의 파라미터에서는 응답 바디, 응답 코드 그리고 XHR 헤더를 확인할 수 있습니다.
      // console.log(result);
      return false;
    }
  });
}

// 드래그 앤 드롭 - 리스트
function f_drag_drop(){
  const dragdrop_wrap_list = i_find('i-drag-drop-wrap');
  const dragdrop_box_list = i_find('i-drag-drop');
  // 드래그 앤 드롭 리스트 변화
  function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.drag_drop_list_box:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
        //해당 엘리먼트에 top값, height값 담겨져 있는 메소드를 호출해 box변수에 할당
        const box = child.getBoundingClientRect();
        //수직 좌표 - top값 - height값 / 2의 연산을 통해서 offset변수에 할당
        const offset = y - box.top - box.height / 2;
        // (예외 처리) 0 이하 와, 음의 무한대 사이에 조건
        if (offset < 0 && offset > closest.offset) {
          // Element를 리턴
          return { offset: offset, element: child }
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
  };
  // 드래그 앤 드롭 직접 기능
  dragdrop_wrap_list.forEach(function(container) {
    // 동적으로 생성하기 때문에 중복 방지
    if (!container.classList.contains('d_event')) {
      container.classList.add('d_event');
      // 드롭
      container.addEventListener('drop', function(e) {
        f_drag_drop_wrap(this);
      });
      // 드래그 오버
      container.addEventListener('dragover', function(e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        container.appendChild(draggable);
        container.insertBefore(draggable, afterElement);
      });
    }
  });
}

// 토스트 설정
let toast_transform = 'top';
let toast_index_array = [];

// 값을 입력하여 위치값 조정(left, top, right, bottom)
function i_toast_setting(string) {
  return toast_transform = string;
}

// 토스트 위치 설정(초기화)
i_toast_setting('right');

function i_toast(msg, type = 'msg', transform = toast_transform) {
  f_toast(msg, type, transform);
}

// 토스트 컴포넌트 출력
function f_toast(msg, type = 'msg', transform = toast_transform) {
  const toast_msg_box = document.createElement('div');
  const transform_top = '20px';
  let before_toast_height = 0;
  let toast_margin = 12;

  // 토스트 컴포넌트 생성
  toast_msg_box.classList.add('toast_msg_box');
  toast_msg_box.classList.add('appear');
  toast_msg_box.innerHTML += '<p class="toast_msg">' + msg + '</p>';

  // 토스트 타입 설정
  switch (type) {
    case 'success':
      toast_msg_box.classList.add('success');
      break;
    case 'error':
      toast_msg_box.classList.add('error');
      break;
    case 'info':
      toast_msg_box.classList.add('info');
      break;
    case 'warning':
      toast_msg_box.classList.add('warning');
      break;
    default:
      // 기본은 MSG 취급
  }

  // 위치 값 설정
  toast_msg_box.style.position = 'fixed';
  toast_msg_box.style.zIndex = '99999';

  // 측면 출력 위치 값 판단
  switch (transform) {
    case 'left': // 좌측
      toast_msg_box.style.left = '20px';
      toast_msg_box.style.top = transform_top;
      break;
    case 'right': // 우측
      toast_msg_box.style.right = '20px';
      toast_msg_box.style.top = transform_top;
      break;
    case 'top': // 상단
      toast_msg_box.style.left = '50%';
      toast_msg_box.style.top = transform_top;
      toast_msg_box.style.transform = 'translate(-50%,0)';
      break;
    case 'bottom': // 하단
      toast_msg_box.style.left = '50%';
      toast_msg_box.style.bottom = transform_top;
      toast_msg_box.style.transform = 'translate(-50%,0)';
      break;
    default:
      // 기본은 top
      toast_msg_box.style.left = '50%';
      toast_msg_box.style.top = transform_top;
      toast_msg_box.style.transform = 'translate(-50%,0)';
      break;
  }

  // 출력 한 토스트를 배열에 입력
  toast_index_array.push(toast_msg_box);

  if (toast_index_array.indexOf(toast_msg_box) > 0) {
    // 선행 출력된 토스트의 배열 인덱스 값
    let before_toast_index = toast_index_array.indexOf(toast_msg_box) - 1;
    // 선행 출력된 토스트 상단 좌표 값 = top
    let before_toast_top = toast_index_array[before_toast_index].style.top;
    let before_toast_top_n = Number(before_toast_top.substr(0, before_toast_top.length - 2));
    // 선행 출력된 토스트 높이 값
    before_toast_height = toast_index_array[before_toast_index].offsetHeight;
    // 출력될 토스트의 좌표 값 입력
    toast_msg_box.style.top = before_toast_top_n + before_toast_height + toast_margin + 'px';
  }

  // 일정 시간 후에 사라지는 애니메이션
  setTimeout(function() {
    toast_msg_box.classList.add('disappear');
  }, 4800);

  // 일정 시간 후에 삭제
  setTimeout(function() {
    // 입력된 배열의 토스트를 삭제
    toast_index_array.splice(toast_index_array.indexOf(toast_msg_box), 1);

    // 토스트 재정렬
    toast_re_sort(before_toast_height, toast_margin);

    // 토스트 삭제
    toast_msg_box.remove();
  }, 5000);

  // 생성(출력)
  return document.querySelector('body').appendChild(toast_msg_box);
}

// 토스트 재정렬
function toast_re_sort(del_toast_height, toast_margin) {
  let toast_list = document.querySelectorAll('.toast_msg_box');

  // 전체 토스트 재정렬(top)
  for (var i = 0; i < toast_list.length; i++) {
    let toast_top = toast_list[i].style.top;

    // 샘플/테스트 제외
    if (!toast_list[i].classList.contains('test')) {
      if (del_toast_height == 0) {
        // 두 번째 토스트 올리기(첫 번째는 컴포넌트 생성 전, 높이 값을 불러오지 못함)
        toast_list[i].style.top = Number(toast_top.substr(0, toast_top.length - 2)) - toast_list[i].offsetHeight + 'px';
      } else {
        // 올리기
        toast_list[i].style.top = Number(toast_top.substr(0, toast_top.length - 2)) - Number(del_toast_height) - toast_margin + 'px';
      }
    }
  }
}

