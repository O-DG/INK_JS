// import ink_function from './ink_function.js';

//
// INK Utill javascript
//
// 마크업 단계에서 작업을 최소화하기 위한 라이브러리
// 요소의 속성으로 추가 적용하여 연결 명칭으로 정의하는 방식
//
// 생성자 함수로 선언 및 호출하여 사용할 수 있습니다.
// 구조 ---------------------------------------------
// 마크업(HTML) 단계에서 사용자정의 속성(i-명칭)을 추가 삽입하여 javascript를 인식,
// 추가 삽입된 속성에 의해 요소를 인식하여 조정(control)할 수 있습니다.
//
// 사용예시 ----------------------------------
// let i_function = new ink_js();
// console.log(i_function.element);
//
//


function ink_js(ink_element) {
  // input type 별 구분
  const func_input_types = ['radio', 'checkbox', 'select'];
  // this.name = ink_name;
  // this.element = event.currentTarget;

  // 사용자에 의한 정의 여부에 따라 제외 요소를 정의
  if (!ink_element) {
    this.element = event.currentTarget;
  } else {
    this.element = ink_element;
  }

  const element = this.element;
  // 사용자정의 명칭
  // => i-name의 값
  this.functionName = getFunctionName(this.element);
  const functionName = this.functionName;
  // 지정요소
  this.target = getTargetElement(this.element);
  const target = this.target;
  // 인식된 요소 목록
  // => i-name="명칭"
  // i-name 값이 동일한 요소 모두 선택 = 기능적 요소로 판단
  this.elementList = getElementList(this.functionName);
  const elementList = this.elementList;
  // 인식된 요소에서 이벤트가 발생한 요소를 제외한 요소 목록
  this.list = getTargetDivision(this.element, this.elementList, this.functionName);
  const list = this.list;
  // 인식된 입출력 연결관계 요소
  this.binder = getBinder(this.elementList);
  const binder = this.binder;
  // 인식된 binder의 입력 값
  this.binderValue = getBindData(this.binder);
  const binderValue = this.binderValue;
  // 인식된 입력 값
  // => i-value 존재여부에 따라 인식
  // this.bind = !getBind(this.elementList) && null;
  this.bind = getBind(this.elementList);
  const bind = this.bind;
  // 인식된 입력 값
  // => i-value 에 입력된 값
  // this.bindValue = !getValue(this.elementList) && null;
  // console.log(getValue(this.elementList));
  this.bindValue = getValue(this.elementList);
  const bindValue = this.bindValue;
  // 인식된 클래스 값
  // => i-class 에 입력된 값
  this.className = getClassName(this.element);
  const className = this.className;
  // 템플릿(컴포넌트)
  this.template = getTemplate();
  const template = this.template;
  // 인식된 컴포넌트
  // => i-name가 동일한 요소의 i-component-wrap 존재여부
  this.component = getComponent(this.functionName);
  const component = this.component;
  // 인식된 요소를 추가할 곳
  this.appendList = getAppend(this.elementList);
  const appendList = this.appendList;
  // 인식된 요소를 추가할 곳 - 이벤트 요소 제외
  this.append = getAppend(this.list);
  const append = this.append;

  // @const연결 명칭 - 명칭으로 찾아 연결하여 구동
  function getFunctionName(func_element){
    return func_element.getAttribute('i-name');
  }

  // @연결 목록
  function getElementList(func_name){
    let func_list = document.querySelectorAll('[i-name]');
    let func_list_name = [];
    let func_list_return = [];

    // return document.querySelectorAll('[i-name="' + func_name + '"]');

    for (var i = 0; i < func_list.length; i++) {
      // 중복 네이밍 확인 및 구분 (css 클래스 선택자와 유사)
      func_list_name = func_list[i].getAttribute('i-name').split(' ');

      if (func_list_name.length > 1) {
        for (var j = 0; j < func_list_name.length; j++) {
          if (func_name == func_list_name[j]) {
            func_list_return.push(func_list[i]);
          }
        }
      }else {
        if (func_name == func_list_name) {
          func_list_return.push(func_list[i]);
        }
        continue;
      }
      if (func_name == func_list_name) {
        func_list_return.push(func_list[i]);
      }
    }
    return func_list_return;
    // return document.querySelectorAll('[i-name="' + func_name + '"]');
  }

  // 지정 요소 선택
  function getTargetElement(func_element){
    return document.getElementById(func_element.getAttribute('i-target'));
  }


  // @입력값 받아오기 (선택적 입출력 요소)
  function getBindData(func_bind_name){
    for (var i = 0; i < list.length; i++) {
      if (list[i].hasAttribute('name') && list[i].getAttribute('name') == func_bind_name) {
        return list[i].value;
      }
    }
  }
  // @입력 값
  function getBinder(func_element_List){
    for (var i = 0; i < func_element_List.length; i++) {
      // input type 구분
      if (func_input_types.includes(func_element_List[i].getAttribute('type'))) {
        // checked 여부 확인
        if (func_element_List[i].checked || func_element_List[i].selected) {
          return func_element_List[i].getAttribute('i-binder');
        }
        // 기본 반환
        if (func_element_List[i].hasAttribute('i-binder') && !func_element_List[i].getAttribute('i-binder')) {
          return func_element_List[i].getAttribute('i-binder');
        }
      }
    }
  }

  // @입력 값
  function getBind(func_element_List){
    for (var i = 0; i < func_element_List.length; i++) {
      if (func_element_List[i].hasAttribute('i-value')) {
        return func_element_List[i].value;
      }
    }
  }
  // @입력 값
  function getValue(func_element_List){
    for (var i = 0; i < func_element_List.length; i++) {
      if (func_element_List[i].hasAttribute('i-value')) {
        // 입력값 반환
        return func_element_List[i].getAttribute('i-value');
      }
    }
  }

  // @입력한 클래스 값
  function getClassName(func_element){
    if (func_element.hasAttribute('i-class')) {
      // 입력값 반환
      return func_element.getAttribute('i-class');
    }
  }

  // @스위치 구분 (이벤트 발생한 요소 제외하기)
  function getTargetDivision(func_target_element, func_element_list, func_name){
    let _connect_list = [];
    for (var i = 0; i < func_element_list.length; i++) {
      if (func_element_list[i] != func_target_element) {
        _connect_list.push(func_element_list[i]);
      }
    }
    // 목록 반환
    return _connect_list;
  }

  // @템플릿 태그 가져오기
  function getTemplate(){
    return document.getElementsByTagName("template");
  }

  // @컴포넌트 가져오기 (내부)
  function getComponent(func_name){
    let func_template_list = template;

    for (var i = 0; i < func_template_list.length; i++) {
      if (func_template_list[i].getAttribute('i-name') == func_name && func_template_list[i].hasAttribute('i-component-wrap')) {
        return func_template_list[i];
      }
    }
  }


  // @요소를 추가할 곳
  function getAppend(func_element_list){
    for (var i = 0; i < func_element_list.length; i++) {
      if (func_element_list[i].hasAttribute('i-append')) {
        return func_element_list[i];
      }
    }
  }


  // @컴포넌트 wrap 확인
  function checkComponentWrap(func_append){
    for (var i = 0; i < func_append.children.length; i++) {
      let if_component_1 = func_append.children[i].hasAttribute('i-component');
      let if_component_2 = func_append.children[i].hasAttribute('i-component-repeat');

      // 확인 반환
      if (if_component_1 || if_component_2) {
        return true;
      }else {
        return false;
      }
    }
  }


  // @컴포넌트 가져오기 (내부)
  function getComponentClone(func_element_list, func_name){
    getComponent(func_name);

    for (var i = 0; i < func_element_list.length; i++) {
      // 컴포넌트 wrap 확인
      if (checkComponentWrap(getAppend(this.list))) {
        if (func_element_list[i].getAttribute('i-name') == func_name) {
          return func_element_list[i];
        }
      }
    }
  }

  // @기능 사용에 대한 스위치 조정 - 외부호출 가능
  ink_js.prototype.checkSwitch = function(func_element, func_type, func_string) {
    func_element ? func_element : this.element;
    // 기능에 따라 스위치(속성) 명
    let _switch = 'i-' + this.functionName + '-switch';

    // 타입별 반환
    if (func_type) {
      // 스위치명 변경
      _switch = 'i-' + func_type + '-' + func_string + '-switch';
      // 스위치 여부 반환
      if (func_element.hasAttribute(_switch)) {
        func_element.removeAttribute(_switch);
        return false;
      }else {
        func_element.setAttribute(_switch, '');
        return true;
      }
    }else {
      // 스위치 여부 반환
      return true;
    }
  }

  // @컴포넌트 생성
  ink_js.prototype.createComponent = function(template){
    let func_component_wrap = getComponent(this.functionName);
    let func_append = this.appendList;

    // 생성
    func_append.innerHTML += template;
  }

  // @컴포넌트 불러오기 (외부)
  ink_js.prototype.getComponent = function(){
    return getComponent(this.functionName);
  }

  // @컴포넌트 삭제 (그룹)
  ink_js.prototype.removeComponentGroup = function(){
    let func_append = this.appendList;
    let func_list_length = func_append.children.length;

    for (var i = 0; i < func_list_length; i++) {
      // 마지막부터 삭제
      if (i == func_append.children.length -1) {
        // 컴포넌트 wrap 확인
        if (func_append.children[i] && checkComponentWrap(func_append)) {
          return func_append.children[i].remove();
        }
      }
    }
  }

  // @컴포넌트 해당 그룹 전체 삭제
  ink_js.prototype.removeComponentAll = function(){
    let func_append = this.appendList;
    let func_list_length = func_append.children.length;

    // 컴포넌트 wrap 확인
    if (checkComponentWrap(func_append)) {
      for (var i = 0; i < func_list_length; i++) {
        // 삭제되면 목록의 배열이 재구성되므로 0번째 요소를 반복적 입력 및 삭제한다.
        func_append.children[0].remove();
      }
    }
    return;
  }

  // @컴포넌트 삭제 (단일)
  ink_js.prototype.removeComponent = function(){
    let func_append = this.appendList;
    let func_list_length = func_append.children.length;

    for (var i = 0; i < func_list_length; i++) {
      // 컴포넌트 wrap 확인
      if (checkComponentWrap(func_append)) {
        let check_list = func_append.children[i].querySelectorAll('button');

        // 이벤트가 발생한 컴포넌트인지 확인
        for (var j = 0; j < check_list.length; j++) {
          if (check_list[j].hasAttribute('i-component-remove') && check_list[j] == this.element) {
            return func_append.children[i].remove();
          }
        }
      }
    }
  }

  // @컴포넌트 폼입력 재조정(복사에 의함)
  function cloneComponent(func_component_wrap, func_append){
    let func_component_child_list = func_component_wrap.content.children;

    // 컴포넌트 폼입력 재조정(복사에 의함)
    for (var i = 0; i < func_component_child_list.length; i++) {
      // 컴포넌트 복사 위치에 복사생성
      return func_append.appendChild(func_component_child_list[i].cloneNode(true));
    }
  }

  // @컴포넌트 추가
  ink_js.prototype.addComponent = function(){
    let func_component_wrap = getComponent(this.functionName);
    let func_append = this.appendList;

    // 컴포넌트 복사 - template
    return cloneComponent(func_component_wrap, func_append);
  }

}
