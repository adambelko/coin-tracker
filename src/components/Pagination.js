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

  if (props.marketData && props.marketData.length >= props.perPage) {
    return (
      <div>
        <ul>
          <li>
            <button onClick={prev}>LEFT</button>
          </li>

          {props.page + 1 === totalNumber || props.page === totalNumber ? (
            <li>
              {" "}
              <button onClick={multiStepPrev}>...</button>
            </li>
          ) : null}

          {props.page - 1 !== 0 ? (
            <li>
              <button onClick={prev}> {props.page - 1} </button>
            </li>
          ) : null}
          <li>
            <button disabled>{props.page}</button>
          </li>

          {props.page + 1 !== totalNumber && props.page !== totalNumber ? (
            <li>
              <button onClick={next}>{props.page + 1}</button>
            </li>
          ) : null}

          {props.page + 1 !== totalNumber && props.page !== totalNumber ? (
            <li>
              {" "}
              <button onClick={multiStepNext}>...</button>
            </li>
          ) : null}

          {props.page !== totalNumber ? (
            <li>
              <button onClick={() => props.setPage(totalNumber)}>
                {totalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button onClick={next}>RIGHT</button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
