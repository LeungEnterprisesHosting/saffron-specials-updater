import styled from 'styled-components';

const Col = styled.div`
  flex: 1;
  flex-basis: 50%;
  padding: 15px;

  @media (max-width: 767px) {
    flex-basis: 100%;
    padding: 0;
  }

  @media (min-width: 768px) {
    &:first-child {
      padding-left: 0;
    }

    &:nth-last-child {
      padding-right: 0;
    }
  }
`;

export default Col;
