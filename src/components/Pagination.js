import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const StyledList = styled.ul`
  display: flex;
  gap: 0.3em;
  justify-content: center;
  margin-bottom: 2em;
`;

const ListItem = styled.li`
  list-style: none;
`;

const Button = styled.button`
  display: flex;
  background-color: ${(props) => (props.active ? "blue" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  padding: 0.7em 1rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.active ? "blue" : props.theme.colors.greySecondary};
  }
`;

const NavigationButton = styled(Button)`
  &:hover {
    background-color: white;
  }
`;

const Pagination = (props) => {
  const totalNumber = Math.ceil(props.totalCoinsNumber / props.perPage);

  const next = () => {
    if (props.page === totalNumber) {
      return null;
    } else {
      props.setPage(props.page + 1);
    }
  };

  const prev = () => {
    if (props.page === 1) {
      return null;
    } else {
      props.setPage(props.page - 1);
    }
  };

  const multiStepNext = () => {
    if (props.page + 3 >= totalNumber) {
      props.setPage(totalNumber - 1);
    } else {
      props.setPage(props.page + 3);
    }
  };

  const multiStepPrev = () => {
    if (props.page - 3 <= 1) {
      props.setPage(totalNumber + 1);
    } else {
      props.setPage(props.page - 2);
    }
  };

  return (
    props.marketData &&
    props.marketData.length >= props.perPage && (
      <StyledList>
        <ListItem>
          <NavigationButton>
            <IoIosArrowBack onClick={prev} />
          </NavigationButton>
        </ListItem>

        {props.page + 1 === totalNumber || props.page === totalNumber ? (
          <ListItem>
            {" "}
            <NavigationButton onClick={multiStepPrev}>...</NavigationButton>
          </ListItem>
        ) : null}

        {props.page - 1 !== 0 ? (
          <ListItem>
            <Button onClick={prev}> {props.page - 1} </Button>
          </ListItem>
        ) : null}
        <ListItem>
          <Button active="true">{props.page}</Button>
        </ListItem>

        {props.page + 1 !== totalNumber && props.page !== totalNumber ? (
          <ListItem>
            <Button onClick={next}>{props.page + 1}</Button>
          </ListItem>
        ) : null}

        {props.page + 1 !== totalNumber && props.page !== totalNumber ? (
          <ListItem>
            {" "}
            <NavigationButton onClick={multiStepNext}>...</NavigationButton>
          </ListItem>
        ) : null}

        {props.page !== totalNumber ? (
          <ListItem>
            <Button onClick={() => props.setPage(totalNumber)}>
              {totalNumber}
            </Button>
          </ListItem>
        ) : null}
        <ListItem>
          <NavigationButton>
            <IoIosArrowForward onClick={next} />
          </NavigationButton>
        </ListItem>
      </StyledList>
    )
  );
};

export default Pagination;
