import React from "react";
import styled from "styled-components";

import Pagination from "./Pagination";
import Dropdown from "./Dropdown";

const StyledTableManager = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 87%;
  max-width: 1400px;
  margin: auto;
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};

  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledTableManagerMobile = styled(StyledTableManager)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .top-wrapper {
    width: 100%;
    background-color: ${(props) => props.theme.colors.lightBlue};
    padding-bottom: 1em;
  }

  .bottom-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 93%;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledSpan = styled.span`
  margin-top: 1em;
  color: ${(props) => props.theme.colors.darkBlue};
`;

const Credit = styled.div`
  width: 87%;
  max-width: 1400px;
  margin: auto;
  margin-top: 3em;
  color: ${(props) => props.theme.colors.darkBlue};
  border-bottom: 1px solid ${(props) => props.theme.colors.greySecondary};

  div {
    margin-top: 1em;
    border-bottom: 1px solid ${(props) => props.theme.colors.greySecondary};
  }

  @media (max-width: 900px) {
    width: 93%;
  }
`;

const TableManager = (props) => {
  const { marketData, globalData, page, setPage, perPage, setPerPage } = props;

  const tableManager = (
    <React.Fragment>
      <StyledTableManager>
        <StyledSpan>
          {marketData && marketData.length > 0
            ? `Showing ${marketData[0].market_cap_rank} - ${
                marketData[0].market_cap_rank + perPage - 1
              } out of ${globalData.active_cryptocurrencies}`
            : "Loading..."}
        </StyledSpan>
        <Pagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          totalCoinsNumber={globalData.active_cryptocurrencies}
          marketData={marketData}
        />
        <Dropdown perPage={perPage} setPerPage={setPerPage} />
      </StyledTableManager>
    </React.Fragment>
  );

  const tableManagerMobile = (
    <React.Fragment>
      <StyledTableManagerMobile>
        <div className="top-wrapper">
          <Pagination
            page={page}
            setPage={setPage}
            perPage={perPage}
            totalCoinsNumber={globalData.active_cryptocurrencies}
            marketData={marketData}
          />
        </div>
        <div className="bottom-wrapper">
          <StyledSpan>
            {marketData && marketData.length > 0
              ? `Showing ${marketData[0].market_cap_rank} - ${
                  marketData[0].market_cap_rank + perPage - 1
                } out of ${globalData.active_cryptocurrencies}`
              : "Loading..."}
          </StyledSpan>
          <Dropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      </StyledTableManagerMobile>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {tableManager}
      {tableManagerMobile}
      <Credit>
        Data provided by CoinGecko
        <div></div>
      </Credit>
    </React.Fragment>
  );
};

export default TableManager;
