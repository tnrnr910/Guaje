//로그인 값을 조회하기 위한 키값
const idKey = "USER-ID";
const review = "USER-CONTENT";
const idInput = document.getElementById('login-input-user');//아이디 인풋 엘레먼트
const contentInput = document.getElementById('login-input-review');//리뷰 인풋 엘레먼트
const pwdInput = document.getElementById('login-input-password');//비번 인풋 엘레먼트
const chkRemember = document.getElementById('login-remember');//아이디 저장 여부 체크박스 엘레먼트(비밀번호는X)

//로컬스토리지에 저장된 로그인 정보가 있는 경우 세팅하기.
const loginInfo = localStorage.getItem(idKey);

if (loginInfo != null) {

    idInput.value = loginInfo;
    console.log('저장된 아이디값 불러옴');
}


//로컬스토리지에 저장된 로그인 정보가 있는 경우 세팅하기.
const userContent = localStorage.getItem(review);

if (userContent != null) {

    idInput.value = userContent;
    console.log('저장된 리뷰 불러옴');
}


//로그인 시에는 어떤 순차로 정보를 확인해야하는지 유의해야한다.
function login() {

    //0.입력값 여부 확인.
    if (checkNullInput(idInput) && checkNullInput(pwdInput)) {//값이 모두 입력된 경우

        //1.1 아이디 유효성 검사 + 비밀번호 유효성 검사
        if (checkId(idInput.value) && checkPwd(pwdInput.value)) {//모두 유효

            //true 반환되면 아이디 비밀번호 정보 저장 후 formaction으로 보냄. 
            checkRemeberLoginInfo();
            return true;

        } else {//1.2 모두 또는 일부 유효하지않음.

            alert('아이디 또는 비밀번호를 올바르게 입력해주세요.');
            return false;
        }


    } else {//아이디나 비밀번호 둘중 하나, 또는 모두 입력되지않음 

        //비어있는 곳으로 포커스. 
        if (checkNullInput(idInput) == false) {//두개 모두 false인 경우(두개모두 미입력된 경우), 또는 아이디기 false를 반환한 경우(아이디 미입력 경우)

            idInput.focus();
            return false;

        } else {//비밀번호 미입력한 경우

            pwdInput.focus();
            return false;
        }
    }

}

function checkNullInput(input) {//인풋 값 입력 여부를 확인하는 함수 //input element를 파람으로 받는다.

    if (input.value == "") {
        console.log('로그인 정보 미입력');
        return false;

    } else {
        console.log('로그인 정보 입력');
        return true;
    }

}

function checkPwd(str_pwd) { //비밀번호 정규식 체크 함수
    const reg1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;//비밀번호는 영어/숫자/특수문자를 포함한 8자 이상.
    return (reg1.test(str_pwd));//정규식과 매치되면 true, 매치되지않으면 false 반환.
};

function checkId(str_id) {//아이디 정규식 체크 함수
    const reg2 = /^[a-z]+[a-z0-9]{4,19}$/g;//영문자로 시작해야하는(숫자가 앞으로 올 수 없음) 영문+숫자 조합 5~20자.
    return (reg2.test(str_id));
}
// link = 'reviewCheck.html';
function checkRemeberLoginInfo() {//웹스토리지 이용하여 저장 또는 삭제.

    let userId = idInput.value;

    if (chkRemember.checked == true) {

        localStorage.setItem(idKey, userId);
        alert('아이디값 저장');
        // location.href = link;

    } else {//선택하지않으면 기존에 있던 모든 로그인 정보 삭제.

        localStorage.removeItem(idKey);
        alert('아이디값 저장안함');

    }
}