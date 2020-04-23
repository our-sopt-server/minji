/*   1. 배열의 선언 실습    */

var subject1 = ["인공지능", "알고리즘", 43, null, true]; // 배열 리터럴을 이용하는 방법
var subject2 = Array("자료구조론", "운영체제", 13); // Array 객체의 생성자를 이용하는 방법
var subject3 = new Array("모바일앱", "웹프로그래밍", false, undefined); // new 연산자를 이용한 Array 객체 생성 방법

console.log('subject1 : ', subject1);
console.log('subject2 : ', subject2);
console.log('subject3 : ', subject3);


/*   2. 배열의 추가 실습    */

subject1.push(123); // push() 메소드를 이용하는 방법
subject2[subject2.length] = "뭐 넣지"; // length 프로퍼티를 이용하는 방법
subject3[99] = "subject3의 길이는 얼마일까요?"; // 특정 인덱스를 지정하여 추가하는 방법

console.log('subject1 : ', subject1);
console.log('subject2 : ', subject2);
console.log('subject3 : ', subject3);


/*   3. 배열의 순회 실습    */

let str1 = 'subject1에는 "';
for (var item of subject1) {
    str1 += item + ', '; //subject1을 돌며, 엘리먼트를 item에 넣음
}
str1 += '"이 들어있네요 ~';
console.log(str1);

//        ---

let str2 = 'subject2에는 "';
for (var item in subject2) {
    str2 += subject2[item] + ', '; //subject2을 돌며, 인덱스를 item에 넣음
}
str2 += '"이(가) 들어있네요 ~';
console.log(str2);

//        ---

let str3 = 'subject3에는 "';
subject3.forEach(item => str3 += item + ', '); //subject3을 돌며, 엘리먼트를 item에 넣음
str3 += '"이(가) 들어있네요 ~';
console.log(str3);