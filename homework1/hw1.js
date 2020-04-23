/* 1차 세미나 과제_김민지 */

var team2 = [{
        name: '김민지',
        school: '덕성여대',
        age: 24,
        part: '서버'
    },
    {
        name: '최영훈',
        school: '인천대',
        age: 26,
        part: '서버'
    },
    {
        name: '유가희',
        school: '과기대',
        age: 24,
        part: '서버'
    },
    {
        name: '박우영',
        school: '숭실대',
        age: 25,
        part: '서버'
    },
    {
        name: '홍민정',
        school: '이화여대',
        age: 22,
        part: '서버'
    }
];

team2.forEach(
    p => console.log('2조에는 ' + p.name + '라는 사람이 있는데, 학교는 ' + p.school + '이고, 나이는 ' + p.age + '이고, 파트는 ' + p.part + '입니다!!~')
);