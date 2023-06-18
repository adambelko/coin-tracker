import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const StyledList = styled.ul`
  display: flex;
  gap: 0.3em;
  justify-content: center;
  margin-top: 1em;
`;

const ListItem = styled.li`
  list-style: none;
`;

const Button = styled.button`
  display: flex;
  background-color: ${(props) =>
    props.active ? props.theme.colors.darkBlueBtn : "white"};
  color: ${(props) => (props.active ? "white" : "black")};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  padding: 0.7em 1rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.active
        ? props.theme.colors.darkBlueBtn
        : props.theme.colors.greySecondary};
  }
`;

const NavigationButton = styled(Button)`
  &:hover {
    background-color: white;
  }
`;

const Pagination = (props) => {
  const { page, setPage, perPage, totalCoinsNumber, marketData } = props;

  const totalNumber = Math.ceil(totalCoinsNumber / perPage);

  const next = () => {
    if (page === totalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= totalNumber) {
      setPage(totalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(totalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  return (
    marketData && (
      <StyledList>
        <ListItem>
          <NavigationButton>
            <IoIosArrowBack onClick={prev} />
          </NavigationButton>
        </ListItem>

        {page + 1 === totalNumber || page === totalNumber ? (
          <ListItem>
            {" "}
            <NavigationButton onClick={multiStepPrev}>...</NavigationButton>
          </ListItem>
        ) : null}

        {page - 1 !== 0 ? (
          <ListItem>
            <Button onClick={prev}> {page - 1} </Button>
          </ListItem>
        ) : null}
        <ListItem>
          <Button active="true">{page}</Button>
        </ListItem>

        {page + 1 !== totalNumber && page !== totalNumber ? (
          <ListItem>
            <Button onClick={next}>{page + 1}</Button>
          </ListItem>
        ) : null}

        {page + 1 !== totalNumber && page !== totalNumber ? (
          <ListItem>
            {" "}
            <NavigationButton onClick={multiStepNext}>...</NavigationButton>
          </ListItem>
        ) : null}

        {page !== totalNumber ? (
          <ListItem>
            <Button onClick={() => setPage(totalNumber)}>{totalNumber}</Button>
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
