## SCSS 설정
https://nodejs.org/ko/download/
위 경로로 들어가 node js 를 다운받아 설치
window 환경 20.18.2버전 정상 작동 확인 완료
mac 환경은 brew를 통해 설치했고, 23.7.0버전 기준 정상 작동 확인 완료
************************************

node js의 설치가 완료되면 터미널 cli로 "npm i" 실행하여 npm 설치
모든 설치가 완료되면 터미널을 통해 아래 cli로 실행가능.
npm run은 작동을 위한 명령어, 뒤에는 기능을 의미함.

npm run sass 1회성 컴파일링 진행 후 종료
npm run sass:watch 별도 해지 전 까지 실시간으로 오토 컴파일링 사용.
npm run postcss scss를 css로 컴파일링 된 css 파일의 소스를 정리하여 재 생성
npm run build sass와 postcss를 순차적으로 자동 실행

커밋 전 postcss를 통해 css파일 정리한 후 주석 등 확인 후 커밋 할 것.

## SCSS to css 추가
내부망 환경에서는 scss를 별도 사용 및 관리하지않는다
아래 내용은 외부망을 사용하는 작업자들간의 작업 효율성과 편의를 위한 환경으로,
배포시에는 css관련 내용들만 전달하고 싱크, 히스토리 관리를 위해 진행한다

2025년 이후 적용되는 css 내용은
dist\customer\assets\scss\style_new.scss를 통해 작성 후 css 파일로 컴파일링 한다.
기존 dist\customer\assets\css\style.css에 import 처리 되어있음 (별도 html에 css링크 안걸어도됨),
커밋 시 새로 작성된 css 내용을 style.css 하단에 별도로 추가 기제 해준다.(내 외부망 style.css 싱크 동기화를 위해)

Scss 파일과 style_new.css파일은 내부망에는 따로 커밋하지 않는다.
배포를 위한 css는 postcss를 통해 컴파일링 및 정리가 완료된 dist\customer\assets\css\style_new.css 내용을
style.css 하단에 옮겨와 작성, 주석 내용은 css 기준 주석으로 통일 기제한다.


## branch 규칙
develop 브랜치를 기준으로 작업 마다 SR의 넘버링을 기준으로 feature/브랜치를 생성한다.
Ex. feature/KMVNO-1234_[DR-2024-63461]
커밋 메시지또한 해당 브랜치명을 기준으로 간략한 작업내용을 알수있게끔 기제한다.

feature의 내용중 배포가 진행된 내용에 관하여 develop으로 병합시키고
이후 특정 담당자가 main과 develop 브랜치를 동기화 및 정리등 관리한다.


## 주석 규칙
주석내용은 html, css, js 모두 동일하며 아래와 같은 규격에 필요시 추가사항을 별도로 기제하여 작성한다.
<!-- 2011-11-11 KMVNO-1111 [DR-2011-111111] --> 시작점
<!-- //2011-11-11 KMVNO-1111 [DR-2011-111111] --> 끝점


## Jira SR 작업 규칙
히스토리 관리를 위해 해당 SR작업을 지켜보는중으로 설정,
티켓관련 편집 권한이 없어 위 방법으로 대체함.
작업관련하여 개발에 전달시, 메일 보내고 필요시 히스토리 남겨야할 내용은
대무자 참조로 지정하여, 해당 Jira에 댓글로 기제함. 

## 메일 주소 
전용규(오픈채널서비스팀) <ykjeon@kt.com>;
권승연(오픈채널서비스팀) <seungyeon.kwon@kt.com>;
이종호(kt ds 협력사) <91374613@ktpartners.com>;
이새롬(kt ds 협력사) <91320806@ktpartners.com>;
장용훈(kt ds 협력사) <91356553@ktpartners.com>;
봉영환(kt ds 협력사) <91319607@ktpartners.com>;
이성준(kt ds 협력사) <91318884@ktpartners.com>;
최성훈(kt ds 협력사) <91357527@ktpartners.com>;
김세현(KT협력사) <91372943@ktpartners.com>;
문현준(KT협력사) <91373785@ktpartners.com>;
김혜미(KT협력사) <91386506@ktpartners.com>;
천홍익(KT협력사) <91363791@ktpartners.com>;
김석현(KT협력사) <91371522@ktpartners.com>;
윤서희(KT협력사) <91367361@ktpartners.com>;