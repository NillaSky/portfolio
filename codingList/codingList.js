// data 파일 import
// import dataCustomer from './data/data_customer.js';
// import dataApp from './data/data_app.js';
// import dataPubGuideFO from './data/data_pubGuide_fo.js';
// import dataPubGuideBO from './data/data_pubGuide_bo.js';
// import dataAdminBiz from './data/data_adminBusiness.js';
// import dataAdminSuper from './data/data_adminSuper.js';

const allData = [dataCustomer, dataPubGuideFO];

document.addEventListener('DOMContentLoaded', () => {
  allData.forEach((data, i) => {
    // 상단 Tab 구성 //
    const tabContainer = document.querySelector('#tab');
    const tab = document.createElement('li');
    const tabContent = document.createTextNode(data.device);
    tab.appendChild(tabContent);
    tab.classList.add('list');

    if (i == 0) {
      tab.classList.add('on');
    }
    tab.setAttribute('data-tab', i);
    tab.addEventListener('click', tabHandler);
    tabContainer.querySelector('ul.tab').appendChild(tab);

    const headData = data.headData;

    // 다단계 데이터 구조를 1단계 구조로 변환 //
    const rowData = convertStructure(data);
    // 코딩리스트 생성(head, row, index) //
    createTable(headData, rowData, i);
  });

  const topButton = document.querySelector('.top_btn');
  topButton.addEventListener('click', (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', (e) => {
    const target = e.currentTarget;
    let scrollY = target.scrollY;

    scrollY > 0 ? (topButton.style.opacity = 1) : (topButton.style.opacity = 0);
  });
});

// Tab 클릭 이벤트 핸들러 //
function tabHandler(e) {
  const target = e.currentTarget;
  const index = target.index();
  // Tab //
  const tabContainer = document.querySelector('.tab');
  const tab = tabContainer.querySelectorAll('.list');
  // Coding list //
  const tableContainer = document.querySelector('.table-container');
  const codingListAll = tableContainer.querySelectorAll('.content');

  codingListAll.forEach((list, i) => {
    list.classList.remove('on');
    tab[i].classList.remove('on');

    if (i === index) {
      list.classList.add('on');
      tab[i].classList.add('on');
    }
  });
}

// 계층 구조 데이터를 단층 데이터 구조로 변경하는 함수 //
function convertStructure(data) {
  // let deepestDepth = data.headData.length - 2;
  const list = data.list;
  const folder = data.folder;
  let rows = []; // 변환된 row 배열을 저장하는 배열
  let row = []; // td 태그로 구성하기 위한 객체를 저장한 배열. 재귀함수를 통해 객체 구성을 완료한 후 rows 배열에 push 한다
  // 모든 요소를 확인하기 위해 재귀함수를 실행한다. //
  setTd(list, 0);

  // td 추가를 위한 데이터 구조 변환 함수(재귀함수) //
  function setTd(data, currentDepth) {
    const depth = currentDepth;

    data.forEach((cell, i) => {
      if (cell.children) {
        row.push({
          content: cell.content,
          rowSpan: getChildCount(cell.children),
        });
        // 자식 요소가 있을 경우 함수를 해당 자식 리스트를 매개값으로 재실행 한다. //
        setTd(cell.children, depth + 1);
      } else {
        // 자식 요소가 없을 경우 나머지 요소를 추가해준다. //
        const fileLink = document.createElement('a');
        const filename = document.createTextNode(cell.fileName);
        fileLink.appendChild(filename);
        // setAttributes 함수는 Node의 prototype에 추가한 함수다. //
        fileLink.setAttributes({
          href: 'dist/' + folder + '/' + cell.link + '/' + cell.fileName + '.html',
          target: '_blank',
        });

        if (cell.content) row.push({ content: cell.content });

        // if (depth < deepestDepth) {
        //   for (let i = depth; i < deepestDepth - 1; i++) {
        //     row.push({
        //       content: ''
        //     })
        //   }
        // }
        if (cell.fileName && cell.link) row.push({ content: fileLink });
        if (cell.description) row.push({ content: cell.description });
        row.push({ content: cell.complete });

        rows.push(row);
        row = []; // 다음 데이터를 저장하기 위해 배열을 초기화 한다.
      }
    });
  }

  // rowspan 속성을 적용하기 위해 해당 list의 최하위 요소의 개수를 구하는 함수 //
  function getChildCount(list) {
    let count = 0;

    counting(list);
    function counting(rows) {
      rows.forEach((row, i) => {
        if (row.children) {
          counting(row.children);
        } else {
          count++;
        }
      });
    }
    return count;
  }
  return rows;
}

// 코딩리스트 테이블 생성 함수 //
function createTable(headList, rows, index) {
  const tableContainer = document.querySelector('.table-container');
  const tableContent = document.createElement('div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const rowCounterSet = document.createElement('div');

  tableContent.classList.add('content');
  if (index === 0) {
    tableContent.classList.add('on');
  }
  tableContent.setAttribute('id', `tab_${index}`);
  tableContent.appendChild(rowCounterSet).classList.add('rowCounter');
  tableContent.appendChild(table);

  table.classList.add('coding-list');
  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(tableContent);

  // th 추가 //
  const trHead = document.createElement('tr');

  headList.forEach((head, i) => {
    addTh(trHead, head);
  });

  thead.appendChild(trHead);

  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    if (i % 2 === 1) {
      tr.classList.add('even');
    }

    row.forEach((cell, j) => {
      const td = document.createElement('td');

      if (typeof cell.content === 'string') {
        const tdContent = document.createTextNode(cell.content);
        td.appendChild(tdContent);
      } else if (typeof cell.content === 'object') {
        td.appendChild(cell.content);
      }

      // 값이 참/거짓 형
      else if (typeof cell.content === 'boolean' && cell.content) {
        td.classList.add('ok');
      }

      if (cell.rowSpan) {
        td.setAttribute('rowspan', cell.rowSpan);
      }

      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  // 페이지 총 수량 계산
  const rowCounter = document.querySelector('#' + `tab_${index}`).querySelector('.rowCounter');
  const rowTableLength = document.querySelector('#' + `tab_${index}`).querySelector('.coding-list tbody').children.length;
  rowCounter.innerHTML = 'Page Total: ' + '<span class="counter">' + rowTableLength + '</span>';

  // th 추가 함수 //
  function addTh(thead, data) {
    const th = document.createElement('th');
    const headText = document.createTextNode(data.content);
    th.style.width = data.width;
    th.appendChild(headText);
    thead.appendChild(th);
  }
}

Node.prototype.setAttributes = function (property) {
  for (const key in property) {
    this.setAttribute(key, property[key]);
  }
};

Node.prototype.index = function () {
  const parent = this.parentNode;
  const siblings = Array.prototype.slice.call(parent.children);
  const index = siblings.indexOf(this);

  return index;
};