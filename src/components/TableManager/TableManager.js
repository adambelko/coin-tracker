import React from "react";
import styled from "styled-components";

import Pagination from "./Pagination";
import Dropdown from "./Dropdown";

const StyledTableManager = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 87%;
  max-width: 1400px;
  margin: auto;

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
    width: 87%;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const DropdownWrapper = styled.div`
  margin-top: 1em;
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

  a {
    color: ${(props) => props.theme.colors.darkBlue};
    text-decoration: none;
  }

  a:hover {
    color: ${(props) => props.theme.colors.blue};
  }

  @media (max-width: 900px) {
    width: 87%;
  }
`;

const TableManager = (props) => {
  const { marketData, globalData, page, setPage, perPage, setPerPage } = props;

  const tableManager = (
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
      <DropdownWrapper>
        <Dropdown perPage={perPage} setPerPage={setPerPage} />
      </DropdownWrapper>
    </StyledTableManager>
  );

  const tableManagerMobile = (
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
        <DropdownWrapper>
          <Dropdown perPage={perPage} setPerPage={setPerPage} />
        </DropdownWrapper>{" "}
      </div>
    </StyledTableManagerMobile>
  );

  return (
    <React.Fragment>
      {tableManager}
      {tableManagerMobile}
      <Credit>
        Data provided by <a href="https://www.coingecko.com/">CoinGecko</a>
        <div></div>
      </Credit>
    </React.Fragment>
  );
};

export default TableManager;
