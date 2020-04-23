/*   1. JSON 객체 실습    */

var sopt = {
    name: 'OUR SOPT',
    slogan: 'WE LEAD OUR SOPT',
    part: ['plan', 'design', 'android', 'iOS', 'server'],
    number: 184,
    printName: function () {
        console.log('name : ', this.name)
    },
    printNum: function () {
        console.log('number : ', this.number)
    }
};

console.log('typeof sopt : ' + typeof sopt); //json객체의 타입은? - object

console.log('sopt : ' + sopt); //+라고 하면 [object object]
console.log('sopt : ', sopt); //,라고 하면 json객체 선언 그대로 출력
console.log('sopt :' + JSON.stringify(sopt)); //JSON.stringify라고 하면 키 값 모두 string으로!

sopt.printName(); //솝트의 이름 출력
sopt.number = 190; //재할당 가능
sopt.printNum(); //솝트의 회원 수 출력


/*   2. JSON 배열 실습    */

var dogs = [{
        name: '밀키',
        family: '말티즈',
        age: 7,
        weight: 4.8
    },
    {
        name: '콩이',
        family: '말티즈',
        age: 8,
        weight: 4.6
    },
    {
        name: '서동',
        family: '푸들',
        age: 7,
        weight: 5
    }
];

console.log('dogs : ' + dogs);
console.log('dogs : ', dogs);
console.log('dogs :' + JSON.stringify(dogs));

dogs.forEach(
    dog => console.log(dog.name + '이는 종이 ' + dog.family + '이고, 나이가 ' + dog.age + '세입니다 ~')
);