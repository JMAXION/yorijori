export const validateCheckStep1 = (next, formData) => {
  if (!formData.service) {
    alert("서비스 약관에 동의해주세요.");
    // document.getElementById("service").style.outline = "3px solid red";
  } else if (!formData.personal) {
    alert("개인정보 이용 약관에 동의해주세요.");
    // document.getElementById("personal").style.outline = "3px solid red";
  } else {
    next();
  }
};
export const validateCheckStep2 = (refs) => {
  let checkFlag = true;
  if (refs.userIdRef.current.value === "") {
    alert("아이디를 입력해주세요");
    refs.userIdRef.current.focus();
    checkFlag = false;
  } else if (refs.userPassRef.current.value === "") {
    alert("비밀번호를 입력해주세요");
    refs.userPassRef.current.focus();
    checkFlag = false;
  } else if (refs.userPassCheckRef.current.value === "") {
    alert("비밀번호 확인란을 입력해주세요");
    refs.userPassCheckRef.current.focus();
    checkFlag = false;
  } else if (refs.userNameRef.current.value === "") {
    alert("이름을 입력해주세요");
    refs.userNameRef.current.focus();
    checkFlag = false;
  } else if (refs.emailIdRef.current.value === "") {
    alert("이메일 아이디를 입력해주세요");
    refs.emailIdRef.current.focus();
    checkFlag = false;
  } else if (refs.emailDomainRef.current.value === "") {
    alert("이메일 도메인을 입력해주세요");
    refs.emailDomainRef.current.focus();
    checkFlag = false;
  } else if (refs.phoneNumber2Ref.current.value === "") {
    alert("전화번호 뒷자리를 입력해주세요");
    refs.phoneNumber2Ref.current.focus();
    checkFlag = false;
  }
  return checkFlag;
};

export const handleFocus = (type) => {
  if (type === "service") {
    document.getElementById("service").style.outline = "none";
  } else if (type === "personal") {
    document.getElementById("personal").style.outline = "none";
  } else if (type === "all") {
    document.getElementById("service").style.outline = "none";
    document.getElementById("personal").style.outline = "none";
  }
};

export const passCheck = (refs) => {
  let checkFlag = true;
  const pass = refs.userPassRef.current.value;
  const passCheck = refs.userPassCheckRef.current.value;
  if (pass !== passCheck) {
    alert("비밀번호가 일치하지 않습니다! 다시 입력해주세요");
    pass = "";
    passCheck = "";
    refs.userPassRef.current.focus();
    checkFlag = false;
  } else {
    alert("비밀번호가 일치합니다!");
  }
  return checkFlag;
};

export const changeEmailDomain = (e, refs, handleChange) => {
  const name = e.target.name;
  const value = e.target.value;
  if (value === "self") {
    refs.emailDomainRef.current.value = "";
    refs.emailDomainRef.current.focus();
  } else {
    refs.emailDomainRef.current.value = value;
    handleChange(e);
  }
};
