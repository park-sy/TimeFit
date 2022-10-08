//
// 센터 예약 현황 화면
//

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, SampleData } from "components/Center";
import styled from "styled-components";
import ReservePopperContextProvider from "contexts/reservePopperContext";
import SetItems from "pages/reserve/SetItems";
import ReserveModal from "pages/reserve/ReserveModal";
import * as FormComponent from "components/form/StyledComponents";
import { MACHINE_NAME } from "constants/center";
import TimeColumn from "pages/reserve/TimeColumn";
import ReservationTable from "pages/reserve/ReservationTable";
import { useAuth } from "hooks/useAuthContext";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";

const CenterReserve = () => {
  const { StyledSelect, Label, LineContent } = FormComponent;
  const navigate = useNavigate();
  const axios = useAxiosInterceptor();
  //센터의 모든 기구
  const [centerEquipment, setCenterEquipment] = useState([]);
  //선택한 기구
  const [equipment, setEquipment] = useState("");
  const [itemData, setItemData] = useState([]);
  const { user } = useAuth();

  const handleEquipment = (e) => {
    const value = e.currentTarget.value;
    setEquipment(value);
  };

  //센터 기구 가져오기
  const getEquipment = async () => {
    try {
      const { data } = await axios.get(`/equipment/${user.center.id}`);
      if (!data || data.length === 0) {
        return alert("해당 센터의 기구가 없습니다.");
      }
      const equipArr = data.reduce(function (acc, { equipment }) {
        if (acc.findIndex(({ id }) => id === equipment.id) === -1) {
          acc.push(equipment);
        }
        return acc;
      }, []);
      setCenterEquipment(equipArr);
      setEquipment(equipArr[0].equipmentId);
    } catch (e) {
      console.log(e);
      alert("센터 기구 조회 중 오류가 발생했습니다.");
    }
  };

  console.log(centerEquipment);
  //user
  useEffect(() => {
    if (!user) return;
    getEquipment();
  }, [user]);

  const getReservation = async () => {
    try {
      const { data } = await axios.get(`/center/${user.center.id}/reserve`);
      console.log(data);
    } catch (e) {
      console.log(e);
      alert("예약 불러오기 중 에러가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!user) return;
    //equipment에 따른 예약 정보 받기
    getReservation();
    // setItemData([
    //   [
    //     {
    //       reservationId: 2,
    //       start: "2022-09-27T01:00:11",
    //       end: "2022-09-27T01:15:11",
    //     },
    //     {
    //       reservationId: 7,
    //       start: "2022-09-27T02:15:16",
    //       end: "2022-09-27T02:35:16",
    //     },
    //     {
    //       reservationId: 12,
    //       start: "2022-09-27T05:00:21",
    //       end: "2022-09-27T06:00:21",
    //     },
    //     {
    //       reservationId: 17,
    //       start: "2022-09-27T12:00:26",
    //       end: "2022-09-27T13:45:26",
    //     },
    //   ],
    //   [
    //     {
    //       reservationId: 2,
    //       start: "2022-09-27T01:00:11",
    //       end: "2022-09-27T01:15:11",
    //     },
    //     {
    //       reservationId: 7,
    //       start: "2022-09-27T02:15:16",
    //       end: "2022-09-27T02:35:16",
    //     },
    //     {
    //       reservationId: 12,
    //       start: "2022-09-27T05:00:21",
    //       end: "2022-09-27T06:00:21",
    //     },
    //     {
    //       reservationId: 17,
    //       start: "2022-09-27T12:00:26",
    //       end: "2022-09-27T13:45:26",
    //     },
    //   ],
    //   [
    //     {
    //       reservationId: 2,
    //       start: "2022-09-27T01:00:11",
    //       end: "2022-09-27T01:15:11",
    //     },
    //     {
    //       reservationId: 7,
    //       start: "2022-09-27T02:15:16",
    //       end: "2022-09-27T02:35:16",
    //     },
    //     {
    //       reservationId: 12,
    //       start: "2022-09-27T05:00:21",
    //       end: "2022-09-27T06:00:21",
    //     },
    //     {
    //       reservationId: 17,
    //       start: "2022-09-27T12:00:26",
    //       end: "2022-09-27T13:45:26",
    //     },
    //   ],
    // ]);
  }, [equipment]);

  // const handleClick = (machineType) => {
  //   navigate(`/reserve/${machineType}`);
  // };
  return (
    <Background>
      <div className="title">예약 현황 보기</div>
      <LineContent>
        <Label>기구 선택</Label>
        <StyledSelect name="equipment" onChange={handleEquipment}>
          {centerEquipment.map(({ name, centerEquipmentId, equipmentId }) => (
            <option key={centerEquipmentId} value={equipmentId}>
              {MACHINE_NAME[name]}
            </option>
          ))}
        </StyledSelect>
      </LineContent>
      <LineContent>
        <ReservationTable reservation={itemData} />
      </LineContent>
      <ReserveModal></ReserveModal>
    </Background>
  );
};
export default CenterReserve;

const Background = styled.div`
  padding: 10%;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.center.gap}px;
`;
