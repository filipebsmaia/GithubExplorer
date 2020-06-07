import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.colors.subtext};
    transition: color 0.2s;
    transition: transform 0.2s;

    &:hover {
      color: ${(props) => shade(0.2, props.theme.colors.subtext)};
      transform: translateX(-8px);
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;
      strong {
        font-size: 36px;
        color: ${(props) => props.theme.colors.text};
      }
      p {
        font-size: 18px;
        color: ${(props) => props.theme.colors.subtext};
        margin-top: 80;
      }
    }
  }

  ul {
    display: flex;
    /* flex-wrap: wrap; */
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: ${(props) => props.theme.colors.text};
      }

      span {
        display: flex;
        align-items: center;

        margin-top: 4px;
        color: ${(props) => props.theme.colors.subtext};

        svg {
          margin-right: 8px;
        }
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: ${(props) => props.theme.colors.text};
      }

      p {
        font-size: 18px;
        color: ${(props) => props.theme.colors.subtext};
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

interface IssuesLabelProps {
  color: string;
}

export const IssuesLabel = styled.span<IssuesLabelProps>`
  background: ${(props) => props.color};
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};

  border-radius: 12px;
  padding: 2px 12px;

  & + span {
    margin-left: 4px;
  }
`;
