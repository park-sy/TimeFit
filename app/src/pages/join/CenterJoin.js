//센터 회원가입

import React, { useState } from "react";
import axios from "axios";
import FormMaker from "components/form/FormMaker";
import styled from "styled-components";
import SubmitButton from "components/form/SubmitButton";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

const formId = "CenterJoin";

export default () => {
  const [isMailSend, setIsMailSend] = useState(false);
  const [certified, setCertified] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!certified) return alert("이메일 인증을 진행해 주세요.");

    //세션스토리지에 현재 정보 저장, 헬스장 선택 후에 signup 리퀘스트 요청
    window.sessionStorage.setItem("signup", data);

    //헬스장 선택 페이지로 이동
    navigate("/join/find-center");
  };

  const formData = () =>
    [
      {
        type: "email",
        name: "email",
        label: "이메일",
        button: "인증번호 전송",
        buttonOnClick: () => {
          //인증번호 전송 로직
          setIsMailSend(true);
        },
        placeholder: "이메일을 입력해 주세요.",
        register: {
          required: "이메일을 입력해 주세요.",
        },
      },
      isMailSend && {
        type: "text",
        name: "certificate",
        label: "인증번호 입력",
        placeholder: "인증번호를 입력해 주세요.",
        button: certified ? "인증완료" : "인증",
        buttonOnClick: () => {
          setCertified(true);
        },
        buttonDisabled: certified,
        disabled: certified,
        register: {
          required: "인증을 진행해 주세요.",
        },
      },
      {
        type: "password",
        name: "password",
        label: "비밀번호",
        placeholder: "비밀번호를 입력해 주세요.",
        register: {
          required: "비밀번호를 입력해 주세요.",
        },
      },
      {
        type: "text",
        name: "name",
        label: "헬스장명",
        placeholder: "헬스장 이름을 입력해 주세요.",
        register: {
          required: "헬스장 이름을 입력해 주세요.",
        },
      },
      {
        type: "number",
        name: "phone",
        label: "헬스장 연락처",
        placeholder: "헬스장 연락처를 입력해 주세요.",
        register: {
          required: "헬스장 연락처를 입력해 주세요.",
        },
      },
      {
        type: "address",
        label: "헬스장 주소",
        get: {
          //다음 api에서 가져올 데이터와 가져올 이름을 짝지어 둔 객체
          zonecode: "zonecode", //우편번호
          address: "address", //기본 주소(ex: 경기 성남시 분당구 판교역로 235)
          sido: "sido", //도/시 이름(ex:경기도,서울특별시)
          sigungu: "sigungu", //시,군,구 이름
          bname: "bname", //법정동/법정리 이름
        },
        detailName: "detail", //상세주소 이름
        required: true,
      },
    ].filter((d) => !!d);

  return (
    <>
      <Background>
        <div className="title">회원가입</div>
        <FormMaker formData={formData} onSubmit={onSubmit} formId={formId} />
        <SubmitButton
          form={formId}
          style={{
            width: "40%",
            maxWidth: `calc(${theme.form.maxWidth} - 120px)`,
          }}
        >
          다음
        </SubmitButton>
      </Background>
      {/* <div>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input type="email" value={Email} onChange={emailHandler}></input>
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={passwordHandler}
          ></input>
          <label>Name</label>
          <input type="name" value={Name} onChange={nameHandler}></input>

          <button type="submit">회원가입</button>
        </form>
        <button onClick={checkEmailHandler}>아이디 중복체크</button>
      </div> */}
    </>
  );
};

const Background = styled.div`
  padding: 10vh 0;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
