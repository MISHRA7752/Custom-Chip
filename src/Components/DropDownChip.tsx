import React from "react";
import styled from "styled-components";

const Chip = styled.div`
  display: flex;
  width: auto;
  border-radius: 4px;
  gap: 4px;
  padding: 4px;
  background-color: aliceblue;
  &:hover {
    background-color: lightgray;
  }
`;
const ProfilePic = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

interface IDropDownChipCompontProps {
  leftText: string;
  rightText: string;
  imageUrl: string;
  onClick: () => void;
  className: string;
}

export default function DropDownChipCompont(props: IDropDownChipCompontProps) {
  const { onClick, leftText, rightText, imageUrl } = props;
  return (
    <Chip onClick={onClick}>
      <ProfilePic src={imageUrl} />
      <div style={{ whiteSpace: "nowrap", fontWeight: "800" }}>{leftText}</div>
      <div>{rightText}</div>
    </Chip>
  );
}
