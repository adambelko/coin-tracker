import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const SubWrapper = styled.div`
  position: relative;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    max-height: 500px;
  }
  to {
    opacity: 0;
    max-height: 0;
  }
`;

const StyledList = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0.3em 0;
  top: 2.8em;
  left: -0.5em;
  z-index: 1;
  border-radius: 0.6em;
  box-shadow: 0px 1px 2px rgba(128, 138, 157, 0.12),
    0px 8px 32px rgba(128, 138, 157, 0.24);

  opacity: ${(props) => (props.open ? 1 : 0)};
  max-height: ${(props) => (props.open ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 300ms ease, opacity 300ms ease;
  animation: ${(props) => (props.open ? fadeIn : fadeOut)} 300ms linear;
`;

const ListItem = styled.li`
  background-color: white;
  padding: 0.3em 0.8em;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: ${(props) => (props.$baseFontSize ? "0.9rem" : "1rem")};
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.6em;
  padding-left: ${(props) => props.$leftPadding};
  background-color: white;
  cursor: pointer;
  background-color: ${(props) =>
    props.$baseBg ? props.theme.colors.greySecondary : "white"};

  &:hover {
    background-color: ${(props) => props.theme.colors.greySecondary};
  }
`;

const StyledSpan = styled.span`
  color: ${(props) => props.theme.colors.darkBlue};
`;

const useOutsideClick = (excludeRefs, ref, callback) => {
  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !excludeRefs.some((excludeRef) => excludeRef.current?.contains(e.target))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, excludeRefs, callback]);
};

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useOutsideClick([buttonRef], dropdownRef, () => {
    setOpen(!open);
  });

  const handleClick = (value) => {
    props.setPerPage(value);
    setOpen(!open);
  };

  return (
    <Wrapper>
      <StyledSpan>Show rows </StyledSpan>
      <SubWrapper>
        <Button
          $baseBg="true"
          $baseFontSize="true"
          $leftPadding="0.9em"
          ref={buttonRef}
          onClick={() => setOpen(!open)}
        >
          {props.perPage && props.perPage}
          <MdKeyboardArrowDown size={17} />
        </Button>
        {open ? (
          <StyledList open={open} ref={dropdownRef}>
            <ListItem>
              <Button onClick={() => handleClick(100)}>100</Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => handleClick(50)}>50</Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => handleClick(20)}>20</Button>
            </ListItem>
          </StyledList>
        ) : null}
      </SubWrapper>
    </Wrapper>
  );
};

export default Dropdown;
