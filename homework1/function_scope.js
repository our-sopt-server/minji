function funcScope() {
    var v1 = '함수 안 var';
    if (true) {
        var v2 = 'if 안 var';
        let ll = 'if 안 let';
        console.log('let은 Block Scope, ll : ', ll);
    }
    // console.log('let은 Block Scope, ll : ', ll); //if문에서 벗어났기 때문에 에러
    console.log('var은 function Scope, v2 : ', v2);
}
funcScope();
console.log('var은 function Scope, v1 : ', v1); //funtion에서 벗어났기 때문에 에러